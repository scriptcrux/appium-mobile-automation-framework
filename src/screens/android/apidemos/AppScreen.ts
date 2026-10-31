/**
 * ApiDemos Android App Submenu Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { Gestures } from '../../../core/Gestures.ts';

export class ApiDemosAppScreen extends BaseScreen {
    constructor() {
        super('ApiDemos App Screen');
    }

    private get actionBarOption() {
        return $('~Action Bar');
    }

    private get alertDialogsOption() {
        return $('~Alert Dialogs');
    }

    private get activityOption() {
        return $('~Activity');
    }

    public async openAlertDialogs(): Promise<void> {
        await this.click(this.alertDialogsOption, 'Alert Dialogs option');
    }

    public async openActivity(): Promise<void> {
        await this.click(this.activityOption, 'Activity option');
    }

    public async scrollToOption(optionText: string): Promise<void> {
        const option = $(`~${optionText}`);
        await Gestures.scrollUntilVisible(await option);
        await this.click(option, optionText);
    }

    public async isLoaded(): Promise<boolean> {
        return await this.isDisplayed(this.actionBarOption);
    }
}
