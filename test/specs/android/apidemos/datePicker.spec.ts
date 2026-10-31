/**
 * Android DatePicker Interaction Test Suite
 * Tests calendar widgets, month transitions, day selections, and date assertions
 */
import { ApiDemosHomeScreen } from '../../../../src/screens/android/apidemos/HomeScreen.ts';
import { ViewsScreen } from '../../../../src/screens/android/apidemos/ViewsScreen.ts';
import { DatePickerScreen } from '../../../../src/screens/android/apidemos/DatePickerScreen.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('Android Native: DatePicker Widget Suite', () => {
    const homeScreen = new ApiDemosHomeScreen();
    const viewsScreen = new ViewsScreen();
    const datePickerScreen = new DatePickerScreen();

    before(async () => {
        Reporter.addEpic('Android Native Widgets');
        Reporter.addFeature('DatePicker');
    });

    it('TC-DP-001: Should navigate to date widget, advance month, and update day', async () => {
        Reporter.addStory('Date Dialog Day and Month Update');
        Reporter.addSeverity('normal');

        Reporter.addStep('Navigate Views -> Date Widgets -> 1. Dialog');
        await homeScreen.openViewsMenu();
        await viewsScreen.openDateWidgets();
        await datePickerScreen.openDialogMode();

        Reporter.addStep('Retrieve initial displayed date');
        const initialDate = await datePickerScreen.getCurrentDateText();
        expect(initialDate).toBeTruthy();

        Reporter.addStep('Open date change dialog, advance next month, and select 15th');
        const targetDay = 15;
        const updatedDate = await datePickerScreen.changeDateTo(targetDay);

        Reporter.addStep('Assert updated date reflects selected day');
        expect(updatedDate).toContain(targetDay.toString());
    });
});
