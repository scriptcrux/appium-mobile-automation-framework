/**
 * iOS Todo Add Item Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import type { TodoItem } from '../../../types/index.ts';

export class AddItemScreen extends BaseScreen {
    constructor() {
        super('iOS Add Item Screen');
    }

    private get titleInput() {
        return $('//XCUIElementTypeTextField[1]');
    }

    private get notesInput() {
        return $('//XCUIElementTypeTextView[1]');
    }

    private get saveButton() {
        return $('~Save');
    }

    private get cancelButton() {
        return $('~Cancel');
    }

    public async createTodo(todo: TodoItem): Promise<void> {
        await this.type(this.titleInput, todo.title, true, 'Todo Title');
        if (todo.notes && (await this.isDisplayed(this.notesInput))) {
            await this.type(this.notesInput, todo.notes, true, 'Todo Notes');
        }
        await this.click(this.saveButton, 'Save button');
    }

    public async cancel(): Promise<void> {
        await this.click(this.cancelButton, 'Cancel button');
    }
}
