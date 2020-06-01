import { Options } from 'zenith-ts';
import { RedisOptions } from 'ioredis';
import { ConnectionOptions } from 'typeorm'

export interface Settings {
    bot: Options,
    embeds: EmbedSettings,
    redis: RedisOptions,
    database: ConnectionOptions
}

export interface EmbedSettings {
    title: string,
    color: string,
    statusPageUrl: string,
    thumbnail: string,
}
