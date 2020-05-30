import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message, MessageEmbed} from 'discord.js'
import {Client} from '../Client';
import {StatusPage} from '../Classes/StatusPage';
import {Settings} from '../Models';

@Command({
    name: 'get',
    description: 'Command to get all incidents on StatusPage.io',
    arguments: [
        new FlagArgument({
            name: 'maintenance',
            description: 'Whether you want to get maintenance incidents.',
            short: 'm'
        })
    ],
    module: 'Administration'
})
export default class extends BaseCommand {
    async runCommand(helper: CommandHelper<Client, Administration>): Promise<any> {
        const maintenance = await helper.argHelper.get<Boolean>('maintenance');
        const repo = helper.client.db.getRepository(Settings);
        const settings = await repo.findOne({ snowflake: helper.guild!.id })
        if (!settings) return; // TODO: Add some better handling for tis

        let { data } = await StatusPage.getIncidents(settings);
        data = data.filter(d => maintenance && d.impact === 'maintenance')
        console.log(data)

        if (data.length > 0) {
            let textOptions = (data.length === 1) ? ['is', 'incident'] : ['are', 'incidents'];

            let embed = new MessageEmbed()
                .setColor('#2684ff')
                .setTitle('View Full Incident Report')
                .setURL(helper.client.settings.embeds.statusPageUrl)
                .setThumbnail(helper.client.settings.embeds.thumbnail)
                .setAuthor('WidgetBot', helper.client.settings.embeds.thumbnail)
                .setDescription(`There ${textOptions[0]} ${data.length} ${textOptions[1]} occurring currently.`)
                .addFields(
                    data.slice(-6) //limit to six entries & sort by date
                        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                        .map((incident, index) => {
                            const term = incident.impact === 'maintenance' ? 'Maintenance' : 'Incident'; // TODO: Show dates for maintenance?
                            return {
                                name: `\u26A0 ${term} #${index + 1}`,
                                value: `${incident.name}\n` +
                                    `Status: ${incident.status}\n` +
                                    `Impact: ${incident.impact}\n` +
                                    `[View ${term}](${incident.shortlink})`,
                                inline: true
                            }
                        }),
                );
            if (data.length > 6) {
                let remainingIncidents = data.length - 6;
                let innerText = (remainingIncidents === 1) ? ['is', 'incident'] : ['are', 'incidents'];
                embed.addField(
                    'More Incidents',
                    `There ${innerText[0]} ${data.length - 6} more ${innerText[1]}!\n` +
                    `You can check by [clicking here.](${helper.client.settings.embeds.statusPageUrl})`
                );
            }
            return helper.send(embed);
        } else if (data.length === 0) {
            let embed = new MessageEmbed()
                .setColor('#2684ff')
                .setTitle('View StatusPage')
                .setURL(helper.client.settings.embeds.statusPageUrl)
                .setThumbnail(helper.client.settings.embeds.thumbnail)
                .setAuthor('WidgetBot', helper.client.settings.embeds.thumbnail)
                .setDescription(`There are no incidents occurring currently.`)

            return helper.send(embed);
        }
    }

    async hasPermission(message: Message): Promise<boolean> {
        return !!message.member && message.member.hasPermission('MANAGE_GUILD', { checkAdmin: true, checkOwner: true })
    }
}
