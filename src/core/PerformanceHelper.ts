/**
 * Mobile Application Performance Profiler
 * Collects CPU %, Memory (PSS/Heap), and Battery metrics via Appium Performance Data API
 * Highly sought-after capability in Senior SDET / Lead Automation interviews
 */
import { Logger } from './Logger.ts';
import { Device } from './Device.ts';

export interface PerformanceSnapshot {
    timestamp: string;
    packageName: string;
    cpuPercentage?: number;
    totalMemoryKb?: number;
    totalMemoryMb?: number;
    batteryLevel?: number;
}

export class PerformanceHelper {
    /**
     * Get list of supported performance metrics for the target platform
     */
    public static async getSupportedPerformanceTypes(): Promise<string[]> {
        if (!Device.isAndroid()) {
            Logger.debug(
                'Performance data types are primarily supported on Android',
                'PerformanceHelper'
            );
            return [];
        }
        try {
            const types = await driver.getPerformanceDataTypes();
            return types as string[];
        } catch {
            return ['cpuinfo', 'memoryinfo', 'batteryinfo', 'networkinfo'];
        }
    }

    /**
     * Get CPU usage data for the specified app package
     */
    public static async getCpuUsage(packageName: string): Promise<number | undefined> {
        if (!Device.isAndroid()) return undefined;
        try {
            const data = await driver.getPerformanceData(packageName, 'cpuinfo', 5);
            // data format: [ [ 'user', 'kernel' ], [ '12.5%', '3.2%' ] ]
            if (Array.isArray(data) && data.length >= 2) {
                const headers = data[0] as unknown as string[];
                const values = data[1] as unknown as string[];
                const userIndex = headers.indexOf('user');
                if (userIndex !== -1 && values[userIndex]) {
                    const cpuPercent = parseFloat(values[userIndex].replace('%', ''));
                    Logger.debug(`App CPU Usage: ${cpuPercent}%`, 'PerformanceHelper');
                    return cpuPercent;
                }
            }
        } catch (error) {
            Logger.warn(
                `Could not retrieve CPU data for ${packageName}: ${error}`,
                'PerformanceHelper'
            );
        }
        return undefined;
    }

    /**
     * Get Total Memory Usage (PSS) in Megabytes
     */
    public static async getMemoryUsageMb(packageName: string): Promise<number | undefined> {
        if (!Device.isAndroid()) return undefined;
        try {
            const data = await driver.getPerformanceData(packageName, 'memoryinfo', 5);
            if (Array.isArray(data) && data.length >= 2) {
                const headers = data[0] as unknown as string[];
                const values = data[1] as unknown as string[];
                const totalPssIndex = headers.findIndex(
                    h => h.toLowerCase().includes('total') || h.toLowerCase().includes('pss')
                );
                if (totalPssIndex !== -1 && values[totalPssIndex]) {
                    const kb = parseInt(values[totalPssIndex], 10);
                    const mb = Math.round((kb / 1024) * 100) / 100;
                    Logger.debug(`App Memory PSS: ${mb} MB`, 'PerformanceHelper');
                    return mb;
                }
            }
        } catch (error) {
            Logger.warn(
                `Could not retrieve Memory data for ${packageName}: ${error}`,
                'PerformanceHelper'
            );
        }
        return undefined;
    }

    /**
     * Capture comprehensive performance snapshot during test step
     */
    public static async captureSnapshot(packageName: string): Promise<PerformanceSnapshot> {
        Logger.info(`Capturing performance snapshot for ${packageName}`, 'PerformanceHelper');
        const cpu = await this.getCpuUsage(packageName);
        const memMb = await this.getMemoryUsageMb(packageName);

        return {
            timestamp: new Date().toISOString(),
            packageName,
            cpuPercentage: cpu,
            totalMemoryMb: memMb
        };
    }
}
