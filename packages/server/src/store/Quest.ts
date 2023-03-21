export class QuestStore {
    quests: any[] = [];
    activeQuest: { id: any; } = null;

    addQuest = (quest: { name: string; description: string; id?: string; }) => {
        this.quests.push(quest);
    }

    deleteQuest = (id: number) => {
        this.quests = this.quests.filter((quest) => {
            return quest.id !== id
        });

        if (this?.activeQuest?.id === id) {
            this.setActiveQuest(null);
        }
    }

    editQuest = (id: number, newQuest: { id: any; name?: string; description?: string; }) => {
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

    setActiveQuest = (id: number) => {
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