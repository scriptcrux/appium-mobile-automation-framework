/**
 * ColorNote Android Text Note Edit Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import type { NoteData } from '../../../types/index.ts';

export class EditNoteScreen extends BaseScreen {
    constructor() {
        super('ColorNote Edit Note Screen');
    }

    private get noteBodyInput() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]');
    }

    private get noteTitleInput() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]');
    }

    private get noteTitleDisplay() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_title"]');
    }

    private get noteBodyDisplay() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]');
    }

    private get backCheckmarkBtn() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/back_btn"]');
    }

    public async fillAndSaveNote(noteData: NoteData): Promise<void> {
        await this.type(this.noteBodyInput, noteData.body, false, 'Note Body');

        // Tap title to edit if title is provided
        if (noteData.title && (await this.isDisplayed(this.noteTitleInput))) {
            await this.type(this.noteTitleInput, noteData.title, true, 'Note Title');
        }

        // Tap back to auto-save and view note
        await this.click(this.backCheckmarkBtn, 'Save Checkmark Button');
    }

    public async navigateBackToHome(): Promise<void> {
        await driver.back();
    }

    public async getSavedNoteTitle(): Promise<string> {
        if (await this.isDisplayed(this.noteTitleDisplay)) {
            return await this.getText(this.noteTitleDisplay, 'Saved Note Title');
        }
        return '';
    }

    public async getSavedNoteBody(): Promise<string> {
        return await this.getText(this.noteBodyDisplay, 'Saved Note Body');
    }
}
