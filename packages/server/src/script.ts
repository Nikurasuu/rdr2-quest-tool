import express from 'express';
const app = express();
const port = 3001;

import { QuestStore } from './store/Quest';

import bodyParser from 'body-parser';
app.use(bodyParser.json());

const store = new QuestStore();

store.addQuest({name: "Quest 1", description: "Description 1"});

app.get('/quests', (req, res) => {
    console.log("quests called");
    res.send(store.quests);
    });

app.post('/addQuest', (req, res) => {
    const body = req.body;
    console.log("addQuest called with body: ", body);
    store.addQuest(body);
    console.log("New Quest got Id: ", store.quests[store.quests.length - 1].id);
    res.send(store.quests[store.quests.length - 1]);
    });

app.post('/deleteQuest', (req, res) => {
    const id = Number(req.query.questId);
    store.deleteQuest(id);
    console.log("Deleted quest: ", id);
    res.sendStatus(200);
    });

app.post('/editQuest', (req, res) => {
    const id = Number(req.body.id);
    const newQuest = req.body;
    store.editQuest(id, newQuest);
    console.log("Edited quest: ", newQuest);
    res.sendStatus(200);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });