import express from 'express';
const app = express();
const port = process?.env?.PORT || 3001;

import { QuestStore } from './store/Quest';

import bodyParser from 'body-parser';
app.use(bodyParser.json());

const store = new QuestStore();

store.addQuest({name: "Quest 1", description: "Description 1"});

app.get('/quests', (req, res) => {
    console.log("quests called");
    //simulate a delay
    setTimeout(() => {
        res.send(store.quests);
    }, 2000);
    });

app.post('/quests', (req, res) => {
    const body = req.body;
    console.log("adding quest: ", body);
    store.addQuest(body);
    console.log("New Quest got Id: ", store.quests[store.quests.length - 1].id);
    setTimeout(() => {
        res.send(store.quests[store.quests.length - 1]);
    }, 2000);
    });

app.delete('/quests/:questId', (req, res) => {
    const id = Number(req.params.questId);
    store.deleteQuest(id);
    console.log("Deleted quest: ", id);
    res.sendStatus(200);
    });

app.put('/quests/:questId', (req, res) => {
    const id = Number(req.params.questId);
    const newQuest = req.body;
    store.editQuest(id, newQuest);
    console.log("Edited quest: ", newQuest);
    res.sendStatus(200);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });