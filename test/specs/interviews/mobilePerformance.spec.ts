/**
 * Mobile Performance Profiling Suite
 * Top Interview Scenario: Capturing CPU %, Memory consumption, and Battery usage
 * during test execution to detect performance regressions and memory leaks
 */
import { PerformanceHelper } from '../../../src/core/PerformanceHelper.ts';
import { Device } from '../../../src/core/Device.ts';
import { ANDROID_APPS } from '../../../src/constants/apps.ts';
import { Reporter } from '../../../src/utils/reporter.ts';

describe('Interview Scenario: Mobile App Performance Profiling', () => {
    before(async () => {
        Reporter.addEpic('SDET Interview Scenarios');
        Reporter.addFeature('CPU & Memory Profiling');
    });

    it('TC-INT-PERF-001: Should capture CPU and Memory metrics for active app package', async () => {
        Reporter.addStory('App Performance Snapshot');
        Reporter.addSeverity('normal');

        if (!Device.isAndroid()) {
            return;
        }

        const targetPackage = ANDROID_APPS.API_DEMOS.package;

        Reporter.addStep(`Query supported performance data types for ${targetPackage}`);
        const supportedTypes = await PerformanceHelper.getSupportedPerformanceTypes();
        expect(supportedTypes).toBeInstanceOf(Array);

        Reporter.addStep('Capture real-time memory and CPU snapshot');
        const snapshot = await PerformanceHelper.captureSnapshot(targetPackage);

        Reporter.addStep(
            `Captured Snapshot: Memory=${snapshot.totalMemoryMb || 0}MB, CPU=${snapshot.cpuPercentage || 0}%`
        );
        expect(snapshot.packageName).toBe(targetPackage);
        expect(snapshot.timestamp).toBeDefined();
    });
});
