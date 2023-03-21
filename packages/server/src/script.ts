import express from 'express';
const app = express();
const port = 3001;

import { QuestStore } from './store/Quest';

const store = new QuestStore();

app.get('/quests', (req, res) => {
    console.log("quests called");
    res.send(store.quests);
    });

app.post('/addQuest', (req, res) => {
    const quest = {name: req.query.questName as string, description: req.query.questDescription as string, id: req.query.questId};
    store.addQuest(quest);
    console.log("Added quest: ", quest);
    res.sendStatus(200);
    });

app.post('/deleteQuest', (req, res) => {
    const id = Number(req.query.questId);
    store.deleteQuest(id);
    console.log("Deleted quest: ", id);
    res.sendStatus(200);
    });

app.post('/editQuest', (req, res) => {
    const id = Number(req.query.questId);
    const newQuest = {name: req.query.questName as string, description: req.query.questDescription as string, id: id};
    store.editQuest(id, newQuest);
    console.log("Edited quest: ", newQuest);
    res.sendStatus(200);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });