/**
 * ColorNote Android Note Home Screen Object
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { Gestures } from '../../../core/Gestures.ts';

export class NoteHomeScreen extends BaseScreen {
    constructor() {
        super('ColorNote Home Screen');
    }

    private get skipButton() {
        return $(
            '//android.widget.Button[@text="SKIP" or @resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]'
        );
    }

    private get addNoteButton() {
        return $(
            '//*[@text="Add note" or @resource-id="com.socialnmobile.dictapps.notepad.color.note:id/main_btn1"]'
        );
    }

    private get textNoteOption() {
        return $('//*[@text="Text"]');
    }

    private get checklistOption() {
        return $('//*[@text="Checklist"]');
    }

    private get noteTitles() {
        return $$('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
    }

    private get moreMenuBtn() {
        return $('~More');
    }

    private get deleteMenuOption() {
        return $('//*[@text="Delete"]');
    }

    private get confirmDeleteOkBtn() {
        return $('//*[@resource-id="android:id/button1"]');
    }

    public async skipOnboardingIfPresent(): Promise<void> {
        if (await this.isDisplayed(this.skipButton)) {
            await this.click(this.skipButton, 'Skip onboarding button');
        }
    }

    public async startNewTextNote(): Promise<void> {
        await this.click(this.addNoteButton, 'Add Note button');
        await this.click(this.textNoteOption, 'Text Note option');
    }

    public async startNewChecklist(): Promise<void> {
        await this.click(this.addNoteButton, 'Add Note button');
        await this.click(this.checklistOption, 'Checklist option');
    }

    public async isNotePresent(title: string): Promise<boolean> {
        const note = $(
            `//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title" and @text="${title}"]`
        );
        return await this.isDisplayed(note);
    }

    public async openNote(title: string): Promise<void> {
        const note = $(
            `//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title" and @text="${title}"]`
        );
        await this.click(note, `Note with title "${title}"`);
    }

    public async deleteNoteByTitle(title: string): Promise<void> {
        const note = $(
            `//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title" and @text="${title}"]`
        );
        await Gestures.touchAndHold(await note, 1500);
        await this.click(this.deleteMenuOption, 'Delete context menu option');
        await this.click(this.confirmDeleteOkBtn, 'Confirm Delete OK');
    }

    public async getNoteCount(): Promise<number> {
        const elements = await this.noteTitles;
        return elements.length;
    }
}
