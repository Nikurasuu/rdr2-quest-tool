import React from 'react';
import {    Dialog, DialogTitle, DialogContent, DialogActions,
            TextField, Button, Snackbar     } from '@mui/material';
import { z } from 'zod';
import { Quest } from "./types";

const questSchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
});

function EditQuestDialog({  openEditDialog, setOpenEditDialog, 
                            activeQuest, setActiveQuest, 
                            handleNewQuest,
    isSaving, setIsSaving }: {
        openEditDialog: boolean,
        setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
        activeQuest: Quest | null,
        setActiveQuest: React.Dispatch<React.SetStateAction<Quest | null>>,
        handleNewQuest: (newQuest: Quest) => void,
        isSaving: boolean,
        setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const [name, setName] = React.useState(activeQuest === null ? '' : activeQuest.name);
    const [description, setDescription] = React.useState(activeQuest === null ? '' : activeQuest.description);
    const [openEmptyFieldsAlert, setOpenEmptyFieldsAlert] = React.useState(false);

    const handleEmptyFieldsAlert = () => {
        setOpenEmptyFieldsAlert(!openEmptyFieldsAlert);
    };

    const handleClose = () => {
        setActiveQuest(null);
        setOpenEditDialog(false);
    };

    const handleSave = () => {
        setIsSaving(true);
        const newQuest = {
            id: activeQuest?.id,
            name: name,
            description: description
        };
        try {
            questSchema.parse(newQuest);
            handleNewQuest(newQuest);
        } catch (error) {
            handleEmptyFieldsAlert();
            setIsSaving(false);
            return;
        }
    };
    
    return ( 
        <>
            <Snackbar 
                    open={openEmptyFieldsAlert} 
                    autoHideDuration={6000} 
                    onClose={handleEmptyFieldsAlert}
                    message="You need to fill out all fields"
                />
            <Dialog open={openEditDialog} onClose={handleClose}>
                <div data-testid="editQuestDialog-1">
                    <DialogTitle>Edit Quest</DialogTitle>
                    <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="questName"
                                label="Quest Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                multiline
                                defaultValue={activeQuest === null ? '' : activeQuest.name}
                                onBlur={e => setName(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="questDescription"
                                label="Quest Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                multiline
                                defaultValue={activeQuest === null ? '' : activeQuest.description}
                                onBlur={e => setDescription(e.target.value)}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} disabled={isSaving}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving}>Save</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
     );
}

export default EditQuestDialog;