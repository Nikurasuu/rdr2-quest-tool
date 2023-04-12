import { Database } from "../database";

export class QuestStore {
    db: Database;

    constructor(db?: Database) {
        if (db) {
            this.db = db;
            this.db.init();
        } else {
            this.db = new Database();
            this.db.init();
        }
    }

    readQuests = async () => {
        const quests = await this.db.fetch('*', 'quests');
        return quests;
    }

    addQuest = (quest: { name: string; description: string; id?: any; }) => {
        const colums = ['name', 'description'];
        let values = [quest.name, quest.description];
        this.db.add('quests', colums, values);
    }

    deleteQuest = (id: any) => {
        const where = `id = ${id}`;
        this.db.delete('quests', where);
    }

    editQuest = (id: number, newQuest: { name: string; description: string; }) => {
        const set = `name = '${newQuest.name}', description = '${newQuest.description}'`;
        const where = `id = ${id}`;
        this.db.edit('quests', set, where);
    }
}