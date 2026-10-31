/**
 * Cross-Platform Unified Automation Demo Spec
 * Demonstrates how a single test execution adapts to both Android (UiAutomator2) and iOS (XCUITest)
 * using ScreenFactory and abstract BaseScreen locators
 */
import { ScreenFactory } from '../../../src/screens/cross-platform/ScreenFactory.ts';
import { Device } from '../../../src/core/Device.ts';
import { Reporter } from '../../../src/utils/reporter.ts';

describe('Cross-Platform: Unified Execution Showcase', () => {
    before(async () => {
        Reporter.addEpic('Cross-Platform Architecture');
        Reporter.addFeature('Dual-Platform Unified Engine');
    });

    it('TC-XP-001: Should dynamically detect platform and initialize appropriate Screen Object', async () => {
        Reporter.addStory('Dynamic Screen Factory Resolution');
        Reporter.addSeverity('critical');

        const activePlatform = Device.getPlatform();
        Reporter.addStep(`Detected active mobile platform: ${activePlatform.toUpperCase()}`);
        expect(['android', 'ios']).toContain(activePlatform);

        Reporter.addStep('Obtain Home Screen instance via ScreenFactory');
        const homeScreen = ScreenFactory.getHomeScreen();
        expect(homeScreen).toBeDefined();

        Reporter.addStep('Obtain Alert Screen instance via ScreenFactory');
        const alertScreen = ScreenFactory.getAlertScreen();
        expect(alertScreen).toBeDefined();
    });
});
