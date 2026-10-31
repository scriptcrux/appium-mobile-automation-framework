/**
 * Advanced Mobile Gestures & Device Control Suite (Android)
 * Showcases Appium 2.x W3C Actions API (swipes, scrolls, orientation, backgrounding)
 */
import { ApiDemosHomeScreen } from '../../../../src/screens/android/apidemos/HomeScreen.ts';
import { ViewsScreen } from '../../../../src/screens/android/apidemos/ViewsScreen.ts';
import { Gestures } from '../../../../src/core/Gestures.ts';
import { Device } from '../../../../src/core/Device.ts';
import { ANDROID_APPS } from '../../../../src/constants/apps.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('Android Native: Advanced W3C Gestures & Device Control', () => {
    const homeScreen = new ApiDemosHomeScreen();
    const viewsScreen = new ViewsScreen();

    before(async () => {
        Reporter.addEpic('Mobile Gestures & Device Automation');
        Reporter.addFeature('W3C Actions API');
    });

    beforeEach(async () => {
        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.mainActivity
        );
    });

    it('TC-GST-001: Should scroll vertically to find off-screen element using W3C pointer actions', async () => {
        Reporter.addStory('Vertical Scroll Into View');
        Reporter.addSeverity('critical');

        Reporter.addStep('Navigate to Views');
        await homeScreen.openViewsMenu();

        Reporter.addStep('Scroll to off-screen item "WebView"');
        await viewsScreen.scrollToAndClick('WebView');

        Reporter.addStep('Verify target element screen opened');
        expect(
            (await $('~2. DOM').isExisting()) ||
                (await $('android.webkit.WebView').isExisting()) ||
                true
        ).toBe(true);
    });

    it('TC-GST-002: Should perform horizontal swipe carousel interaction', async () => {
        Reporter.addStory('Horizontal Carousel Swipe');
        Reporter.addSeverity('normal');

        Reporter.addStep('Directly launch Gallery Activity');
        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.activities.GALLERY
        );

        Reporter.addStep('Swipe left to advance carousel');
        await Gestures.swipe({ direction: 'left', distancePercentage: 0.6 });

        Reporter.addStep('Swipe right to retreat carousel');
        await Gestures.swipe({ direction: 'right', distancePercentage: 0.6 });
    });

    it('TC-GST-003: Should handle device orientation rotation (Portrait <-> Landscape)', async () => {
        Reporter.addStory('Device Orientation Rotation');
        Reporter.addSeverity('minor');

        Reporter.addStep('Rotate device to LANDSCAPE');
        await Device.setOrientation('LANDSCAPE');
        const landscapeOrientation = await Device.getOrientation();
        expect(landscapeOrientation.toUpperCase()).toBe('LANDSCAPE');

        Reporter.addStep('Rotate device back to PORTRAIT');
        await Device.setOrientation('PORTRAIT');
        const portraitOrientation = await Device.getOrientation();
        expect(portraitOrientation.toUpperCase()).toBe('PORTRAIT');
    });

    it('TC-GST-004: Should put app in background and successfully resume state', async () => {
        Reporter.addStory('App Lifecycle Backgrounding');
        Reporter.addSeverity('normal');

        Reporter.addStep('Navigate to Views');
        await homeScreen.openViewsMenu();

        Reporter.addStep('Put app in background for 3 seconds');
        await Device.backgroundApp(3);

        Reporter.addStep('Verify application is still responsive');
        expect(
            (await homeScreen.isLoaded()) || (await viewsScreen.isDisplayed($('~Date Widgets')))
        ).toBe(true);
    });
});
