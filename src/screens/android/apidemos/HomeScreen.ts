/**
 * ApiDemos Android Home Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';

export class ApiDemosHomeScreen extends BaseScreen {
    constructor() {
        super('ApiDemos Home Screen');
    }

    // Locators
    private get appOption() {
        return $('~App');
    }

    private get viewsOption() {
        return $('~Views');
    }

    private get preferenceOption() {
        return $('~Preference');
    }

    private get accessibilityOption() {
        return $('~Accessibility');
    }

    private get allMenuItems() {
        return $$('android.widget.TextView');
    }

    // Actions
    public async openAppMenu(): Promise<void> {
        await this.click(this.appOption, 'App menu option');
    }

    public async openViewsMenu(): Promise<void> {
        await this.click(this.viewsOption, 'Views menu option');
    }

    public async openPreferenceMenu(): Promise<void> {
        await this.click(this.preferenceOption, 'Preference menu option');
    }

    public async getAllMenuLabels(): Promise<string[]> {
        await this.waitForDisplayed(this.appOption, 15000, 'Menu item');
        const elements = await this.allMenuItems;
        const labels: string[] = [];
        for (const el of elements) {
            labels.push(await el.getText());
        }
        return labels;
    }

    public async isLoaded(): Promise<boolean> {
        return await this.isDisplayed(this.appOption);
    }
}
