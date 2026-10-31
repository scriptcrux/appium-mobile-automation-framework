/**
 * Mobile Gesture Configuration & Constants
 */
import type { SwipeDirection } from '../types/index.ts';

export const GESTURE_DIRECTIONS: Record<string, SwipeDirection> = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
} as const;

export const GESTURE_DEFAULTS = {
    SWIPE_DISTANCE_PERCENTAGE: 0.5,
    SWIPE_DURATION_MS: 600,
    HOLD_DURATION_MS: 1000,
    MAX_SCROLL_ATTEMPTS: 8,
    MARGIN_PERCENTAGE: 0.15
} as const;
