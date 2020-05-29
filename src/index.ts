import {DiscordClient} from "./DiscordClient";
import {Envuments} from "envuments";

const client = new DiscordClient({
    bot: {
        token: Envuments.get('BOT_TOKEN'),
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
        prefix: 'status '
    },
    embeds: {
        color: '#2684ff',
        statusPageUrl: 'https://WB.statuspage.io',
        thumbnail: 'https://cdn.discordapp.com/icons/299881420891881473/dbca3b639968ac72f6ed64af7f1c747a.png',
        title: 'WidgetBot'
    }
}).setup();
