/**
 * WebdriverIO Shared Base Configuration
 * Shared across Android, iOS, Emulators, Simulators, and Cloud Grids (BrowserStack/SauceLabs)
 */
import type { Options } from '@wdio/types';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    port: parseInt(process.env.APPIUM_PORT || '4723', 10),

    // ==================
    // Execution Controls
    // ==================
    maxInstances: parseInt(process.env.MAX_INSTANCES || '1', 10),
    logLevel: (process.env.LOG_LEVEL as Options.WebDriverLogTypes) || 'info',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ===================
    // Services & Adapters
    // ===================
    services: [
        [
            'appium',
            {
                args: {
                    relaxedSecurity: true,
                    logTimestamp: true
                },
                command: 'appium'
            }
        ]
    ],
    framework: 'mocha',

    // ====================
    // Reporting & Observability
    // ====================
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: false
            }
        ]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 90000
    },

    // ====================
    // Life-Cycle Hooks
    // ====================
    beforeSession: function () {
        console.log('\n🚀 Starting Mobile Test Session...');
    },

    before: async function () {
        // Global implicit wait setup
        await driver.setTimeout({ implicit: 3000 });
    },

    afterTest: async function (test, _context, { error }) {
        if (error) {
            console.log(`\n❌ Test Failed: "${test.title}". Capturing screenshot...`);
            try {
                await driver.takeScreenshot();
            } catch (err) {
                console.warn('Could not capture failure screenshot:', err);
            }
        }
    },

    afterSession: function () {
        console.log('🏁 Mobile Test Session Complete.');
    }
};
