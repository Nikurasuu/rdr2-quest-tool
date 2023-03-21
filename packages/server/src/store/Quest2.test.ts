import { QuestStore } from "./Quest2";

describe('Quest Store', () => {
    test('Initial Store', () => {
        const store = new QuestStore();
        expect(store.quests).toEqual([]);
    });

    test('Add Quest', () => {
        const store = new QuestStore();
        const quest = {name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
    });

    test('Delete Quest-1', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        store.deleteQuest(1);
        expect(store.quests).toEqual([]);
    });

    test('Delete Quest-2', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        store.deleteQuest(2);
        expect(store.quests).toEqual([quest]);
    });

    test('Edit Quest-1', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        const newQuest = {id: 1, name: 'dummyName2', description: 'dummyDescription2'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        store.editQuest(1, newQuest);
        expect(store.quests).toEqual([newQuest])
    });

    test('Edit Quest-2', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        const newQuest = {id: 1, name: 'dummyName2', description: 'dummyDescription2'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        store.editQuest(2, newQuest);
        expect(store.quests).toEqual([quest])
    });

    test('Active Quest', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        expect(store.activeQuest).toEqual(null);
        store.setActiveQuest(1);
        expect(store.activeQuest).toEqual(quest);
    });

    test('Active Quest-2', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        expect(store.activeQuest).toEqual(null);
        store.setActiveQuest(2);
        expect(store.activeQuest).toEqual(null);
    });

    test('Edit active Quest', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        const newQuest = {id: 1, name: 'dummyName2', description: 'dummyDescription2'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        expect(store.activeQuest).toEqual(null);
        store.setActiveQuest(1);
        expect(store.activeQuest).toEqual(quest);
        store.editQuest(1, newQuest);
        expect(store.activeQuest).toEqual(newQuest);
    });

    test('Delete Active Quest', () => {
        const store = new QuestStore();
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(store.quests).toEqual([quest]);
        expect(store.activeQuest).toEqual(null);
        store.setActiveQuest(1);
        expect(store.activeQuest).toEqual(quest);
        store.deleteQuest(1);
        expect(store.activeQuest).toEqual(null);
    })
});