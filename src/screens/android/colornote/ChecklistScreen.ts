/**
 * ColorNote Android Checklist Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import type { ChecklistItem } from '../../../types/index.ts';

export class ChecklistScreen extends BaseScreen {
    constructor() {
        super('ColorNote Checklist Screen');
    }

    private get addItemPrompt() {
        return $('//*[@text="Add Item"]');
    }

    private get itemTextInput() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit"]');
    }

    private get itemConfirmOkBtn() {
        return $('//*[@resource-id="android:id/button1"]');
    }

    private get backCheckmarkBtn() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/back_btn"]');
    }

    public async addItem(itemText: string): Promise<void> {
        await this.click(this.addItemPrompt, 'Add Item prompt');
        await this.type(this.itemTextInput, itemText, true, 'Checklist item text');
        await this.click(this.itemConfirmOkBtn, 'Item Confirm OK button');
    }

    public async addItems(items: ChecklistItem[]): Promise<void> {
        for (const item of items) {
            await this.addItem(item.text);
        }
        // Save checklist
        await this.click(this.backCheckmarkBtn, 'Save Checklist button');
    }

    public async toggleItemCheck(itemText: string): Promise<void> {
        const itemCheckbox = $(
            `//*[@text="${itemText}"]/..//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/checkbox"]`
        );
        await this.click(itemCheckbox, `Checkbox for "${itemText}"`);
    }

    public async isItemDisplayed(itemText: string): Promise<boolean> {
        const item = $(`//*[@text="${itemText}"]`);
        return await this.isDisplayed(item);
    }
}
