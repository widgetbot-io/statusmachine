import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message} from 'discord.js'
import {Client} from '../Client';

@Command({
    name: 'Incident',
    aliases: ['oops'],
    description: 'Command to create an incident on StatusPage.io',
    arguments: [
        new FlagArgument({
            name: 'maintenance',
            description: '',
            short: 'm'
        })
    ],
    module: 'Administration'
})
export default class extends BaseCommand {
    async runCommand(helper: CommandHelper<Client, Administration>) {
        const maintenance = await helper.argHelper.get<Boolean>('maintenance');
    }

    async hasPermission(message: Message): Promise<boolean> {
        return false;
    }
}
