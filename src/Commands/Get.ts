import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message} from 'discord.js'
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

		const { data } = await StatusPage.getIncidents();

		if (data.length > 0) {

		} else if (data.length === 0) {
			return helper.send('There are currently no incidents.')
		}
	}

	async hasPermission(message: Message): Promise<boolean> {
		return false;
	}
}
