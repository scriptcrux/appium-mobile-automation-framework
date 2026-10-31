/**
 * BaseScreen: Abstract Base Page Object Model for Mobile Screens
 * Provides resilient interactions, cross-platform locator resolution, and unified logging
 */
import { Logger } from './Logger.ts';
import { Device } from './Device.ts';
import { Gestures } from './Gestures.ts';
import { TIMEOUTS } from '../constants/timeouts.ts';
import type { ElementRef } from '../types/index.ts';

export abstract class BaseScreen {
    protected readonly screenName: string;

    constructor(screenName: string) {
        this.screenName = screenName;
    }

    /**
     * Cross-platform locator resolver
     * Resolves either Android or iOS locator dynamically based on active platform session
     */
    protected getPlatformElement(
        androidSelector: string,
        iosSelector: string
    ): ChainablePromiseElement {
        const selector = Device.isAndroid() ? androidSelector : iosSelector;
        return $(selector);
    }

    /**
     * Safely resolve Element from ChainablePromiseElement or WebdriverIO.Element
     */
    protected async resolveElement(element: ElementRef): Promise<WebdriverIO.Element> {
        return (await element) as unknown as WebdriverIO.Element;
    }

    /**
     * Wait for an element to be displayed on the screen
     */
    public async waitForDisplayed(
        element: ElementRef,
        timeoutMs: number = TIMEOUTS.EXPLICIT,
        description?: string
    ): Promise<boolean> {
        const el = await this.resolveElement(element);
        const desc = description || 'Target element';
        try {
            await el.waitForDisplayed({
                timeout: timeoutMs,
                interval: TIMEOUTS.POLL_INTERVAL,
                timeoutMsg: `${desc} on ${this.screenName} was not displayed within ${timeoutMs}ms`
            });
            return true;
        } catch (error) {
            Logger.error(
                `Timeout waiting for ${desc} on ${this.screenName}`,
                error,
                this.screenName
            );
            throw error;
        }
    }

    /**
     * Wait for an element to disappear
     */
    public async waitForDisappeared(
        element: ElementRef,
        timeoutMs: number = TIMEOUTS.EXPLICIT,
        description?: string
    ): Promise<boolean> {
        const el = await this.resolveElement(element);
        const desc = description || 'Target element';
        try {
            await el.waitForDisplayed({
                timeout: timeoutMs,
                reverse: true,
                timeoutMsg: `${desc} on ${this.screenName} remained visible after ${timeoutMs}ms`
            });
            return true;
        } catch (error) {
            Logger.error(`Element did not disappear: ${desc}`, error, this.screenName);
            throw error;
        }
    }

    /**
     * Click an element safely with wait and auto-scroll fallback
     */
    public async click(element: ElementRef, description?: string): Promise<void> {
        const desc = description || 'element';
        Logger.info(`Clicking ${desc}`, this.screenName);
        const el = await this.resolveElement(element);
        await this.waitForDisplayed(el, TIMEOUTS.EXPLICIT, desc);
        await el.waitForClickable({ timeout: TIMEOUTS.EXPLICIT });
        await el.click();
    }

    /**
     * Type text into an input field safely
     */
    public async type(
        element: ElementRef,
        text: string,
        clearFirst: boolean = true,
        description?: string
    ): Promise<void> {
        const desc = description || 'input field';
        Logger.info(`Entering text into ${desc}`, this.screenName);
        const el = await this.resolveElement(element);
        await this.waitForDisplayed(el, TIMEOUTS.EXPLICIT, desc);
        if (clearFirst) {
            await el.clearValue();
        }
        await el.setValue(text);
        await Device.hideKeyboard();
    }

    /**
     * Get trimmed text from an element
     */
    public async getText(element: ElementRef, description?: string): Promise<string> {
        const desc = description || 'element';
        const el = await this.resolveElement(element);
        await this.waitForDisplayed(el, TIMEOUTS.EXPLICIT, desc);
        const text = await el.getText();
        Logger.debug(`Retrieved text "${text}" from ${desc}`, this.screenName);
        return text.trim();
    }

    /**
     * Check if an element is currently displayed without throwing
     */
    public async isDisplayed(element: ElementRef): Promise<boolean> {
        try {
            const el = await this.resolveElement(element);
            return await el.isDisplayed();
        } catch {
            return false;
        }
    }

    /**
     * Scroll until an element is visible
     */
    public async scrollIntoView(
        element: ElementRef,
        direction: 'up' | 'down' = 'up'
    ): Promise<boolean> {
        return await Gestures.scrollUntilVisible(element, { direction });
    }

    /**
     * Take screenshot and log step
     */
    public async takeScreenshot(actionName: string): Promise<string> {
        Logger.info(`Capturing screenshot for: ${actionName}`, this.screenName);
        return await driver.takeScreenshot();
    }
}
