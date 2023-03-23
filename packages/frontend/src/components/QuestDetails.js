import React from 'react';
import { z } from 'zod';

const questSchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
});

export function QuestDetails({ quest }) {
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
            <h2>{quest.name}</h2>
            <p>{quest.description}</p>
        </div>
    );
}

export default QuestDetails;