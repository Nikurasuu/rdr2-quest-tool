import express from 'express';
const app = express();
const port = 3000;

import { QuestStore } from './store/Quest2';

const store = new QuestStore();
const quest = {name: 'dummyName', description: 'dummyDescription', id: 1};
store.addQuest(quest);;

app.get('/quests', (req, res) => {
    console.log("quests called");
    res.send(store.quests);
    });

app.get('/activeQuest', (req, res) => {
    console.log("activeQuest called");
    res.send(store.activeQuest);
    });

app.post('/addQuest', (req, res) => {
    const quest = {name: req.query.questName, description: req.query.questDescription, id: req.query.questId};
    store.addQuest(quest);
    console.log("Added quest: ", quest);
    res.send(quest);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });