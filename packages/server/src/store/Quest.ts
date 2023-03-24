let questIdIndex = 0;

export class QuestStore {
    quests: any[] = [];
    activeQuest: { id: any; } = null;

    addQuest = (quest: { name: string; description: string; id?: any; }) => {
        questIdIndex++;
        quest.id = questIdIndex;
        this.quests.push(quest);
    }

    deleteQuest = (id: any) => {
        this.quests = this.quests.filter((quest) => {
            return quest.id !== id
        });

        if (this?.activeQuest?.id === id) {
            this.setActiveQuest(null);
        }
    }

    editQuest = (id: number, newQuest: { name: string; description: string; }) => {
        const quest = this.quests.find((quest) => { 
            return quest.id === id              
        });
        if (quest !== undefined){
            quest.name = newQuest.name;
            quest.description = newQuest.description;
        }
    }

    setActiveQuest = (id: any) => {
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