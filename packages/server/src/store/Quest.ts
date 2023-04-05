import { Database } from "../database";

export class QuestStore {
    db = new Database();
    
    constructor() {
        this.db.init();
    }

    readQuests = async () => {
        const quests = await this.db.fetchAllQuests();
        return quests;
    }

    addQuest = (quest: { name: string; description: string; id?: any; }) => {
        this.db.addQuest(quest);
    }

    deleteQuest = (id: any) => {
        this.db.deleteQuest(id);
    }

    editQuest = (id: number, newQuest: { name: string; description: string; }) => {
        this.db.editQuest(id, newQuest);
    }
}