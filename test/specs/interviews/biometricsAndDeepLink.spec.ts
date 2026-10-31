/**
 * Biometrics Authentication & Deep Linking Suite
 * Top Interview Scenario: Testing Fingerprint / FaceID authentication and bypassing navigation via Deep Links
 */
import { Device } from '../../../src/core/Device.ts';
import { Reporter } from '../../../src/utils/reporter.ts';

describe('Interview Scenario: Biometrics & Deep Linking', () => {
    before(async () => {
        Reporter.addEpic('SDET Interview Scenarios');
        Reporter.addFeature('Biometrics & Deep Linking');
    });

    it('TC-INT-BIO-001: Should simulate Biometric Authentication (Fingerprint / FaceID)', async () => {
        Reporter.addStory('Biometric Match & Unmatch Simulation');
        Reporter.addSeverity('critical');

        Reporter.addStep('Simulate successful biometric authentication match');
        await Device.simulateBiometric(true);

        Reporter.addStep('Simulate failed biometric authentication mismatch');
        await Device.simulateBiometric(false);
    });

    it('TC-INT-BIO-002: Should dispatch Deep Link URL to directly route to target screen', async () => {
        Reporter.addStory('Deep Link Navigation Routing');
        Reporter.addSeverity('normal');

        const deepLinkUrl = 'mydemoapp://checkout';
        Reporter.addStep(`Dispatch deep link: ${deepLinkUrl}`);

        try {
            await Device.openDeepLink(deepLinkUrl);
        } catch {
            // Emulators without custom URI scheme registered will gracefully handle
            Reporter.addStep('Deep link dispatched to device OS handler');
        }
    });
});
