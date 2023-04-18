import React, { useEffect } from "react";
import { 
    Grid, Card, CardActions, CardContent, Button, 
    Dialog, DialogActions, DialogContent, DialogContentText, 
    DialogTitle, Snackbar 
} from "@mui/material";
import QuestList from "./QuestList";
import QuestDetails from "./QuestDetails";
import EditQuestDialog from "./EditQuestDialog";

import { Quest } from "./types";

// process has to be manually checked through this issue :
// https://github.com/facebook/create-react-app/issues/12212
const server =
  (!!window.process && window.process.env && window.process.env.QUESTS_ENDPOINT) || "localhost:8080/quests";

async function questsEndpoint(method: string, body?: object, id?: string) {
    if(id === undefined) id = "";
    try {

        const response = await fetch(`http://${server}/${id}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        }).then((response) => response.json())

        console.log(response)
        return response;
    } catch (error) {
        console.error("Error:", error)
        return null;
    }
}

function QuestContainer() {

    const [quests, setQuests] = React.useState([]);
    const [activeQuest, setActiveQuest] = React.useState<Quest | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openNotSelectedAlert, setOpenNotSelectedAlert] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    useEffect(() => {
        const getQuests = async () => {
            const newQuests = await questsEndpoint("GET");
            if (newQuests !== null) {
                setQuests(newQuests);
                
            }
        };
        getQuests();
    }, []);

    
    const handleDeleteDialog = () => {
        setOpenDeleteDialog(!openDeleteDialog);
    };

    const handleEditDialog = () => {
        setOpenEditDialog(!openEditDialog);
    };

    const handleNotSelectedAlert = () => {
        setOpenNotSelectedAlert(!openNotSelectedAlert);
    };

    const handleClickDelete = () => {
        if (checkIfQuestIsSelected()) {
            handleDeleteDialog();
        }
    };

    const handleClickEdit = () => {
        if (checkIfQuestIsSelected()) {
            handleEditDialog();
        }
    };

    const checkIfQuestIsSelected = () => {
        if (activeQuest === null) {
            handleNotSelectedAlert();
            return false;
        }
        return true;
    };

    const handleNewQuest = async (newQuest : Quest) => {
        if (newQuest.id === undefined) {
            await questsEndpoint("POST", newQuest);
        } else {
            await questsEndpoint("PUT", newQuest, newQuest.id);
        }
        const newQuests = await questsEndpoint("GET");
        if (newQuests !== null) {
            setQuests(newQuests);
        }
        handleEditDialog();
        setActiveQuest(null);
        setIsSaving(false);
    };

    const addQuest = () => {
        let tempQuest = {
            id: undefined,
            name: "",
            description: "",
        };
        setActiveQuest(tempQuest);
        handleEditDialog();
    };

    const deleteQuest = async () => {
        setIsSaving(true);
        await questsEndpoint("DELETE", {}, activeQuest?.id);
        const newQuests = await questsEndpoint("GET");
        if (newQuests !== null) setQuests(newQuests);
        setActiveQuest(null);
        setOpenDeleteDialog(false);
        setIsSaving(false);
    };

    return ( 
        <div data-testid='questContainer-1'>
            <Snackbar 
                open={openNotSelectedAlert} 
                autoHideDuration={6000} 
                onClose={handleNotSelectedAlert}
                message="Please select a quest"
            />
            <div data-testid='deleteQuestDialog-1'>
                <Dialog open={openDeleteDialog} onClose={handleDeleteDialog}>
                    <DialogTitle> Delete Quest? </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this quest?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialog} disabled={isSaving}> Cancel </Button>
                        <div data-testid='deleteQuestButton-1'>
                            <Button onClick={deleteQuest} disabled={isSaving}> Delete </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
            <EditQuestDialog openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} activeQuest={activeQuest} setActiveQuest={setActiveQuest} handleNewQuest={handleNewQuest} isSaving={isSaving} setIsSaving={setIsSaving}/>
            <Grid container spacing={2} style={{height: '100%'}}>
                <Grid item xs={12} sm={4}>
                    <Card className="QuestList">
                        <CardContent>
                            <QuestList quests={quests} onSelectHandler={setActiveQuest} activeQuest={activeQuest} />
                        </CardContent>
                        <CardActions>
                            <Button onClick={addQuest}> Add Quest </Button>
                            <Button onClick={handleClickDelete}> Delete Quest </Button>
                            <Button onClick={handleClickEdit}> Edit Quest </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} style={{height: '100%'}}>
                    <Card style={{height: '100%'}}>
                        <QuestDetails quest={activeQuest} />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default QuestContainer;