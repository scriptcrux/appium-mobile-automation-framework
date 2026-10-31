/**
 * Android Locator Strategies Showcase Suite
 * Demonstrates Accessibility ID, Android UIAutomator selectors, XPath, and Class Name queries
 */
import { Device } from '../../src/core/Device.ts';
import { ANDROID_APPS } from '../../src/constants/apps.ts';
import { Reporter } from '../../src/utils/reporter.ts';

describe('Android Native: Locator Strategies Showcase', () => {
    before(async () => {
        Reporter.addEpic('Locator Strategies');
        Reporter.addFeature('Android Selectors');
    });

    beforeEach(async () => {
        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.mainActivity
        );
    });

    it('TC-LOC-001: Find elements by Accessibility ID (~accessibilityId)', async () => {
        Reporter.addStory('Accessibility ID Locators');
        Reporter.addSeverity('normal');

        const appOption = await $('~App');
        await appOption.waitForDisplayed({ timeout: 10000 });
        await appOption.click();

        const actionBar = await $('~Action Bar');
        await expect(actionBar).toBeExisting();
    });

    it('TC-LOC-002: Find elements by Android Class Name', async () => {
        Reporter.addStory('Class Name Locators');
        Reporter.addSeverity('normal');

        const titleHeader = await $('android.widget.TextView');
        await titleHeader.waitForDisplayed({ timeout: 10000 });
        const text = await titleHeader.getText();
        expect(text).toBe('API Demos');
    });

    it('TC-LOC-003: Find element using Android UiAutomator selector (new UiSelector())', async () => {
        Reporter.addStory('UiSelector Locators');
        Reporter.addSeverity('normal');

        // UiAutomator textContains selector
        const appSelector = await $('android=new UiSelector().textContains("App")');
        await appSelector.waitForDisplayed({ timeout: 10000 });
        await appSelector.click();

        const activitySelector = await $('android=new UiSelector().text("Activity")');
        await expect(activitySelector).toBeExisting();
    });

    it('TC-LOC-004: Query and assert multiple elements ($$)', async () => {
        Reporter.addStory('Multiple Element Matching');
        Reporter.addSeverity('normal');

        const textElements = await $$('android.widget.TextView');
        const retrievedTexts: string[] = [];

        for (const el of textElements) {
            retrievedTexts.push(await el.getText());
        }

        expect(retrievedTexts).toContain('App');
        expect(retrievedTexts).toContain('Views');
        expect(retrievedTexts).toContain('OS');
    });
});
