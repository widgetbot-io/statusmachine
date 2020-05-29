import {Options} from 'zenith-ts';

export interface Settings {
    bot: Options,
    embeds: EmbedSettings,
}

export interface EmbedSettings {
    title: string,
    color: string,
    statusPageUrl: string,
    thumbnail: string,
}