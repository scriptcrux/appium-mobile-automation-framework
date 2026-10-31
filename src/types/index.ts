/**
 * Core type definitions for Appium WebdriverIO Mobile Automation Framework
 */

export type Platform = 'android' | 'ios';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

export type ElementRef = ChainablePromiseElement | WebdriverIO.Element;

export interface Point {
    x: number;
    y: number;
}

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface SwipeOptions {
    direction: SwipeDirection;
    distancePercentage?: number; // 0.1 to 0.9 (default: 0.5)
    speedDurationMs?: number; // duration in ms (default: 800)
}

export interface ScrollUntilVisibleOptions {
    maxScrolls?: number;
    direction?: 'up' | 'down';
    scrollDistancePercentage?: number;
}

export interface DragAndDropOptions {
    source: Point | ElementRef;
    target: Point | ElementRef;
    holdDurationMs?: number;
}

export interface PinchZoomOptions {
    scale?: number; // > 1 for zoom in, < 1 for pinch out
    centerPoint?: Point;
}

export interface NoteData {
    title: string;
    body: string;
    category?: string;
}

export interface ChecklistItem {
    text: string;
    completed?: boolean;
}

export interface TodoItem {
    title: string;
    notes?: string;
    priority?: 'Low' | 'Medium' | 'High';
}

export interface DialogAction {
    buttonText?: string;
    shouldAccept?: boolean;
}
