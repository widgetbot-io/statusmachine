import {Bot} from 'zenith-ts';
import {Settings} from './interfaces';

export class DiscordClient {
	public bot: Bot<DiscordClient> = new Bot(this.settings.bot, this);

	constructor(public settings: Settings) {}

	async setup() {
		await this.bot.setup();
		await this.bot.connect();
	}
}
