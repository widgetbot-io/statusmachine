import {Env} from 'envuments';

export class Config {
	@Env('BOT_TOKEN')
	public static readonly botToken: string;

	@Env('BOT_PREFIX', 'status ')
	public static readonly botPrefix: string;

	@Env('DATABASE_HOST', '127.0.0.1')
	public static readonly databaseHost: string;

	@Env('DATABASE_PORT', 5432)
	public static readonly databasePort: number;

	@Env('DATABASE_NAME', 'statuspage')
	public static readonly databaseName: string;

	@Env('DATABASE_USER', 'statuspage')
	public static readonly databaseUser: string;

	@Env('DATABASE_PASS')
	public static readonly databasePass: string;

	@Env('REDIS_HOST', '127.0.0.1')
	public static readonly redisHost: string;

	@Env('REDIS_PORT', 6370)
	public static readonly redisPort: number;

	@Env('REDIS_DATABASE', 0)
	public static readonly redisDatabase: number;

	@Env('REDIS_PASS')
	public static readonly redisPass: string;
}
