/**
 * ColorNote Quick Smoke Test
 */
import { NoteHomeScreen } from '../../../src/screens/android/colornote/NoteHomeScreen.ts';
import { Reporter } from '../../../src/utils/reporter.ts';

describe('ColorNote Smoke Test', () => {
    const noteHomeScreen = new NoteHomeScreen();

    it('TC-SMK-001: Should skip onboarding and verify Add Note prompt', async () => {
        Reporter.addStory('Onboarding & Home Prompt');
        Reporter.addSeverity('normal');

        await noteHomeScreen.skipOnboardingIfPresent();
        expect(await $('//*[@text="Add note"]').isDisplayed()).toBe(true);
    });
});
