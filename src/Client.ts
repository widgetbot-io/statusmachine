import {Bot} from 'zenith-ts';
import {Settings as ISettings} from './interfaces';
import {Connection, createConnection} from 'typeorm';
import {RedisOptions} from 'ioredis';
import {Config} from './Classes/Config';
import * as Models from './Models';
import {Settings} from './Models';

const models = Object.keys(Models)

export class Client {
    public bot: Bot<Client> = new Bot(this.settings.bot, this);
    public db!: Connection;

    public maintenance: boolean = false;
    constructor(public settings: ISettings) {}

    async setup() {
        try {
            this.db = await createConnection({
                ...this.settings.database,
                // synchronize: true,
                entities: [
                    Settings
                ],
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
