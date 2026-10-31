/**
 * iOS Todo Home Screen Object
 * Showcases iOS list interactions, cell swipes, and task management
 */
import { BaseScreen } from '../../../core/BaseScreen.ts';
import { Gestures } from '../../../core/Gestures.ts';

export class TodoHomeScreen extends BaseScreen {
    constructor() {
        super('iOS Todo Home Screen');
    }

    private get addButton() {
        return $('~Add');
    }

    private get allTaskCells() {
        return $$('//XCUIElementTypeCell');
    }

    private taskCellByTitle(title: string) {
        return $(`-ios predicate string:label CONTAINS "${title}"`);
    }

    private get deleteActionButton() {
        return $('//XCUIElementTypeButton[@name="Delete"]');
    }

    public async openAddTaskScreen(): Promise<void> {
        await this.click(this.addButton, 'Add task button');
    }

    public async isTaskPresent(title: string): Promise<boolean> {
        const cell = this.taskCellByTitle(title);
        return await this.isDisplayed(cell);
    }

    public async deleteTaskBySwipe(title: string): Promise<void> {
        const cell = this.taskCellByTitle(title);
        await this.waitForDisplayed(cell, 10000, `Task cell "${title}"`);

        // Swipe left on cell to expose native iOS swipe-to-delete action
        const location = await cell.getLocation();
        const size = await cell.getSize();

        await Gestures.swipeCoordinates(
            { x: location.x + size.width * 0.9, y: location.y + size.height / 2 },
            { x: location.x + size.width * 0.1, y: location.y + size.height / 2 },
            400
        );

        await this.click(this.deleteActionButton, 'Delete cell action');
    }

    public async getTaskCount(): Promise<number> {
        const cells = await this.allTaskCells;
        return cells.length;
    }
}
