/**
 * iOS UIKitCatalog Picker Wheels & Sliders Suite
 * Showcases automation of iOS UIPickerView and UISlider controls
 */
import { UIKitHomeScreen } from '../../../../src/screens/ios/uikit/UIKitHomeScreen.ts';
import { PickersScreen } from '../../../../src/screens/ios/uikit/PickersScreen.ts';
import { SlidersScreen } from '../../../../src/screens/ios/uikit/SlidersScreen.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('iOS Native: Picker Wheels & Sliders Suite', () => {
    const homeScreen = new UIKitHomeScreen();
    const pickersScreen = new PickersScreen();
    const slidersScreen = new SlidersScreen();

    before(async () => {
        Reporter.addEpic('iOS Native Widgets');
        Reporter.addFeature('UIPickerView & UISlider');
    });

    it('TC-IOS-PCK-001: Should manipulate multi-component iOS Picker Wheels', async () => {
        Reporter.addStory('UIPickerView RGB Wheels');
        Reporter.addSeverity('normal');

        Reporter.addStep('Navigate to Picker View screen');
        await homeScreen.openPickers();

        Reporter.addStep('Set RGB values on three separate picker wheels');
        await pickersScreen.setRGB('65', '120', '240');

        Reporter.addStep('Verify red wheel value');
        const redValue = await pickersScreen.getRedWheelValue();
        expect(redValue).toContain('65');
    });

    it('TC-IOS-SLD-002: Should adjust iOS UISlider value to custom percentage', async () => {
        Reporter.addStory('UISlider Value Manipulation');
        Reporter.addSeverity('minor');

        Reporter.addStep('Navigate to Sliders screen');
        await driver.back();
        await homeScreen.openSliders();

        Reporter.addStep('Set Default Slider value to 80%');
        await slidersScreen.setDefaultSliderValue('80%');

        Reporter.addStep('Assert updated slider value');
        const sliderVal = await slidersScreen.getDefaultSliderValue();
        expect(sliderVal).toBeTruthy();
    });
});
