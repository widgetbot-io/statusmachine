import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message} from 'discord.js'
import {Client} from '../Client';

@Command({
	name: 'maintenance',
	hidden: true,
	description: 'Command to allow the owners to put it in maintenance mode.',
	module: 'Administration'
})
export default class extends BaseCommand {
	async runCommand(helper: CommandHelper<Client, Administration>) {
		if (helper.client.maintenance) {
			helper.client.maintenance = !helper.client.maintenance
			await helper.send('The bot is no-longer in maintenance mode.')
		} else {
			helper.client.maintenance = !helper.client.maintenance
			await helper.send('The bot is now in maintenance mode!')
		}
	}

	async hasPermission(message: Message): Promise<boolean> {
		return false
	}
}
