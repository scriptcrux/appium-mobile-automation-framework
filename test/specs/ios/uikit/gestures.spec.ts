/**
 * iOS Gestures & XCUITest Scrolling Suite
 */
import { UIKitHomeScreen } from '../../../../src/screens/ios/uikit/UIKitHomeScreen.ts';
import { Gestures } from '../../../../src/core/Gestures.ts';
import { Device } from '../../../../src/core/Device.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('iOS Native: W3C Gestures & Viewport Interactions', () => {
    const homeScreen = new UIKitHomeScreen();

    before(async () => {
        Reporter.addEpic('Mobile Gestures & Device Automation');
        Reporter.addFeature('iOS XCUITest Gestures');
    });

    it('TC-IOS-GST-001: Should scroll down the table view using W3C pointer action', async () => {
        Reporter.addStory('iOS TableView Scroll');
        Reporter.addSeverity('normal');

        Reporter.addStep('Swipe up to scroll down table view');
        await Gestures.swipe({ direction: 'up', distancePercentage: 0.5 });

        Reporter.addStep('Swipe down to return to top');
        await Gestures.swipe({ direction: 'down', distancePercentage: 0.5 });
    });

    it('TC-IOS-GST-002: Should handle iOS screen orientation changes', async () => {
        Reporter.addStory('iOS Orientation Switch');
        Reporter.addSeverity('minor');

        Reporter.addStep('Rotate to LANDSCAPE');
        await Device.setOrientation('LANDSCAPE');
        expect((await Device.getOrientation()).toUpperCase()).toBe('LANDSCAPE');

        Reporter.addStep('Rotate back to PORTRAIT');
        await Device.setOrientation('PORTRAIT');
        expect((await Device.getOrientation()).toUpperCase()).toBe('PORTRAIT');
    });
});
