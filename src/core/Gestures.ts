/**
 * Professional W3C Actions API Gestures Implementation for Mobile (Appium 2.x + WDIO 9)
 * Supports both Android (UiAutomator2) and iOS (XCUITest)
 */
import { Logger } from './Logger.ts';
import { GESTURE_DEFAULTS } from '../constants/gestures.ts';
import type { Point, SwipeOptions, ScrollUntilVisibleOptions, ElementRef } from '../types/index.ts';

export class Gestures {
    /**
     * Get device window viewport dimensions
     */
    public static async getWindowSize(): Promise<{ width: number; height: number }> {
        return await driver.getWindowSize();
    }

    /**
     * Perform a touch swipe across coordinates using W3C pointer actions
     */
    public static async swipeCoordinates(from: Point, to: Point, durationMs: number = GESTURE_DEFAULTS.SWIPE_DURATION_MS): Promise<void> {
        Logger.debug(`Executing W3C swipe from (${from.x}, ${from.y}) to (${to.x}, ${to.y}) [${durationMs}ms]`, 'Gestures');
        
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(from.x), y: Math.round(from.y) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 150 },
                    { type: 'pointerMove', duration: durationMs, x: Math.round(to.x), y: Math.round(to.y) },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
        await driver.pause(200);
    }

    /**
     * Perform directional swipe on screen
     */
    public static async swipe(options: SwipeOptions): Promise<void> {
        const { direction, distancePercentage = GESTURE_DEFAULTS.SWIPE_DISTANCE_PERCENTAGE, speedDurationMs = GESTURE_DEFAULTS.SWIPE_DURATION_MS } = options;
        const { width, height } = await this.getWindowSize();

        const centerX = width / 2;
        const centerY = height / 2;

        let from: Point;
        let to: Point;

        switch (direction) {
            case 'up':
                // Swipe finger UP = content scrolls DOWN
                from = { x: centerX, y: centerY + (height * distancePercentage) / 2 };
                to = { x: centerX, y: centerY - (height * distancePercentage) / 2 };
                break;
            case 'down':
                // Swipe finger DOWN = content scrolls UP
                from = { x: centerX, y: centerY - (height * distancePercentage) / 2 };
                to = { x: centerX, y: centerY + (height * distancePercentage) / 2 };
                break;
            case 'left':
                // Swipe finger LEFT = carousel moves right
                from = { x: centerX + (width * distancePercentage) / 2, y: centerY };
                to = { x: centerX - (width * distancePercentage) / 2, y: centerY };
                break;
            case 'right':
                // Swipe finger RIGHT = carousel moves left
                from = { x: centerX - (width * distancePercentage) / 2, y: centerY };
                to = { x: centerX + (width * distancePercentage) / 2, y: centerY };
                break;
        }

        Logger.info(`Performing swipe ${direction.toUpperCase()}`, 'Gestures');
        await this.swipeCoordinates(from, to, speedDurationMs);
    }

    /**
     * Scroll until an element becomes visible on screen
     */
    public static async scrollUntilVisible(
        target: ElementRef,
        options: ScrollUntilVisibleOptions = {}
    ): Promise<boolean> {
        const { maxScrolls = GESTURE_DEFAULTS.MAX_SCROLL_ATTEMPTS, direction = 'up', scrollDistancePercentage = 0.4 } = options;
        const element = (await target) as unknown as WebdriverIO.Element;

        Logger.info(`Scrolling ${direction.toUpperCase()} to find element (max attempts: ${maxScrolls})`, 'Gestures');

        for (let attempt = 1; attempt <= maxScrolls; attempt++) {
            if (await element.isDisplayed()) {
                Logger.info(`Element found after ${attempt - 1} scroll(s)`, 'Gestures');
                return true;
            }

            await this.swipe({
                direction,
                distancePercentage: scrollDistancePercentage
            });
            await driver.pause(400);
        }

        return await element.isDisplayed();
    }

    /**
     * Drag from source element or coordinate to target
     */
    public static async dragAndDrop(
        source: Point | ElementRef,
        target: Point | ElementRef,
        holdDurationMs: number = GESTURE_DEFAULTS.HOLD_DURATION_MS
    ): Promise<void> {
        const fromCoord = await this.resolvePoint(source);
        const toCoord = await this.resolvePoint(target);

        Logger.info(`Drag and drop from (${fromCoord.x}, ${fromCoord.y}) to (${toCoord.x}, ${toCoord.y})`, 'Gestures');

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(fromCoord.x), y: Math.round(fromCoord.y) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: holdDurationMs }, // long press before moving
                    { type: 'pointerMove', duration: 1000, x: Math.round(toCoord.x), y: Math.round(toCoord.y) },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Draw a continuous multi-point path (e.g. Signature Pad, Canvas Drawing)
     * Interview Highlight: Demonstrates advanced sequential W3C pointer actions
     */
    public static async drawPath(points: Point[], strokeDurationMs: number = 200): Promise<void> {
        if (!points || points.length < 2) {
            throw new Error('drawPath requires at least two points');
        }

        Logger.info(
            `Drawing vector path across ${points.length} points using W3C Actions`,
            'Gestures'
        );

        const initialPoint = points[0];
        const pointerActions: Array<Record<string, unknown>> = [
            {
                type: 'pointerMove',
                duration: 0,
                x: Math.round(initialPoint.x),
                y: Math.round(initialPoint.y)
            },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 50 }
        ];

        for (let i = 1; i < points.length; i++) {
            pointerActions.push({
                type: 'pointerMove',
                duration: strokeDurationMs,
                x: Math.round(points[i].x),
                y: Math.round(points[i].y)
            });
        }

        pointerActions.push({ type: 'pointerUp', button: 0 });

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: pointerActions
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Swipe to Refresh (Pull down from top with release)
     */
    public static async swipeToRefresh(): Promise<void> {
        const { width, height } = await this.getWindowSize();
        const centerX = width / 2;
        const startY = height * 0.25;
        const endY = height * 0.75;

        Logger.info('Performing pull-to-refresh swipe', 'Gestures');
        await this.swipeCoordinates({ x: centerX, y: startY }, { x: centerX, y: endY }, 600);
        await driver.pause(1000);
    }

    /**
     * Draw a continuous multi-point path (e.g. Signature Pad, Canvas Drawing)
     * Interview Highlight: Demonstrates advanced sequential W3C pointer actions
     */
    public static async drawPath(points: Point[], strokeDurationMs: number = 200): Promise<void> {
        if (!points || points.length < 2) {
            throw new Error('drawPath requires at least two points');
        }

        Logger.info(`Drawing vector path across ${points.length} points using W3C Actions`, 'Gestures');

        const initialPoint = points[0];
        const pointerActions: Array<Record<string, unknown>> = [
            { type: 'pointerMove', duration: 0, x: Math.round(initialPoint.x), y: Math.round(initialPoint.y) },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 50 }
        ];

        for (let i = 1; i < points.length; i++) {
            pointerActions.push({
                type: 'pointerMove',
                duration: strokeDurationMs,
                x: Math.round(points[i].x),
                y: Math.round(points[i].y)
            });
        }

        pointerActions.push({ type: 'pointerUp', button: 0 });

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: pointerActions
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Swipe to Refresh (Pull down from top with release)
     */
    public static async swipeToRefresh(): Promise<void> {
        const { width, height } = await this.getWindowSize();
        const centerX = width / 2;
        const startY = height * 0.25;
        const endY = height * 0.75;

        Logger.info('Performing pull-to-refresh swipe', 'Gestures');
        await this.swipeCoordinates({ x: centerX, y: startY }, { x: centerX, y: endY }, 600);
        await driver.pause(1000);
    }

    /**
     * Long press / touch and hold on element or coordinate
     */
    public static async touchAndHold(target: Point | ElementRef, durationMs: number = 1500): Promise<void> {
        const point = await this.resolvePoint(target);
        Logger.info(`Touch and hold at (${point.x}, ${point.y}) for ${durationMs}ms`, 'Gestures');

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(point.x), y: Math.round(point.y) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: durationMs },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Tap at exact screen point
     */
    public static async tapAtPoint(point: Point): Promise<void> {
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(point.x), y: Math.round(point.y) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Multi-touch pinch or zoom gesture
     */
    public static async pinchZoom(scale: number = 0.5): Promise<void> {
        const { width, height } = await this.getWindowSize();
        const centerX = width / 2;
        const centerY = height / 2;
        const offset = (Math.min(width, height) / 4) * scale;

        Logger.info(`Performing pinch/zoom (scale: ${scale})`, 'Gestures');

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(centerX - offset), y: Math.round(centerY - offset) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 800, x: Math.round(centerX), y: Math.round(centerY) },
                    { type: 'pointerUp', button: 0 }
                ]
            },
            {
                type: 'pointer',
                id: 'finger2',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: Math.round(centerX + offset), y: Math.round(centerY + offset) },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 800, x: Math.round(centerX), y: Math.round(centerY) },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);
        await driver.releaseActions();
    }

    /**
     * Resolve Point from Point or ElementRef
     */
    private static async resolvePoint(target: Point | ElementRef): Promise<Point> {
        if ('x' in target && 'y' in target && typeof (target as Point).x === 'number') {
            return target as Point;
        }
        const el = (await target) as unknown as WebdriverIO.Element;
        const location = await el.getLocation();
        const size = await el.getSize();
        return {
            x: location.x + size.width / 2,
            y: location.y + size.height / 2
        };
    }
}
