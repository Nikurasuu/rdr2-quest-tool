import React from 'react';
import { z } from 'zod';

import { Quest } from "./types";

const questSchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
});

export function QuestDetails({ quest } : { quest : Quest | null }) {
    try {
        questSchema.parse(quest);
    }
    catch(error) {
        return (
            <div className = "QuestDetails" style={{ height: '100%', width: '100%' }} data-testid="questDetails-1">
                <p>Keine Quest ausgewählt.</p>
            </div>
            );
    }
    return (
        <div className = "QuestDetails" style={{ height: '100%', width: '100%' }} data-testid="questDetails-2">
            <h2>{quest?.name}</h2>
            <p>{quest?.description}</p>
        </div>
    );
}

export default QuestDetails;