/**
 * iOS UIKitCatalog Alert Views Screen Object
 * Showcases automation of iOS Alerts, Action Sheets, and Secure Text Entry Prompts
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { AlertHandler } from '../../../core/AlertHandler.ts';

export class AlertViewsScreen extends BaseScreen {
    constructor() {
        super('iOS Alert Views Screen');
    }

    // Trigger buttons
    private get simpleAlertBtn() {
        return $('~Simple');
    }

    private get okayCancelAlertBtn() {
        return $('~Okay / Cancel');
    }

    private get otherAlertBtn() {
        return $('~Other');
    }

    private get textEntryAlertBtn() {
        return $('~Text Entry');
    }

    private get secureTextEntryAlertBtn() {
        return $('~Secure Text Entry');
    }

    private get destructiveActionSheetBtn() {
        return $('~Destructive');
    }

    // Native iOS Alert elements via XCUITest
    private get alertContainer() {
        return $('//XCUIElementTypeAlert');
    }

    private get alertTitle() {
        return $('-ios class chain:**/XCUIElementTypeAlert/**/XCUIElementTypeStaticText[1]');
    }

    private get alertMessage() {
        return $('-ios class chain:**/XCUIElementTypeAlert/**/XCUIElementTypeStaticText[2]');
    }

    private get alertTextField() {
        return $('//XCUIElementTypeAlert//XCUIElementTypeTextField');
    }

    private get alertSecureTextField() {
        return $('//XCUIElementTypeAlert//XCUIElementTypeSecureTextField');
    }

    public async triggerSimpleAlert(): Promise<void> {
        await this.click(this.simpleAlertBtn, 'Simple Alert trigger');
    }

    public async triggerOkayCancelAlert(): Promise<void> {
        await this.click(this.okayCancelAlertBtn, 'Okay / Cancel Alert trigger');
    }

    public async triggerTextEntryAlert(): Promise<void> {
        await this.click(this.textEntryAlertBtn, 'Text Entry Alert trigger');
    }

    public async triggerSecureTextEntryAlert(): Promise<void> {
        await this.click(this.secureTextEntryAlertBtn, 'Secure Text Entry Alert trigger');
    }

    public async triggerDestructiveActionSheet(): Promise<void> {
        await this.click(this.destructiveActionSheetBtn, 'Destructive Action Sheet trigger');
    }

    public async enterTextInAlert(text: string): Promise<void> {
        await this.type(this.alertTextField, text, true, 'Alert input field');
    }

    public async enterSecureTextInAlert(secret: string): Promise<void> {
        await this.type(this.alertSecureTextField, secret, true, 'Secure Alert input field');
    }

    public async acceptAlert(): Promise<void> {
        await AlertHandler.acceptAlert();
    }

    public async dismissAlert(): Promise<void> {
        await AlertHandler.dismissAlert();
    }

    public async clickAlertAction(actionName: string): Promise<void> {
        await AlertHandler.clickAlertButton(actionName);
    }

    public async getAlertTitle(): Promise<string> {
        return await this.getText(this.alertTitle, 'iOS Alert Title');
    }

    public async isAlertOpen(): Promise<boolean> {
        return await this.isDisplayed(this.alertContainer);
    }
}
