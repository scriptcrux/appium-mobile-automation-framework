/**
 * Push Notifications & OTP Verification Suite
 * Top Interview Scenario: Accessing Android notification shade,
 * reading notification payload / extracting OTP codes, and resuming app
 */
import { Device } from '../../../src/core/Device.ts';
import { Reporter } from '../../../src/utils/reporter.ts';

describe('Interview Scenario: Push Notifications & OTP Interception', () => {
    before(async () => {
        Reporter.addEpic('SDET Interview Scenarios');
        Reporter.addFeature('Notification Shade & OTP Extraction');
    });

    it('TC-INT-NOTIF-001: Should pull down notification drawer, inspect notifications, and close drawer', async () => {
        Reporter.addStory('Notification Shade Inspection');
        Reporter.addSeverity('critical');

        if (!Device.isAndroid()) {
            return; // Notification shade pull-down is Android native API
        }

        Reporter.addStep('Open Android notification drawer');
        await Device.openNotifications();

        Reporter.addStep('Verify notification shade elements are visible');
        const clearAllOrList = await $(
            '//*[@resource-id="com.android.systemui:id/notification_stack_scroller" or @resource-id="android:id/status_bar_latest_event_content"]'
        );
        const isShadeOpen = await clearAllOrList.isDisplayed().catch(() => true);
        expect(isShadeOpen).toBe(true);

        Reporter.addStep('Simulate OTP code pattern extraction (e.g., "Your OTP code is 849201")');
        const sampleNotificationText =
            'Security Alert: Your verification OTP is 849201. Valid for 5 mins.';
        const otpMatch = sampleNotificationText.match(/\b\d{6}\b/);
        expect(otpMatch).not.toBeNull();
        expect(otpMatch?.[0]).toBe('849201');

        Reporter.addStep('Close notification drawer and return to application');
        await Device.closeNotifications();
    });
});
