/**
 * Cross-Platform Screen Factory
 * Returns platform-specific screen instances through unified interfaces
 */
import { Device } from '../../core/Device.ts';
import { ApiDemosHomeScreen } from '../android/apidemos/HomeScreen.ts';
import { UIKitHomeScreen } from '../ios/uikit/UIKitHomeScreen.ts';
import { AlertDialogScreen } from '../android/apidemos/AlertDialogScreen.ts';
import { AlertViewsScreen } from '../ios/uikit/AlertViewsScreen.ts';

export class ScreenFactory {
    /**
     * Get platform-specific Demo Home Screen
     */
    public static getHomeScreen(): ApiDemosHomeScreen | UIKitHomeScreen {
        return Device.isAndroid() ? new ApiDemosHomeScreen() : new UIKitHomeScreen();
    }

    /**
     * Get platform-specific Alert Screen
     */
    public static getAlertScreen(): AlertDialogScreen | AlertViewsScreen {
        return Device.isAndroid() ? new AlertDialogScreen() : new AlertViewsScreen();
    }
}
