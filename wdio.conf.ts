/**
 * WebdriverIO Master Gateway Configuration
 * Automatically delegates to Android or iOS configuration based on PLATFORM environment variable
 * Defaults to Android
 */
import { config as androidConfig } from './wdio.android.conf.ts';
import { config as iosConfig } from './wdio.ios.conf.ts';

const targetPlatform = (process.env.PLATFORM || 'android').toLowerCase();

export const config: WebdriverIO.Config = targetPlatform === 'ios' ? iosConfig : androidConfig;
