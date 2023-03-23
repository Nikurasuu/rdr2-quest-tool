import React, { useEffect } from "react";
import { 
    Grid, Card, CardActions, CardContent, Button, 
    Dialog, DialogActions, DialogContent, DialogContentText, 
    DialogTitle, Snackbar 
} from "@mui/material";
import QuestList from "./QuestList";
import QuestDetails from "./QuestDetails";
import EditQuestDialog from "./EditQuestDialog";

let quest = [];

function QuestContainer() {

    const [quests, setQuests] = React.useState(quest);
    const [activeQuest, setActiveQuest] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openNotSelectedAlert, setOpenNotSelectedAlert] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);

    function fetchQuests() {
        fetch(`http://localhost:3001/quests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
         .then((response) => response.json())
         .then((data) => {
                setQuests(data);
        });
    }

    useEffect(() => {
        fetchQuests();
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

    const handleNewQuest = (newQuest) => {
        if (newQuest.id === quests.length + 1) {
            fetch(`http://localhost:3001/addQuest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuest),
            });
        } else {
            fetch(`http://localhost:3001/editQuest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newQuest),
            });
        }
        fetchQuests();
        setActiveQuest(null);
    };

    const addQuest = () => {
        let tempQuest = {
            id: quests.length + 1,
            name: "",
            description: "",
        };
        setActiveQuest(tempQuest);
        handleEditDialog();
    };

    const deleteQuest = () => {
        fetch(`http://localhost:3001/deleteQuest?questId=${activeQuest.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        fetchQuests();
        setActiveQuest(null);
        setOpenDeleteDialog(false);
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
                        <Button onClick={handleDeleteDialog}> Cancel </Button>
                        <div data-testid='deleteQuestButton-1'>
                            <Button onClick={deleteQuest}> Delete </Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
            <EditQuestDialog openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} activeQuest={activeQuest} setActiveQuest={setActiveQuest} handleNewQuest={handleNewQuest}/>
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