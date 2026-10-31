/**
 * Allure Reporter Wrapper & Metadata Enricher
 */
import AllureReporter from '@wdio/allure-reporter';
import { Logger } from '../core/Logger.ts';

export type SeverityLevel = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';

export class Reporter {
    public static addEpic(epicName: string): void {
        try {
            AllureReporter.addEpic(epicName);
        } catch {
            Logger.debug(`[Epic: ${epicName}]`);
        }
    }

    public static addFeature(featureName: string): void {
        try {
            AllureReporter.addFeature(featureName);
        } catch {
            Logger.debug(`[Feature: ${featureName}]`);
        }
    }

    public static addStory(storyName: string): void {
        try {
            AllureReporter.addStory(storyName);
        } catch {
            Logger.debug(`[Story: ${storyName}]`);
        }
    }

    public static addSeverity(severity: SeverityLevel): void {
        try {
            AllureReporter.addSeverity(severity);
        } catch {
            Logger.debug(`[Severity: ${severity}]`);
        }
    }

    public static addStep(stepName: string): void {
        try {
            AllureReporter.addStep(stepName);
        } catch {
            Logger.debug(`[Step: ${stepName}]`);
        }
    }

    public static async attachScreenshot(name: string = 'Failure Screenshot'): Promise<void> {
        try {
            const screenshot = await driver.takeScreenshot();
            AllureReporter.addAttachment(name, Buffer.from(screenshot, 'base64'), 'image/png');
        } catch (error) {
            Logger.warn(`Failed to attach screenshot to Allure: ${error}`, 'Reporter');
        }
    }
}
