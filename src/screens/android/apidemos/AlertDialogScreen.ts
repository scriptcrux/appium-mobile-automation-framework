/**
 * ApiDemos Android Alert Dialogs Screen Object
 * Showcases automation of complex native dialog variations
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { AlertHandler } from '../../../core/AlertHandler.ts';

export class AlertDialogScreen extends BaseScreen {
    constructor() {
        super('ApiDemos Alert Dialogs Screen');
    }

    // Locators for triggering dialogs
    private get twoButtonsDialogBtn() {
        return $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]');
    }

    private get textEntryDialogBtn() {
        return $('//*[@resource-id="io.appium.android.apis:id/text_entry_button"]');
    }

    private get singleChoiceDialogBtn() {
        return $('//*[@resource-id="io.appium.android.apis:id/radio_button"]');
    }

    private get multiChoiceDialogBtn() {
        return $('//*[@resource-id="io.appium.android.apis:id/checkbox_button"]');
    }

    // Dialog elements
    private get alertTitle() {
        return $('//*[@resource-id="android:id/alertTitle"]');
    }

    private get alertMessage() {
        return $('//*[@resource-id="android:id/message"]');
    }

    private get dialogOkButton() {
        return $('//*[@resource-id="android:id/button1"]');
    }

    private get dialogCancelButton() {
        return $('//*[@resource-id="android:id/button2"]');
    }

    // Text Entry fields
    private get usernameInput() {
        return $('//*[@resource-id="io.appium.android.apis:id/username_edit"]');
    }

    private get passwordInput() {
        return $('//*[@resource-id="io.appium.android.apis:id/password_edit"]');
    }

    // Actions
    public async openTwoButtonsDialog(): Promise<void> {
        await this.click(this.twoButtonsDialogBtn, 'Two Buttons Dialog trigger');
    }

    public async openTextEntryDialog(): Promise<void> {
        await this.click(this.textEntryDialogBtn, 'Text Entry Dialog trigger');
    }

    public async openSingleChoiceDialog(): Promise<void> {
        await this.click(this.singleChoiceDialogBtn, 'Single Choice Radio Dialog trigger');
    }

    public async openMultiChoiceDialog(): Promise<void> {
        await this.click(this.multiChoiceDialogBtn, 'Multi Choice Checkbox Dialog trigger');
    }

    public async fillTextEntry(username: string, password: string): Promise<void> {
        await this.type(this.usernameInput, username, true, 'Dialog Username');
        await this.type(this.passwordInput, password, true, 'Dialog Password');
    }

    public async selectRadioOption(optionText: string): Promise<void> {
        const radioOption = $(`//android.widget.CheckedTextView[@text="${optionText}"]`);
        await this.click(radioOption, `Radio option: ${optionText}`);
    }

    public async toggleCheckboxOption(optionText: string): Promise<void> {
        const checkboxOption = $(`//android.widget.CheckedTextView[@text="${optionText}"]`);
        await this.click(checkboxOption, `Checkbox option: ${optionText}`);
    }

    public async acceptDialog(): Promise<void> {
        await this.click(this.dialogOkButton, 'Dialog OK button');
    }

    public async dismissDialog(): Promise<void> {
        await this.click(this.dialogCancelButton, 'Dialog Cancel button');
    }

    public async getDialogTitle(): Promise<string> {
        return await this.getText(this.alertTitle, 'Alert Title');
    }

    public async getDialogMessage(): Promise<string> {
        return await this.getText(this.alertMessage, 'Alert Message');
    }

    public async isDialogDisplayed(): Promise<boolean> {
        return await this.isDisplayed(this.alertTitle);
    }
}
