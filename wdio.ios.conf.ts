/**
 * WebdriverIO iOS Configuration (XCUITest)
 */
import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf.ts';

const appPath =
    process.env.IOS_APP === 'todo'
        ? path.join(process.cwd(), 'app/ios/MVCTodo.app')
        : path.join(process.cwd(), 'app/ios/UIKitCatalog.app');

export const config: WebdriverIO.Config = {
    ...sharedConfig,

    specs: ['./test/specs/ios/**/*.spec.ts'],

    capabilities: [
        {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15 Pro',
            'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17.4',
            'appium:orientation': 'PORTRAIT',
            'appium:app': process.env.IOS_APP_PATH || appPath,
            'appium:newCommandTimeout': 240,
            'appium:wdaLaunchTimeout': 60000,
            'appium:wdaConnectionTimeout': 60000,
            'appium:autoAcceptAlerts': false,
            'appium:noReset': false,
            'appium:fullReset': false
        }
    ]
};
