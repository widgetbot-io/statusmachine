import {Bot} from 'zenith-ts';
import {Settings} from './interfaces';
import {Connection, createConnection} from 'typeorm';

export class DiscordClient {
    public bot: Bot<DiscordClient> = new Bot(this.settings.bot, this);
    public db!: Connection;

    constructor(public settings: Settings) {
    }

    async setup() {
        try {
            this.db = await createConnection(this.settings.database)
        } catch (e) {
            console.error('An error occurred while connecting to the DB.', e)
            process.exit(0)
        }

        await this.bot.setup();
        await this.bot.connect();
    }
}
