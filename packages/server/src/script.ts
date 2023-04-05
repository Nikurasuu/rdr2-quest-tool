
import express from 'express';
import cors from 'cors';

const app = express();

const port = process?.env?.PORT || 3001;

import { QuestStore } from './store/Quest';

import bodyParser from 'body-parser';
app.use(cors());
app.use(bodyParser.json());

const store = new QuestStore();

app.get('/quests', async (req, res) => {
    console.log("GET /quests");
    res.send(await store.readQuests());
    });

app.post('/quests', (req, res) => {
    const body = req.body;
    console.log("POST /quests");
    store.addQuest(body);
    res.sendStatus(200);
    });

app.delete('/quests/:questId', (req, res) => {
    const id = Number(req.params.questId);
    store.deleteQuest(id);
    console.log("DELETE /quests/" + id);
    res.sendStatus(200);
    });

app.put('/quests/:questId', (req, res) => {
    const id = Number(req.params.questId);
    const newQuest = req.body;
    store.editQuest(id, newQuest);
    console.log("PUT /quests/" + id);
    res.sendStatus(200);
    });

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });