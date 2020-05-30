import {BaseEvent, Event} from "zenith-ts";
import {Message} from "discord.js";
import {Client} from '../Client';
import {Settings} from '../Models';

@Event({
	name: 'Message Handler',
	eventName: 'message',
	description: 'haha'
})
export default class extends BaseEvent<Client, 'message'> { // This overwrites the default zenith msg handler
	async runEvent(message: Message): Promise<any> {
		if (message.author.bot || !message.guild) return;
		const validCommand = await this.bot.commandHandler.validCommand(message);
		if (this.bot.client.maintenance && validCommand && !this.bot.client.settings.bot.roots.includes(message.author.id)) return message.channel.send('Bot is currently in maintenance mode.');

		const repo = this.bot.client.db.getRepository(Settings)
		const guildSettings = await repo.findOne({ snowflake: message.guild.id })

		if (!guildSettings && validCommand && validCommand.command.name !== 'setup') return message.channel.send('You need to setup StatusMachine before using commands, >>setup')
		await this.bot.commandHandler.handleMessage(message)
	}
}
