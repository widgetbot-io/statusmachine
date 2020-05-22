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
		roots: ['96626362277720064'],
		prefix: 'status '
	}
}).setup();
