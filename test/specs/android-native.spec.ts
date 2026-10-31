/**
 * Android Native Feature Demonstrations
 * Access activities directly, dialog handling, and UIAutomator scrolling
 */
import { Device } from '../../src/core/Device.ts';
import { ANDROID_APPS } from '../../src/constants/apps.ts';
import { Reporter } from '../../src/utils/reporter.ts';

describe('Android Native: Core Feature Examples', () => {
    before(async () => {
        Reporter.addEpic('Android Native Features');
    });

    it('TC-NAT-001: Access an activity directly via driver.startActivity', async () => {
        Reporter.addStory('Direct Activity Navigation');
        Reporter.addSeverity('normal');

        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.activities.ALERT_DIALOGS
        );

        await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
    });

    it('TC-NAT-002: Native Dialog Interactions with button dismiss', async () => {
        Reporter.addStory('Native Dialog Dismiss');
        Reporter.addSeverity('normal');

        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.activities.ALERT_DIALOGS
        );

        await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]').click();
        const alertCancelBtn = await $('//*[@resource-id="android:id/button2"]');
        await alertCancelBtn.waitForDisplayed({ timeout: 10000 });
        await alertCancelBtn.click();

        await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
    });

    it('TC-NAT-003: Vertical Scrolling with UiScrollable scrollTextIntoView', async () => {
        Reporter.addStory('UiScrollable Scroll Into View');
        Reporter.addSeverity('normal');

        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.mainActivity
        );

        await $('~App').click();
        await $('~Activity').click();

        const secureSurfaces = await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")'
        );
        await secureSurfaces.click();

        await expect($('~Secure Dialog')).toExist();
    });
});
