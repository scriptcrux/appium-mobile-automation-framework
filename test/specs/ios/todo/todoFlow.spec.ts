/**
 * iOS Todo E2E Task Lifecycle Suite
 * Tests item creation, list inspection, and cell swipe-to-delete
 */
import { TodoHomeScreen } from '../../../../src/screens/ios/todo/TodoHomeScreen.ts';
import { AddItemScreen } from '../../../../src/screens/ios/todo/AddItemScreen.ts';
import { TestDataGenerator } from '../../../../src/utils/testData.ts';
import { Reporter } from '../../../../src/utils/reporter.ts';

describe('iOS Todo E2E: Task Management Flow', () => {
    const todoHomeScreen = new TodoHomeScreen();
    const addItemScreen = new AddItemScreen();

    before(async () => {
        Reporter.addEpic('End-to-End Business Workflows');
        Reporter.addFeature('iOS Task Manager');
    });

    it('TC-IOS-TD-001: Should create a task, verify in list, and delete via swipe', async () => {
        Reporter.addStory('Create and Delete Task via Swipe');
        Reporter.addSeverity('blocker');

        const testTodo = TestDataGenerator.generateTodo('iOS Regression');

        Reporter.addStep('Open Add Task screen');
        await todoHomeScreen.openAddTaskScreen();

        Reporter.addStep('Fill task details and save');
        await addItemScreen.createTodo(testTodo);

        Reporter.addStep('Verify task is displayed in list');
        const isPresent = await todoHomeScreen.isTaskPresent(testTodo.title);
        expect(isPresent).toBe(true);

        Reporter.addStep('Swipe left on task cell to delete');
        await todoHomeScreen.deleteTaskBySwipe(testTodo.title);

        Reporter.addStep('Verify task is removed');
        const isStillPresent = await todoHomeScreen.isTaskPresent(testTodo.title);
        expect(isStillPresent).toBe(false);
    });
});
