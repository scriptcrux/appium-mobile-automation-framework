/**
 * Hybrid & WebView Context Manager
 * Handles switching between NATIVE_APP and WEBVIEW_* contexts, multi-window handles,
 * and DOM execution inside mobile webviews (Commonly tested in Mobile SDET interviews)
 */
import { Logger } from './Logger.ts';
import { TIMEOUTS } from '../constants/timeouts.ts';

export class ContextHandler {
    public static readonly NATIVE_APP = 'NATIVE_APP';

    /**
     * Get all available contexts (NATIVE_APP, WEBVIEW_com.example, etc.)
     */
    public static async getAvailableContexts(): Promise<string[]> {
        const contexts = await driver.getContexts();
        Logger.debug(`Available contexts: ${JSON.stringify(contexts)}`, 'ContextHandler');
        return contexts as string[];
    }

    /**
     * Get current active context name
     */
    public static async getCurrentContext(): Promise<string> {
        const current = await driver.getContext();
        return current as string;
    }

    /**
     * Switch context back to NATIVE_APP
     */
    public static async switchToNative(): Promise<void> {
        Logger.info('Switching back to NATIVE_APP context', 'ContextHandler');
        await driver.switchContext(this.NATIVE_APP);
    }

    /**
     * Switch to a WebView context.
     * Polls until a WebView context appears (vital for slow-loading hybrid views)
     */
    public static async switchToWebView(
        webviewNameKeyword?: string,
        timeoutMs: number = TIMEOUTS.EXPLICIT
    ): Promise<string> {
        Logger.info(
            `Waiting for WebView context${webviewNameKeyword ? ` matching "${webviewNameKeyword}"` : ''}...`,
            'ContextHandler'
        );

        let targetContext: string | undefined;

        await driver.waitUntil(
            async () => {
                const contexts = await this.getAvailableContexts();
                targetContext = contexts.find(ctx => {
                    if (ctx === this.NATIVE_APP) return false;
                    return webviewNameKeyword
                        ? ctx.toLowerCase().includes(webviewNameKeyword.toLowerCase())
                        : ctx.startsWith('WEBVIEW');
                });
                return Boolean(targetContext);
            },
            {
                timeout: timeoutMs,
                interval: TIMEOUTS.POLL_INTERVAL,
                timeoutMsg: `WebView context did not appear within ${timeoutMs}ms`
            }
        );

        if (!targetContext) {
            throw new Error(`Failed to find WebView context within ${timeoutMs}ms`);
        }

        Logger.info(`Switching to WebView context: "${targetContext}"`, 'ContextHandler');
        await driver.switchContext(targetContext);
        return targetContext;
    }

    /**
     * Execute arbitrary JavaScript inside the mobile WebView DOM
     */
    public static async executeScriptInWebView<T>(script: string, ...args: unknown[]): Promise<T> {
        Logger.debug(`Executing script in WebView: ${script}`, 'ContextHandler');
        return (await driver.execute(script, ...args)) as T;
    }

    /**
     * Switch between multiple browser window handles inside a WebView
     */
    public static async switchWebViewWindow(windowIndex: number): Promise<void> {
        const handles = await driver.getWindowHandles();
        if (windowIndex >= handles.length) {
            throw new Error(
                `Window index ${windowIndex} out of range (total windows: ${handles.length})`
            );
        }
        Logger.info(
            `Switching to WebView window handle [${windowIndex}]: ${handles[windowIndex]}`,
            'ContextHandler'
        );
        await driver.switchToWindow(handles[windowIndex]);
    }
}
