/**
 * Hybrid Application & WebView Context Switching Suite
 * Top Interview Scenario: Switching between NATIVE_APP and WEBVIEW contexts,
 * handling DOM execution, and switching back.
 */
import { ContextHandler } from '../../../src/core/ContextHandler.ts';
import { Reporter } from '../../../src/utils/reporter.ts';

describe('Interview Scenario: Hybrid App Context Switching (Native <-> WebView)', () => {
    before(async () => {
        Reporter.addEpic('SDET Interview Scenarios');
        Reporter.addFeature('Hybrid App & WebView Contexts');
    });

    it('TC-INT-HYB-001: Should inspect available contexts and verify NATIVE_APP baseline', async () => {
        Reporter.addStory('Context Discovery & Enumeration');
        Reporter.addSeverity('critical');

        Reporter.addStep('Retrieve all available runtime contexts');
        const contexts = await ContextHandler.getAvailableContexts();
        expect(contexts).toBeInstanceOf(Array);
        expect(contexts).toContain(ContextHandler.NATIVE_APP);

        Reporter.addStep('Verify active context is NATIVE_APP');
        const currentContext = await ContextHandler.getCurrentContext();
        expect(currentContext).toBe(ContextHandler.NATIVE_APP);
    });

    it('TC-INT-HYB-002: Should handle context switching transitions and fallback to Native', async () => {
        Reporter.addStory('Safe Context Switching Fallback');
        Reporter.addSeverity('blocker');

        Reporter.addStep('Query contexts for any active WebView');
        const contexts = await ContextHandler.getAvailableContexts();
        const webviewContext = contexts.find(c => c.startsWith('WEBVIEW'));

        if (webviewContext) {
            Reporter.addStep(`Switch into WebView context: ${webviewContext}`);
            await driver.switchContext(webviewContext);
            expect(await ContextHandler.getCurrentContext()).toBe(webviewContext);

            Reporter.addStep('Switch back to NATIVE_APP');
            await ContextHandler.switchToNative();
            expect(await ContextHandler.getCurrentContext()).toBe(ContextHandler.NATIVE_APP);
        } else {
            Reporter.addStep('No active WebView open; verify driver is in NATIVE_APP');
            await ContextHandler.switchToNative();
            expect(await ContextHandler.getCurrentContext()).toBe(ContextHandler.NATIVE_APP);
        }
    });
});

