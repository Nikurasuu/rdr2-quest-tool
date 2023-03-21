export class QuestStore {
    _quests = new Map();
    _activeId = null;

    get activeQuest() {
        return this._quests.get(this._activeId) || null;
    }

    get quests() {
        return Array.from(this._quests.values())
    }

    addQuest = (quest) => {
        this._quests.set(quest.id, quest);
    }

    deleteQuest = (id) => {
        this._quests.delete(id);
    }

    editQuest = (id, newQuest) => {
        if(!this._quests.has(id)) {
            return;
        }
        this._quests.set(id, newQuest);

        if (this?.activeQuest?.id === newQuest.id) {
            this.setActiveQuest(newQuest.id);
        }
    }

    setActiveQuest = (id) => {
        this._activeId = id;
    }
}