/**
 * Cross-Platform Mobile Device Controller & Hardware Utilities
 * Manages device features, biometrics, app state, orientation, and OS interactions
 */
import { Logger } from './Logger.ts';
import type { Platform } from '../types/index.ts';

export class Device {
    /**
     * Check if currently executing on Android
     */
    public static isAndroid(): boolean {
        return driver.isAndroid;
    }

    /**
     * Check if currently executing on iOS
     */
    public static isIOS(): boolean {
        return driver.isIOS;
    }

    /**
     * Current target platform
     */
    public static getPlatform(): Platform {
        return driver.isAndroid ? 'android' : 'ios';
    }

    /**
     * Launch an Android activity directly
     */
    public static async startActivity(appPackage: string, appActivity: string): Promise<void> {
        if (!this.isAndroid()) {
            throw new Error('startActivity is only supported on Android devices');
        }
        Logger.info(`Starting activity: ${appPackage}/${appActivity}`, 'Device');
        await driver.startActivity(appPackage, appActivity);
    }

    /**
     * Put app into background for specified seconds, then resume
     */
    public static async backgroundApp(seconds: number = 3): Promise<void> {
        Logger.info(`Putting application in background for ${seconds} seconds`, 'Device');
        await driver.background(seconds);
    }

    /**
     * Activate app by package name or bundle ID
     */
    public static async activateApp(appId: string): Promise<void> {
        Logger.info(`Activating app: ${appId}`, 'Device');
        await driver.activateApp(appId);
    }

    /**
     * Terminate app by package name or bundle ID
     */
    public static async terminateApp(appId: string): Promise<void> {
        Logger.info(`Terminating app: ${appId}`, 'Device');
        await driver.terminateApp(appId);
    }

    /**
     * Change device orientation
     */
    public static async setOrientation(orientation: 'PORTRAIT' | 'LANDSCAPE'): Promise<void> {
        Logger.info(`Setting device orientation to ${orientation}`, 'Device');
        await driver.setOrientation(orientation);
    }

    /**
     * Get device orientation
     */
    public static async getOrientation(): Promise<string> {
        return await driver.getOrientation();
    }

    /**
     * Hide on-screen keyboard safely
     */
    public static async hideKeyboard(): Promise<void> {
        if (await driver.isKeyboardShown()) {
            Logger.debug('Keyboard is shown, hiding it', 'Device');
            if (this.isIOS()) {
                try {
                    await $('~Done').click();
                } catch {
                    try {
                        await driver.hideKeyboard();
                    } catch {
                        // Keyboard might already be dismissed
                    }
                }
            } else {
                await driver.hideKeyboard();
            }
        }
    }

    /**
     * Open deep link URL
     */
    public static async openDeepLink(url: string, androidPackage?: string): Promise<void> {
        Logger.info(`Opening deep link: ${url}`, 'Device');
        if (this.isAndroid()) {
            await driver.execute('mobile:deepLink', {
                url,
                package: androidPackage
            });
        } else {
            await driver.execute('mobile: openUrl', { url });
        }
    }

    /**
     * Open Android Notification drawer
     */
    public static async openNotifications(): Promise<void> {
        if (this.isAndroid()) {
            Logger.info('Opening Android notifications drawer', 'Device');
            await driver.openNotifications();
        }
    }

    /**
     * Close notification drawer
     */
    public static async closeNotifications(): Promise<void> {
        if (this.isAndroid()) {
            Logger.info('Closing Android notifications drawer', 'Device');
            await driver.back();
        }
    }

    /**
     * Toggle Airplane Mode (Network Drop Simulation)
     */
    public static async toggleAirplaneMode(): Promise<void> {
        Logger.info('Toggling device airplane mode', 'Device');
        if (this.isAndroid()) {
            await driver.toggleAirplaneMode();
        }
    }

    /**
     * Toggle WiFi connectivity
     */
    public static async toggleWiFi(): Promise<void> {
        Logger.info('Toggling WiFi network', 'Device');
        if (this.isAndroid()) {
            await driver.toggleWiFi();
        }
    }

    /**
     * Toggle Mobile Data connectivity
     */
    public static async toggleData(): Promise<void> {
        Logger.info('Toggling mobile data network', 'Device');
        if (this.isAndroid()) {
            await driver.toggleData();
        }
    }

    /**
     * Set system clipboard text
     */
    public static async setClipboard(text: string): Promise<void> {
        Logger.info(`Setting clipboard content`, 'Device');
        await driver.setClipboard(Buffer.from(text).toString('base64'), 'plaintext');
    }

    /**
     * Get system clipboard text
     */
    public static async getClipboard(): Promise<string> {
        const base64Text = await driver.getClipboard();
        return Buffer.from(base64Text, 'base64').toString('utf-8');
    }

    /**
     * Simulate Biometric authentication (Fingerprint / FaceID)
     */
    public static async simulateBiometric(match: boolean = true): Promise<void> {
        Logger.info(`Simulating biometric authentication (match: ${match})`, 'Device');
        if (this.isAndroid()) {
            await driver.fingerPrint(match ? 1 : 2);
        } else {
            await driver.execute('mobile: enrollBiometric', { isEnabled: true });
            await driver.execute('mobile: sendBiometricMatch', { type: 'faceId', match });
        }
    }
}
