/**
 * WebdriverIO Android Configuration (UiAutomator2)
 */
import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf.ts';

const appPath =
    process.env.ANDROID_APP === 'colornote'
        ? path.join(process.cwd(), 'app/android/ColorNote+Notepad.apk')
        : path.join(process.cwd(), 'app/android/ApiDemos-debug.apk');

export const config: WebdriverIO.Config = {
    ...sharedConfig,

    specs: ['./test/specs/android/**/*.spec.ts', './test/specs/android-*.spec.ts'],

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel_6_API_34',
            'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14.0',
            'appium:orientation': 'PORTRAIT',
            'appium:app': process.env.ANDROID_APP_PATH || appPath,
            'appium:autoGrantPermissions': true,
            'appium:newCommandTimeout': 240,
            'appium:uiautomator2ServerInstallTimeout': 60000,
            'appium:adbExecTimeout': 60000,
            'appium:noReset': false,
            'appium:fullReset': false
        }
    ]
};
