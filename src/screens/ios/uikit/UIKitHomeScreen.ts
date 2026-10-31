/**
 * iOS UIKitCatalog Home Screen Object
 * Showcases XCUITest standard locator strategies (Accessibility ID, Class Chain, Predicate String)
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { Gestures } from '../../../core/Gestures.ts';

export class UIKitHomeScreen extends BaseScreen {
    constructor() {
        super('iOS UIKitCatalog Home Screen');
    }

    // XCUITest Accessibility IDs
    private get alertViewsOption() {
        return $('~Alert Views');
    }

    private get pickersOption() {
        return $('~Picker View');
    }

    private get slidersOption() {
        return $('~Sliders');
    }

    private get textFieldsOption() {
        return $('~Text Fields');
    }

    private get switchesOption() {
        return $('~Switches');
    }

    // iOS Class Chain example: Finds the navigation bar title
    private get navigationTitle() {
        return $('-ios class chain:**/XCUIElementTypeNavigationBar/**/XCUIElementTypeStaticText');
    }

    // iOS Predicate String example: Finds cells containing label text
    private cellByLabel(label: string) {
        return $(`-ios predicate string:label == "${label}" AND visible == 1`);
    }

    public async openAlertViews(): Promise<void> {
        await this.click(this.alertViewsOption, 'Alert Views menu option');
    }

    public async openPickers(): Promise<void> {
        await this.click(this.pickersOption, 'Pickers menu option');
    }

    public async openSliders(): Promise<void> {
        await this.click(this.slidersOption, 'Sliders menu option');
    }

    public async openTextFields(): Promise<void> {
        await this.click(this.textFieldsOption, 'Text Fields menu option');
    }

    public async scrollToAndClickItem(itemLabel: string): Promise<void> {
        const item = this.cellByLabel(itemLabel);
        const isVisible = await Gestures.scrollUntilVisible(await item, { maxScrolls: 6 });
        if (!isVisible) {
            throw new Error(`iOS menu item "${itemLabel}" not found`);
        }
        await this.click(item, itemLabel);
    }

    public async getNavigationTitle(): Promise<string> {
        return await this.getText(this.navigationTitle, 'iOS Navigation Bar Title');
    }
}
