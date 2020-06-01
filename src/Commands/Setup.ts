import {BaseCommand, Command, CommandHelper, Administration, FlagArgument} from 'zenith-ts'
import {Message} from 'discord.js'
import {Client} from '../Client';
import {Settings} from '../Models';
import {StatusPage} from '../Classes/StatusPage';
import {GetPages} from '../interfaces/statuspage';
import {isNumber} from 'util';

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
		let message: Message | undefined;
		try {
			const override = await helper.argHelper.get('override');
			const repo = helper.client.db.getRepository(Settings);
			if (!override) {
				const settings = await repo.findOne({ snowflake: helper.guild!.id })
				if (settings) return helper.send('You have already setup StatusMachine, use the flag -o to override this and setup the bot again.')
			}
			message = await helper.channel.send(`Welcome to StatusMachine's setup command.`)

			// const role = await Setup.askQuestion('What role would you like to access the bot?', helper)
			const key = await Setup.askQuestion('What is your Statuspage.io OAuth key?', helper)
			if (!key) return helper.send('You took too long to specify your OAuth key.')

			const pages = await StatusPage.getPages({ oauthKey: key }).then(r => r.data)
			let pageId: string | undefined;

			if (pages.length === 0) {
				return helper.send('No pages are associated with this key.')
			} else if (pages.length === 1) {
				const p = pages[0]
				pageId = p.id
				await helper.send(`Only one page attached to this page, defaulting to \`${p.name}  - ${p.domain || 'No domain specified'} (${p.id})\``)
				await new Promise(r => setTimeout(() => r(), 2000))
			} else {
				const index = await Setup.askQuestion(Setup.generatePagesMessage(pages), helper)
				if (!index) return helper.send('You took too long to choose a page.')
				pageId = pages[parseInt(index) -1].id
			}

			await repo.save({
				snowflake: helper.guild!.id,
				oauthKey: key,
				pageId: pageId,
			})

			if (message) await message.delete()
			await helper.send('StatusMachine is now setup!')
		} catch (e) {
			if (message) await message.delete()
			console.error(e)
			return helper.send('An unexpected error occurred, please report it to my developers (>>support)')
		}
	}

	static generatePagesMessage(pages: GetPages[]): string {
		return pages.map((p, i) => `[${i +1}] ${p.name}  - ${p.domain || 'No domain specified'} (${p.id})`).join('\n')
	}

	static async askQuestion(content: string, helper: CommandHelper<Client, Administration>, filter: (...args: any[]) => boolean = () => true): Promise<string | undefined> {
		await helper.send(content)
		return (await (await helper.channel.awaitMessages(filter, { max: 1, time: 30000 })).first()?.delete())?.cleanContent
	}

	async hasPermission(message: Message): Promise<boolean> {
		return !!message.member && message.member.hasPermission('MANAGE_GUILD', { checkAdmin: true, checkOwner: true })
	}
}
