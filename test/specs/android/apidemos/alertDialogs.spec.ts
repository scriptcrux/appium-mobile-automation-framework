/**
 * Comprehensive Android Alert Dialogs Test Suite
 * Tests 2-button alerts, single-choice radio dialogs, multi-choice checkbox dialogs, and text inputs
 */
import { ApiDemosHomeScreen } from '../../../../src/screens/android/apidemos/HomeScreen.ts';
import { ApiDemosAppScreen } from '../../../../src/screens/android/apidemos/AppScreen.ts';
import { AlertDialogScreen } from '../../../../src/screens/android/apidemos/AlertDialogScreen.ts';
import { Device } from '../../../../src/core/Device.ts';
import { ANDROID_APPS } from '../../../../src/constants/apps.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('Android Native: Alert Dialogs Suite', () => {
    const homeScreen = new ApiDemosHomeScreen();
    const appScreen = new ApiDemosAppScreen();
    const alertDialogScreen = new AlertDialogScreen();

    before(async () => {
        Reporter.addEpic('Android Native Interactions');
        Reporter.addFeature('Dialogs & Modals');
    });

    beforeEach(async () => {
        // Direct activity launch for test isolation and speed
        await Device.startActivity(
            ANDROID_APPS.API_DEMOS.package,
            ANDROID_APPS.API_DEMOS.activities.ALERT_DIALOGS
        );
    });

    it('TC-AD-001: Should interact with standard Two-Button OK/Cancel dialog', async () => {
        Reporter.addStory('Two Button Dialog Confirmation');
        Reporter.addSeverity('critical');

        Reporter.addStep('Open two-button dialog');
        await alertDialogScreen.openTwoButtonsDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(true);

        Reporter.addStep('Verify dialog message');
        const message = await alertDialogScreen.getDialogMessage();
        expect(message).toContain('alert');

        Reporter.addStep('Dismiss dialog via Cancel');
        await alertDialogScreen.dismissDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(false);
    });

    it('TC-AD-002: Should handle Single-Choice Radio dialog selection', async () => {
        Reporter.addStory('Single Choice Radio Selection');
        Reporter.addSeverity('normal');

        Reporter.addStep('Open Single Choice dialog');
        await alertDialogScreen.openSingleChoiceDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(true);

        Reporter.addStep('Select Traffic radio option');
        await alertDialogScreen.selectRadioOption('Traffic');

        Reporter.addStep('Accept selection with OK');
        await alertDialogScreen.acceptDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(false);
    });

    it('TC-AD-003: Should toggle options in Multi-Choice Checkbox dialog', async () => {
        Reporter.addStory('Multi-Choice Checkbox Selection');
        Reporter.addSeverity('normal');

        Reporter.addStep('Open Multi Choice dialog');
        await alertDialogScreen.openMultiChoiceDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(true);

        Reporter.addStep('Toggle Every Morning checkbox');
        await alertDialogScreen.toggleCheckboxOption('Every Morning');

        Reporter.addStep('Toggle Every Evening checkbox');
        await alertDialogScreen.toggleCheckboxOption('Every Evening');

        Reporter.addStep('Save selections');
        await alertDialogScreen.acceptDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(false);
    });

    it('TC-AD-004: Should enter credentials in Text Entry dialog', async () => {
        Reporter.addStory('Dialog Text Entry Form');
        Reporter.addSeverity('critical');

        Reporter.addStep('Open Text Entry dialog');
        await alertDialogScreen.openTextEntryDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(true);

        Reporter.addStep('Input username and password');
        await alertDialogScreen.fillTextEntry('test_automation_user', 'SecurePassword123!');

        Reporter.addStep('Submit dialog');
        await alertDialogScreen.acceptDialog();
        expect(await alertDialogScreen.isDialogDisplayed()).toBe(false);
    });
});
