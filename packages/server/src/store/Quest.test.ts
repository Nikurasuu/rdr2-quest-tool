import { QuestStore } from "./Quest";

describe('Quest Store', () => {
    const db = {
        init: jest.fn(),
        fetch: jest.fn(),
        add: jest.fn(),
        delete: jest.fn(),
        edit: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test ('Initial Store', () => {  
        const store = new QuestStore(db);
        expect(db.init).toBeCalledTimes(1);
    });

    test('Read Quests', async () => {
        const store = new QuestStore(db);
        const quests = [{id: 1, name: 'dummyName', description: 'dummyDescription'}]; 
        db.fetch.mockResolvedValue(quests); 
        const result = await store.readQuests();
        expect(db.fetch).toBeCalledTimes(1);
        expect(db.fetch).toBeCalledWith('*', 'quests');
        expect(result).toEqual(quests);
    });

    test('Add Quest', () => {
        const store = new QuestStore(db);
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(db.add).toBeCalledTimes(1);
        expect(db.add).toBeCalledWith('quests', ['name', 'description'], ['dummyName', 'dummyDescription']);
    });

    test('Delete Quest', () => {
        const store = new QuestStore(db);
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        store.addQuest(quest);
        expect(db.add).toBeCalledTimes(1);
        expect(db.add).toBeCalledWith('quests', ['name', 'description'], ['dummyName', 'dummyDescription']);
        store.deleteQuest(1);
        expect(db.delete).toBeCalledTimes(1);
        expect(db.delete).toBeCalledWith('quests', 'id = 1');
    });

    test('Edit Quest-1', () => {
        const store = new QuestStore(db);
        const quest = {id: 1, name: 'dummyName', description: 'dummyDescription'}
        const newQuest = {id: 1, name: 'dummyName2', description: 'dummyDescription2'}
        store.addQuest(quest);
        expect(db.add).toBeCalledTimes(1);
        expect(db.add).toBeCalledWith('quests', ['name', 'description'], ['dummyName', 'dummyDescription']);
        store.editQuest(1, newQuest);
        expect(db.edit).toBeCalledTimes(1);
        expect(db.edit).toBeCalledWith('quests', `name = 'dummyName2', description = 'dummyDescription2'`, 'id = 1');
    });
});