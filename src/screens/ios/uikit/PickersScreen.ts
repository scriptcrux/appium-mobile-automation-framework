/**
 * iOS UIKitCatalog Picker View Screen Object
 * Showcases automation of iOS UIPickerView wheels (multi-component color wheels)
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';

export class PickersScreen extends BaseScreen {
    constructor() {
        super('iOS Pickers Screen');
    }

    private get redPickerWheel() {
        return $('//XCUIElementTypePickerWheel[1]');
    }

    private get greenPickerWheel() {
        return $('//XCUIElementTypePickerWheel[2]');
    }

    private get bluePickerWheel() {
        return $('//XCUIElementTypePickerWheel[3]');
    }

    public async setRedWheel(value: string): Promise<void> {
        await this.waitForDisplayed(this.redPickerWheel, 10000, 'Red Picker Wheel');
        const wheel = await this.redPickerWheel;
        await wheel.addValue(value);
    }

    public async setGreenWheel(value: string): Promise<void> {
        await this.waitForDisplayed(this.greenPickerWheel, 10000, 'Green Picker Wheel');
        const wheel = await this.greenPickerWheel;
        await wheel.addValue(value);
    }

    public async setBlueWheel(value: string): Promise<void> {
        await this.waitForDisplayed(this.bluePickerWheel, 10000, 'Blue Picker Wheel');
        const wheel = await this.bluePickerWheel;
        await wheel.addValue(value);
    }

    public async getRedWheelValue(): Promise<string> {
        return await this.getText(this.redPickerWheel, 'Red Picker Wheel');
    }

    public async setRGB(red: string, green: string, blue: string): Promise<void> {
        await this.setRedWheel(red);
        await this.setGreenWheel(green);
        await this.setBlueWheel(blue);
    }
}
