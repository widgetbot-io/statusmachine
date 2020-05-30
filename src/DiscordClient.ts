import {Bot} from 'zenith-ts';
import {Settings} from './interfaces';
import {Connection, createConnection} from 'typeorm';
import {RedisOptions} from 'ioredis';
import {Config} from './Classes/Config';
import * as Models from './Models';

const models = Object.keys(Models)

export class DiscordClient {
    public bot: Bot<DiscordClient> = new Bot(this.settings.bot, this);
    public db!: Connection;

    constructor(public settings: Settings) {}

    async setup() {
        try {
            this.db = await createConnection({
                ...this.settings.database,
                entities: models,
                cache: {
                    type: 'ioredis',
                    options: <RedisOptions>{
                        host: Config.redisHost,
                        port: Config.redisPort,
                        db: Config.redisDatabase,
                        password: Config.redisPass
                    }
                }
            })
        } catch (e) {
            console.error('An error occurred while connecting to the DB.', e)
            process.exit(0)
        }

        await this.bot.setup();
        await this.bot.connect();
    }
}
