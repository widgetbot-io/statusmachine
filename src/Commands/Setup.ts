import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message} from 'discord.js'
import {Client} from '../Client';
import {Settings} from '../Models';

@Command({
	name: 'setup',
	description: 'Command to setup the settings for the bot.',
	arguments: [
		new FlagArgument({
			name: 'override',
			short: 'o',
			description: 'Allows the user to reconfigure their settings.'
		})
	],
	module: 'Administration'
})
export default class Setup extends BaseCommand {
	async runCommand(helper: CommandHelper<Client, Administration>) {
		const override = await helper.argHelper.get('override');
		const repo = helper.client.db.getRepository(Settings);
		if (!override) {
			const settings = repo.findOne({ snowflake: helper.guild!.id })
			if (settings) return helper.send('You have already setup StatusMachine, use the flag -o to override this and setup the bot again.')
		}

		const intro = await helper.channel.send(`Welcome to StatusMachine's setup command.`)

		// const role = await Setup.askQuestion('What role would you like to access the bot?', helper)
		const key = await Setup.askQuestion('What is your Statuspage.io OAuth key?', helper)
		if (!key) return helper.send('You took too long to specify your OAuth key.')
		const pageId = await Setup.askQuestion('What is your Statuspage.io Page ID?', helper)
		if (!pageId) return helper.send('You took too long to specify your Page ID.')

		await repo.save({
			snowflake: helper.guild!.id,
			oauthKey: key,
			pageId: pageId,
		})

		await intro.delete()
		await helper.send('StatusMachine is now setup!')
	}

	static async askQuestion(content: string, helper: CommandHelper<Client, Administration>): Promise<string | undefined> {
		await helper.send(content)
		return (await (await helper.channel.awaitMessages(() => true, { max: 1, time: 30000 })).first()?.delete())?.cleanContent
	}

	async hasPermission(message: Message): Promise<boolean> {
		return !!message.member && message.member.hasPermission('MANAGE_GUILD', { checkAdmin: true, checkOwner: true })
	}
}
