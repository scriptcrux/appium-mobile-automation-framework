/**
 * ColorNote E2E Text Note Lifecycle Suite
 * Covers note creation, automatic saving, list verification, and deletion
 */
import { NoteHomeScreen } from '../../../../src/screens/android/colornote/NoteHomeScreen.ts';
import { EditNoteScreen } from '../../../../src/screens/android/colornote/EditNoteScreen.ts';
import { TestDataGenerator } from '../../../../src/utils/testData.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('ColorNote E2E: Text Note Lifecycle', () => {
    const noteHomeScreen = new NoteHomeScreen();
    const editNoteScreen = new EditNoteScreen();

    before(async () => {
        Reporter.addEpic('End-to-End Business Workflows');
        Reporter.addFeature('ColorNote Notepad');
    });

    beforeEach(async () => {
        await noteHomeScreen.skipOnboardingIfPresent();
    });

    it('TC-CN-001: Should create a text note, verify persistence, and delete it', async () => {
        Reporter.addStory('Create, Read, and Delete Text Note');
        Reporter.addSeverity('blocker');

        const testNote = TestDataGenerator.generateNote('Sprint Retro');

        Reporter.addStep('Create a new text note');
        await noteHomeScreen.startNewTextNote();

        Reporter.addStep('Populate note title and body, then save');
        await editNoteScreen.fillAndSaveNote(testNote);

        Reporter.addStep('Navigate back to home screen');
        await editNoteScreen.navigateBackToHome();

        Reporter.addStep('Verify note appears in the home note list');
        const isPresent = await noteHomeScreen.isNotePresent(testNote.title);
        expect(isPresent).toBe(true);

        Reporter.addStep('Clean up: Delete the created test note');
        await noteHomeScreen.deleteNoteByTitle(testNote.title);

        Reporter.addStep('Verify note is removed from the home list');
        const isStillPresent = await noteHomeScreen.isNotePresent(testNote.title);
        expect(isStillPresent).toBe(false);
    });
});
