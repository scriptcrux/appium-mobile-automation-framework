/**
 * App Packages, Activities, and Bundle Identifiers
 */
export const ANDROID_APPS = {
    API_DEMOS: {
        package: 'io.appium.android.apis',
        mainActivity: '.ApiDemos',
        activities: {
            ALERT_DIALOGS: 'io.appium.android.apis.app.AlertDialogSamples',
            GALLERY: 'io.appium.android.apis.view.Gallery1',
            VIEWS: 'io.appium.android.apis.view.Views'
        }
    },
    COLOR_NOTE: {
        package: 'com.socialnmobile.dictapps.notepad.color.note',
        mainActivity: 'com.socialnmobile.colornote.activity.Main'
    }
} as const;

export const IOS_APPS = {
    UIKIT_CATALOG: {
        bundleId: 'com.example.apple-samplecode.UICatalog',
        name: 'UIKitCatalog'
    },
    MVC_TODO: {
        bundleId: 'org.cocoapods.demo.MVCTodo',
        name: 'MVCTodo'
    }
} as const;
