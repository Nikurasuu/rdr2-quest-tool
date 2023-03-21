import { render, screen, cleanup } from '@testing-library/react';
import QuestDetails from '../QuestDetails';

afterEach(() => {
    cleanup();
});

test('QuestDetails shows no quest selected', () => {
    render(<QuestDetails />);
    const questDetails = screen.getByTestId('questDetails-1');
    expect(questDetails).toBeInTheDocument();
    const noQuestSelected = screen.getByText('Keine Quest ausgewählt.');
    expect(noQuestSelected).toBeInTheDocument();
});

test('QuestDetails shows selected quest', () => {
    render(<QuestDetails quest={
        {
          "id": 1,
          "name": "testQuestTitle-1",
          "description": "testQuestDescription-1",
          "type": "testQuestType-1",
          "location": "testQuestLocation-1",
          "reward": "testQuestReward-1"
        }
      }/>);
    const questDetails = screen.getByTestId('questDetails-2');
    expect(questDetails).toBeInTheDocument();
    const questTitle = screen.getByText('testQuestTitle-1');
    expect(questTitle).toBeInTheDocument();
    const questDescription = screen.getByText('testQuestDescription-1');
    expect(questDescription).toBeInTheDocument();
    const questType = screen.getByText('testQuestType-1');
    expect(questType).toBeInTheDocument();
    const questLocation = screen.getByText('testQuestLocation-1');
    expect(questLocation).toBeInTheDocument();
    const questReward = screen.getByText('testQuestReward-1');
    expect(questReward).toBeInTheDocument();
});