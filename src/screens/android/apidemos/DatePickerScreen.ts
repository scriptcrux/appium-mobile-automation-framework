/**
 * ApiDemos Android DatePicker Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';

export class DatePickerScreen extends BaseScreen {
    constructor() {
        super('ApiDemos DatePicker Screen');
    }

    private get dialogModeOption() {
        return $('~1. Dialog');
    }

    private get dateDisplayLabel() {
        return $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    }

    private get changeDateButton() {
        return $('~change the date');
    }

    private get nextMonthButton() {
        return $('~Next month');
    }

    private get dialogOkButton() {
        return $('//*[@resource-id="android:id/button1"]');
    }

    public async openDialogMode(): Promise<void> {
        await this.click(this.dialogModeOption, '1. Dialog mode option');
    }

    public async getCurrentDateText(): Promise<string> {
        return await this.getText(this.dateDisplayLabel, 'Current Date display');
    }

    public async openChangeDateDialog(): Promise<void> {
        await this.click(this.changeDateButton, 'Change the date button');
    }

    public async advanceToNextMonth(): Promise<void> {
        await this.click(this.nextMonthButton, 'Next month arrow');
    }

    public async selectDay(dayNumber: number | string): Promise<void> {
        const dayElement = $(`//android.view.View[@text="${dayNumber}"]`);
        await this.click(dayElement, `Day number ${dayNumber}`);
    }

    public async confirmDate(): Promise<void> {
        await this.click(this.dialogOkButton, 'Date Dialog OK button');
    }

    public async changeDateTo(dayNumber: number | string): Promise<string> {
        await this.openChangeDateDialog();
        await this.advanceToNextMonth();
        await this.selectDay(dayNumber);
        await this.confirmDate();
        return await this.getCurrentDateText();
    }
}
