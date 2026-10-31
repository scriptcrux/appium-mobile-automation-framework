/**
 * ApiDemos Android Views Screen Object
 * Showcases automation of complex UI controls, carousels, lists, and drag-and-drop
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { Gestures } from '../../../core/Gestures.ts';

export class ViewsScreen extends BaseScreen {
    constructor() {
        super('ApiDemos Views Screen');
    }

    private get dateWidgetsOption() {
        return $('~Date Widgets');
    }

    private get galleryOption() {
        return $('~Gallery');
    }

    private get dragAndDropOption() {
        return $('~Drag and Drop');
    }

    private get autoCompleteOption() {
        return $('~Auto Complete');
    }

    public async openDateWidgets(): Promise<void> {
        await this.click(this.dateWidgetsOption, 'Date Widgets option');
    }

    public async openGallery(): Promise<void> {
        await this.click(this.galleryOption, 'Gallery option');
    }

    public async openDragAndDrop(): Promise<void> {
        await this.click(this.dragAndDropOption, 'Drag and Drop option');
    }

    public async openAutoComplete(): Promise<void> {
        await this.click(this.autoCompleteOption, 'Auto Complete option');
    }

    /**
     * Scroll until the requested item is visible, then click it
     */
    public async scrollToAndClick(itemText: string): Promise<void> {
        const item = $(`~${itemText}`);
        const found = await Gestures.scrollUntilVisible(await item, { maxScrolls: 8 });
        if (!found) {
            throw new Error(`Item "${itemText}" could not be found after scrolling`);
        }
        await this.click(item, `Scrolled Item: ${itemText}`);
    }
}
