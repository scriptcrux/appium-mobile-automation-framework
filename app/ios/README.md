# iOS Applications Directory

Place iOS Simulator application bundles (`.app` files) or real-device packages (`.ipa`) in this directory.

## Recommended Demo iOS Apps for Testing:

### 1. Apple UIKitCatalog (Standard iOS UI Controls)
Download the pre-compiled simulator app or build from Xcode:
```bash
# Clone Apple's official sample
git clone https://github.com/developer-apple/sample-uikit-uicatalog.git
# Build for iOS Simulator
xcodebuild -sdk iphonesimulator -scheme UICatalog
```
Or download prebuilt bundle:
- Place `UIKitCatalog.app` directly into this folder (`app/ios/UIKitCatalog.app`).

### 2. Sauce Labs My Demo App (Cross-Platform E-Commerce)
- [Sauce Labs Sample Apps Releases](https://github.com/saucelabs/my-demo-app-ios/releases)
- Download `MyDemoApp.zip`, unzip, and place `MyDemoApp.app` in `app/ios/`.

### 3. MVCTodo (Task Management Showcase)
- Pre-built Todo application for XCUITest task management testing (`MVCTodo.app`).

