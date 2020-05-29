import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message, MessageEmbed} from 'discord.js'
import {DiscordClient} from '../DiscordClient';
import {StatusPage} from '../Classes/StatusPage';

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
    async runCommand(helper: CommandHelper<DiscordClient, Administration>): Promise<any> {
        const maintenance = await helper.argHelper.get<Boolean>('maintenance');

        const {data} = await StatusPage.getIncidents();

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
                    data.slice(0, 4) //limit to four entries & sort by date
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((incident, index) => {
                            return {
                                name: `\u26A0 Incident #${index + 1}`,
                                value: `Title: ${incident.name}\n` +
                                    `Status: ${incident.status}\n` +
                                    `Impact: ${incident.impact}\n` +
                                    `[View Incident](${incident.shortlink})`,
                                inline: true
                            }
                        })
                );
            return helper.send(embed);
        } else if (data.length === 0) {
            return helper.send('There are currently no incidents.');
        }
    }

    async hasPermission(message: Message): Promise<boolean> {
        return false;
    }
}
