import EditQuestDialog from "../EditQuestDialog";
import { render, screen, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";

afterEach(() => {
    cleanup();
});

test("EditQuestDialog renders", () => {
    //GIVEN
    const activeQuest = null;

    //WHEN
    render(<EditQuestDialog openEditDialog={true} activeQuest={activeQuest} />);

    //THEN
    const editQuestDialog = screen.getByTestId("editQuestDialog-1");
    expect(editQuestDialog).toBeInTheDocument();
});

test("EditQuestDialog shows Buttons", () => {
    //GIVEN
    const activeQuest = null;

    //WHEN
    render(<EditQuestDialog openEditDialog={true} activeQuest={activeQuest} />);

    //THEN
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument();
});

test("EditQuestDialog shows textfields", () => {
    //GIVEN
    const activeQuest = null;

    //WHEN
    render(<EditQuestDialog openEditDialog={true} activeQuest={activeQuest} />);

    //THEN
    const questTitle = screen.getByText("Quest Name");
    expect(questTitle).toBeInTheDocument();
    const questDescription = screen.getByText("Quest Description");
    expect(questDescription).toBeInTheDocument();
    const questType = screen.getByText("Quest Type");
    expect(questType).toBeInTheDocument();
    const questLocation = screen.getByText("Quest Location");
    expect(questLocation).toBeInTheDocument();
    const questReward = screen.getByText("Quest Reward");
    expect(questReward).toBeInTheDocument();
});

test("EditQuestDialog shows activeQuest", () => {
    //GIVEN
    const activeQuest = {
        id: 1,
        name: "testQuestName-1",
        description: "testQuestDescription-1",
        type: "testQuestType-1",
        location: "testQuestLocation-1",
        reward: "testQuestReward-1",
    };

    //WHEN
    render(<EditQuestDialog openEditDialog={true} activeQuest={activeQuest} />);
    
    //THEN
    //Alles andere ist kein textField!!
    const questName = screen.getByText("testQuestName-1");
    expect(questName).toBeInTheDocument();
    const questDescription = screen.getByText("testQuestDescription-1");
    expect(questDescription).toBeInTheDocument();
    const questType = screen.getByText("testQuestType-1");
    expect(questType).toBeInTheDocument();
    const questLocation = screen.getByText("testQuestLocation-1");
    expect(questLocation).toBeInTheDocument();
    const questReward = screen.getByText("testQuestReward-1");
    expect(questReward).toBeInTheDocument();
});

test("EditQuestDialog empty fields", () => {
    //GIVEN
    const activeQuest = {
        id: 1,
        name: "testQuestName-1",
        description: "testQuestDescription-1",
        type: "testQuestType-1",
        location: null,
        reward: "testQuestReward-1",
    };
    render(<EditQuestDialog openEditDialog={true} activeQuest={activeQuest} />);

    //WHEN
    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();
    act(() => {
        submitButton.click();
    });

    //THEN
    const emptyFieldsAlert = screen.getByText("You need to fill out all fields");
    expect(emptyFieldsAlert).toBeInTheDocument();
});

test("EditQuestDialog Save with correct data", () => {
    //GIVEN
    let quests = [];
    const setQuests = (newQuests) => quests = newQuests;

    let activeQuest = {
        id: 1,
        name: "testQuestName-1",
        description: "testQuestDescription-1",
        type: "testQuestType-1",
        location: "testQuestLocation-1",
        reward: "testQuestReward-1",
    };
    const setActiveQuest = (quest) => activeQuest = quest;

    const handleNewQuest = (newQuest) => {
        let questExists = false;
        let newQuests = quests.map((quest) => {
            if (quest.id === newQuest.id) {
                questExists = true;
                return newQuest;
            }
            return quest;
        });
        if (questExists) {
            setQuests(newQuests);
            setActiveQuest(null);
            return;
        }
        setQuests([...quests, newQuest]);
        setActiveQuest(null);
    };

    let openEditDialog = true;
    const setOpenEditDialog = (open) => openEditDialog = open;

    //WHEN
    render(<EditQuestDialog openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} activeQuest={activeQuest} handleNewQuest={handleNewQuest} setActiveQuest={setActiveQuest} />);
    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();
    act(() => {
        submitButton.click();
    });

    //THEN
    expect(quests.length).toBe(1);
    expect(quests[0].id).toBe(1);
    expect(quests[0].name).toBe("testQuestName-1");
    expect(quests[0].description).toBe("testQuestDescription-1");
    expect(quests[0].type).toBe("testQuestType-1");
    expect(quests[0].location).toBe("testQuestLocation-1");
    expect(quests[0].reward).toBe("testQuestReward-1");
    expect(openEditDialog).toBe(false);
});
