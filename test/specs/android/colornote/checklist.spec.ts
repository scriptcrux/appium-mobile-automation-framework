/**
 * ColorNote E2E Checklist Workflow Suite
 * Covers checklist creation, multi-item entry, checkbox toggle, and verification
 */
import { NoteHomeScreen } from '../../../../src/screens/android/colornote/NoteHomeScreen.ts';
import { ChecklistScreen } from '../../../../src/screens/android/colornote/ChecklistScreen.ts';
import { TestDataGenerator } from '../../../../src/utils/testData.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('ColorNote E2E: Checklist Operations', () => {
    const noteHomeScreen = new NoteHomeScreen();
    const checklistScreen = new ChecklistScreen();

    before(async () => {
        Reporter.addEpic('End-to-End Business Workflows');
        Reporter.addFeature('Checklists');
    });

    beforeEach(async () => {
        await noteHomeScreen.skipOnboardingIfPresent();
    });

    it('TC-CL-001: Should create a multi-item checklist and toggle task completion', async () => {
        Reporter.addStory('Checklist Tasks Creation & Toggle');
        Reporter.addSeverity('critical');

        const checklistItems = TestDataGenerator.generateChecklist(3);

        Reporter.addStep('Open new Checklist creator');
        await noteHomeScreen.startNewChecklist();

        Reporter.addStep('Add generated tasks to checklist');
        await checklistScreen.addItems(checklistItems);

        Reporter.addStep('Verify first task is visible');
        const firstItemVisible = await checklistScreen.isItemDisplayed(checklistItems[0].text);
        expect(firstItemVisible).toBe(true);

        Reporter.addStep('Toggle first task to mark completed');
        await checklistScreen.toggleItemCheck(checklistItems[0].text);
    });
});
