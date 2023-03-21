import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import QuestContainer from '../QuestContainer';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    cleanup();
});

test('QuestContainer renders', () => {
    render(<QuestContainer />);
    const questContainer = screen.getByTestId('questContainer-1');
    expect(questContainer).toBeInTheDocument();
});

test('QuestContainer shows QuestList', () => {
    render(<QuestContainer />);
    const dataGrid = screen.getByTestId('questList-1');
    expect(dataGrid).toBeInTheDocument();
});

test('QuestContainer shows QuestDetails', () => {
    render(<QuestContainer />);
    const questDetails = screen.getByTestId('questDetails-1');
    expect(questDetails).toBeInTheDocument();
});

test('QuestContainer shows Buttons', () => {
    render(<QuestContainer />);
    const dataGrid = screen.getByTestId('questList-1');
    expect(dataGrid).toBeInTheDocument();
    const addButton = screen.getByText('Add Quest');
    expect(addButton).toBeInTheDocument();
    const editButton = screen.getByText('Edit Quest');
    expect(editButton).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete Quest');
    expect(deleteButton).toBeInTheDocument();
});

test('Add Quest Button Click', () => {
    render(<QuestContainer />);
    const addButton = screen.getByText('Add Quest');
    expect(addButton).toBeInTheDocument();
    act(() => {
        addButton.click();
    });
    const editQuestDialog = screen.getByTestId('editQuestDialog-1');
    expect(editQuestDialog).toBeInTheDocument();
});

test('Edit Quest Button Click without activeQuest set', () => {
    render(<QuestContainer />);
    const editButton = screen.getByText('Edit Quest');
    expect(editButton).toBeInTheDocument();
    act(() => {
        editButton.click();
    });
    const noQuestSelected = screen.getByText('Please select a quest');
    expect(noQuestSelected).toBeInTheDocument();
});

test('Delete Quest Button Click without activeQuest set', () => {
    render(<QuestContainer />);
    const deleteButton = screen.getByText('Delete Quest');
    expect(deleteButton).toBeInTheDocument();
    act(() => {
        deleteButton.click();
    });
    const noQuestSelected = screen.getByText('Please select a quest');
    expect(noQuestSelected).toBeInTheDocument();
});

test('Delete Quest Button Click with activeQuest set', () => {
    render(<QuestContainer />);
    const addButton = screen.getByText('Add Quest');
    expect(addButton).toBeInTheDocument();
    act(() => {
        addButton.click();
    });
    const editQuestDialog = screen.getByTestId('editQuestDialog-1');
    expect(editQuestDialog).toBeInTheDocument();
    const deleteButton = screen.getByText('Delete Quest');
    expect(deleteButton).toBeInTheDocument();
    act(() => {
        deleteButton.click();
    });
});