export class QuestStore {
    _quests = new Map();
    _activeId: any = null;

    get activeQuest() {
        return this._quests.get(this._activeId) || null;
    }

    get quests() {
        return Array.from(this._quests.values())
    }

    addQuest = (quest: { name?: any; description?: any; id?: any; }) => {
        this._quests.set(quest.id, quest);
    }

    deleteQuest = (id: number) => {
        this._quests.delete(id);
    }

    editQuest = (id: number, newQuest: { id: any; name?: string; description?: string; }) => {
        if(!this._quests.has(id)) {
            return;
        }
        this._quests.set(id, newQuest);

        if (this?.activeQuest?.id === newQuest.id) {
            this.setActiveQuest(newQuest.id);
        }
    }

    setActiveQuest = (id: number) => {
        this._activeId = id;
    }
}