/**
 * Cross-Platform Alert & System Dialog Handler
 * Handles both native OS alerts (UiAutomator2 / XCUITest) and in-app modal popups
 */
import { Logger } from './Logger.ts';
import { Device } from './Device.ts';
import { TIMEOUTS } from '../constants/timeouts.ts';

export class AlertHandler {
    /**
     * Check if a native system alert is currently displayed
     */
    public static async isAlertOpen(): Promise<boolean> {
        try {
            const alertText = await driver.getAlertText();
            return typeof alertText === 'string';
        } catch {
            return false;
        }
    }

    /**
     * Wait for an alert to be displayed
     */
    public static async waitForAlert(timeoutMs: number = TIMEOUTS.EXPLICIT): Promise<boolean> {
        return await driver.waitUntil(async () => await this.isAlertOpen(), {
            timeout: timeoutMs,
            timeoutMsg: `Expected alert to be open within ${timeoutMs}ms`
        });
    }

    /**
     * Get alert text
     */
    public static async getAlertText(): Promise<string> {
        try {
            return await driver.getAlertText();
        } catch (error) {
            Logger.warn(
                'Standard driver.getAlertText failed, checking platform-specific alert',
                'AlertHandler'
            );
            if (Device.isAndroid()) {
                const title = await $('//*[@resource-id="android:id/alertTitle"]').getText();
                return title;
            } else {
                const title = await $(
                    '//XCUIElementTypeAlert//XCUIElementTypeStaticText'
                ).getText();
                return title;
            }
        }
    }

    /**
     * Accept alert (Click OK / Yes / Allow / Accept)
     */
    public static async acceptAlert(): Promise<void> {
        Logger.info('Accepting alert', 'AlertHandler');
        try {
            await driver.acceptAlert();
        } catch {
            if (Device.isAndroid()) {
                const okButton = await $('//*[@resource-id="android:id/button1"]');
                if (await okButton.isDisplayed()) {
                    await okButton.click();
                }
            } else {
                const acceptBtn = await $(
                    '//XCUIElementTypeButton[@name="OK" or @name="Allow" or @name="Yes"]'
                );
                if (await acceptBtn.isDisplayed()) {
                    await acceptBtn.click();
                }
            }
        }
    }

    /**
     * Dismiss alert (Click Cancel / No / Deny)
     */
    public static async dismissAlert(): Promise<void> {
        Logger.info('Dismissing alert', 'AlertHandler');
        try {
            await driver.dismissAlert();
        } catch {
            if (Device.isAndroid()) {
                const cancelButton = await $('//*[@resource-id="android:id/button2"]');
                if (await cancelButton.isDisplayed()) {
                    await cancelButton.click();
                }
            } else {
                const dismissBtn = await $(
                    '//XCUIElementTypeButton[@name="Cancel" or @name="Don’t Allow" or @name="No"]'
                );
                if (await dismissBtn.isDisplayed()) {
                    await dismissBtn.click();
                }
            }
        }
    }

    /**
     * Click specific button on an alert by label text
     */
    public static async clickAlertButton(buttonLabel: string): Promise<void> {
        Logger.info(`Clicking alert button with label: "${buttonLabel}"`, 'AlertHandler');
        if (Device.isAndroid()) {
            const btn = await $(`//android.widget.Button[@text="${buttonLabel}"]`);
            await btn.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
            await btn.click();
        } else {
            const btn = await $(
                `//XCUIElementTypeAlert//XCUIElementTypeButton[@name="${buttonLabel}"]`
            );
            await btn.waitForDisplayed({ timeout: TIMEOUTS.EXPLICIT });
            await btn.click();
        }
    }
}
