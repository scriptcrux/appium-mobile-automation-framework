/**
 * iOS UIKitCatalog Native Alerts & Action Sheets Suite
 * Showcases XCUITest interaction with iOS system dialogs, destructive sheets, and text input prompts
 */
import { UIKitHomeScreen } from '../../../../src/screens/ios/uikit/UIKitHomeScreen.ts';
import { AlertViewsScreen } from '../../../../src/screens/ios/uikit/AlertViewsScreen.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('iOS Native: Alerts & Action Sheets Suite', () => {
    const homeScreen = new UIKitHomeScreen();
    const alertViewsScreen = new AlertViewsScreen();

    before(async () => {
        Reporter.addEpic('iOS Native Interactions');
        Reporter.addFeature('XCUITest Alerts & Sheets');
    });

    beforeEach(async () => {
        await homeScreen.openAlertViews();
    });

    it('TC-IOS-ALT-001: Should handle Okay / Cancel confirmation alert', async () => {
        Reporter.addStory('iOS Confirmation Dialog');
        Reporter.addSeverity('critical');

        Reporter.addStep('Trigger Okay / Cancel alert');
        await alertViewsScreen.triggerOkayCancelAlert();
        expect(await alertViewsScreen.isAlertOpen()).toBe(true);

        Reporter.addStep('Verify alert title');
        const title = await alertViewsScreen.getAlertTitle();
        expect(title).toContain('Short Title');

        Reporter.addStep('Dismiss alert with Cancel');
        await alertViewsScreen.dismissAlert();
        expect(await alertViewsScreen.isAlertOpen()).toBe(false);
    });

    it('TC-IOS-ALT-002: Should enter credentials in iOS Secure Text Entry alert', async () => {
        Reporter.addStory('iOS Secure Text Entry Alert');
        Reporter.addSeverity('critical');

        Reporter.addStep('Trigger Secure Text Entry alert');
        await alertViewsScreen.triggerSecureTextEntryAlert();
        expect(await alertViewsScreen.isAlertOpen()).toBe(true);

        Reporter.addStep('Enter secret PIN/password');
        await alertViewsScreen.enterSecureTextInAlert('Secret999!');

        Reporter.addStep('Accept alert with OK');
        await alertViewsScreen.acceptAlert();
        expect(await alertViewsScreen.isAlertOpen()).toBe(false);
    });

    it('TC-IOS-ALT-003: Should handle iOS Destructive Action Sheet', async () => {
        Reporter.addStory('iOS Destructive Action Sheet');
        Reporter.addSeverity('normal');

        Reporter.addStep('Trigger Destructive Action Sheet');
        await alertViewsScreen.triggerDestructiveActionSheet();

        Reporter.addStep('Click Destructive Choice action');
        await alertViewsScreen.clickAlertAction('Destructive Choice');
    });
});
