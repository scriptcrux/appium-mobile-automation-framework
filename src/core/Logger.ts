/**
 * Professional Framework Logger with Allure Step Integration
 */
import AllureReporter from '@wdio/allure-reporter';

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    STEP = 'STEP',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

export class Logger {
    private static formatMessage(level: LogLevel, message: string, context?: string): string {
        const timestamp = new Date().toISOString();
        const tag = context ? ` [${context}]` : '';
        return `[${timestamp}] [${level}]${tag} ${message}`;
    }

    public static info(message: string, context?: string): void {
        console.log(`\x1b[36m${this.formatMessage(LogLevel.INFO, message, context)}\x1b[0m`);
    }

    public static step(stepNumberOrName: string | number, message: string, context?: string): void {
        const stepHeader = `STEP ${stepNumberOrName}: ${message}`;
        console.log(`\x1b[32m${this.formatMessage(LogLevel.STEP, stepHeader, context)}\x1b[0m`);
        try {
            AllureReporter.addStep(stepHeader);
        } catch {
            // Ignore if Allure is not active in the current process
        }
    }

    public static warn(message: string, context?: string): void {
        console.warn(`\x1b[33m${this.formatMessage(LogLevel.WARN, message, context)}\x1b[0m`);
    }

    public static error(message: string, error?: unknown, context?: string): void {
        console.error(`\x1b[31m${this.formatMessage(LogLevel.ERROR, message, context)}\x1b[0m`);
        if (error) {
            console.error(error);
        }
    }

    public static debug(message: string, context?: string): void {
        if (process.env.DEBUG === 'true' || process.env.LOG_LEVEL === 'debug') {
            console.log(`\x1b[90m${this.formatMessage(LogLevel.DEBUG, message, context)}\x1b[0m`);
        }
    }
}
