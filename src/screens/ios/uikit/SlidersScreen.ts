/**
 * iOS UIKitCatalog Sliders Screen Object
 * Showcases automation of iOS UISlider elements
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';

export class SlidersScreen extends BaseScreen {
    constructor() {
        super('iOS Sliders Screen');
    }

    private get defaultSlider() {
        return $('//XCUIElementTypeSlider[1]');
    }

    private get tintedSlider() {
        return $('//XCUIElementTypeSlider[2]');
    }

    public async setSliderPercentage(
        sliderElement: ChainablePromiseElement,
        percentageString: string
    ): Promise<void> {
        // percentageString e.g. "80%" or "0.8"
        const slider = await sliderElement;
        await this.waitForDisplayed(slider, 10000, 'iOS Slider');
        await slider.setValue(percentageString);
    }

    public async setDefaultSliderValue(percentage: string): Promise<void> {
        await this.setSliderPercentage(this.defaultSlider, percentage);
    }

    public async getDefaultSliderValue(): Promise<string> {
        const slider = await this.defaultSlider;
        return await slider.getValue();
    }
}
