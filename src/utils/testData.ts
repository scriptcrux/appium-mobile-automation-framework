/**
 * Test Data Generator and Static Fixtures for Mobile Testing
 */
import type { NoteData, ChecklistItem, TodoItem } from '../types/index.ts';

export class TestDataGenerator {
    /**
     * Generate unique random string suffix
     */
    public static randomSuffix(): string {
        return Math.random().toString(36).substring(2, 8);
    }

    /**
     * Generate dynamic Note data
     */
    public static generateNote(prefix: string = 'Note'): NoteData {
        const id = this.randomSuffix();
        return {
            title: `${prefix} ${id}`,
            body: `Automated test note body created on ${new Date().toISOString()}.\nSession ID: ${id}`,
            category: 'Work'
        };
    }

    /**
     * Generate dynamic Checklist items
     */
    public static generateChecklist(count: number = 3): ChecklistItem[] {
        const items: ChecklistItem[] = [];
        for (let i = 1; i <= count; i++) {
            items.push({
                text: `Task #${i} - [${this.randomSuffix()}]`,
                completed: i % 2 === 0
            });
        }
        return items;
    }

    /**
     * Generate dynamic iOS Todo Item
     */
    public static generateTodo(titlePrefix: string = 'QA Review'): TodoItem {
        const id = this.randomSuffix();
        return {
            title: `${titlePrefix} ${id}`,
            notes: `High priority item verified via Appium XCUITest.\nRef: #${id}`,
            priority: 'High'
        };
    }
}
