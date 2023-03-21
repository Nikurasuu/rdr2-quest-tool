export class QuestStore {
    quests = [];
    activeQuest = null;

    addQuest = (quest) => {
        this.quests.push(quest);
    }

    deleteQuest = (id) => {
        this.quests = this.quests.filter((quest) => {
            return quest.id !== id
        });

        if (this?.activeQuest?.id === id) {
            this.setActiveQuest(null);
        }
    }

    editQuest = (id, newQuest) => {
        this.quests = this.quests.map((quest) => {
            if(quest.id !== id){
                return quest;
            }
            return newQuest;
        });

        if (this?.activeQuest?.id === newQuest.id) {
            this.setActiveQuest(newQuest.id);
        }
    }

    setActiveQuest = (id) => {
        if (id === null){
            this.activeQuest = null;
            return;
        }
        const newActiveQuest = this.quests.find((quest) => {
            return quest.id === id
        });
        if (newActiveQuest !== undefined){
            this.activeQuest = newActiveQuest
        }
    }
}