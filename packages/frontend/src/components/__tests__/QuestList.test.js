import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import QuestList from '../QuestList';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    cleanup();
});

test('QuestList shows Quests', () => {
    const quests = [
        {
            "id": 1,
            "name": "testQuestTitle-1",
            "description": "testQuestDescription-1",
            "type": "testQuestType-1",
            "location": "testQuestLocation-1",
            "reward": "testQuestReward-1"
        },
        {
            "id": 2,
            "name": "testQuestTitle-2",
            "description": "testQuestDescription-2",
            "type": "testQuestType-2",
            "location": "testQuestLocation-2",
            "reward": "testQuestReward-2"
        }
    ];
    render(<QuestList quests={quests}/>);
    const dataGrid = screen.getByTestId('questList-1');
    expect(dataGrid).toBeInTheDocument();
    const questTitle1 = screen.getByText('testQuestTitle-1');
    expect(questTitle1).toBeInTheDocument();
    const questTitle2 = screen.getByText('testQuestTitle-2');
    expect(questTitle2).toBeInTheDocument();
});

test('QuestList Click on Quest', () => {
    let activeQuest = null;
    const setActiveQuest = (quest) => {
        activeQuest = quest;
    };
    //GIVEN
    const quests = [
        {
            "id": 1,
            "name": "testQuestTitle-1",
            "description": "testQuestDescription-1",
            "type": "testQuestType-1",
            "location": "testQuestLocation-1",
            "reward": "testQuestReward-1"
        },
        {
            "id": 2,
            "name": "testQuestTitle-2",
            "description": "testQuestDescription-2",
            "type": "testQuestType-2",
            "location": "testQuestLocation-2",
            "reward": "testQuestReward-2"
        }
    ];
    render(<QuestList quests={quests} onSelectHandler={setActiveQuest}/>);

    //WHEN
    const questTitle1 = screen.getByText('testQuestTitle-1');
    act (() => {
        questTitle1.click();
    });

    //THEN
    expect(activeQuest).toEqual({
        "id": 1,
        "name": "testQuestTitle-1",
        "description": "testQuestDescription-1",
        "type": "testQuestType-1",
        "location": "testQuestLocation-1",
        "reward": "testQuestReward-1"
    });
});