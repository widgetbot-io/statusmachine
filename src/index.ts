import {DiscordClient} from "./DiscordClient";
import {Config} from './Classes/Config';

new DiscordClient({
    bot: {
        token: Config.botToken,
        clientOptions: {},
        dirs: {
            commands: [`${__dirname}/Commands/**/*.**`],
            events: [`${__dirname}/Events/**/*.**`],
            modules: [`${__dirname}/Modules/*.**`]
        },
        limits: {
            channel: {
                amount: 10,
                timeout: 10000
            },
            user: {
                amount: 5,
                timeout: 5000
            }
        },
        roots: [
            '545581357812678656',
            '96626362277720064'
        ],
        prefix: Config.botPrefix
    },
    redis: {
        host: Config.redisHost,
        port: Config.redisPort,
        db: Config.redisDatabase,
        password: Config.redisPass
    },
    database: {
        type: 'postgres',
        host: Config.databaseHost,
        port: Config.databasePort,
        database: Config.databaseName,
        username: Config.databaseUser,
        password: Config.databasePass
    },
    embeds: {
        color: '#2684ff',
        statusPageUrl: 'https://status.widgetbot.io',
        thumbnail: 'https://cdn.discordapp.com/icons/299881420891881473/dbca3b639968ac72f6ed64af7f1c747a.png',
        title: 'WidgetBot'
    }
}).setup();
