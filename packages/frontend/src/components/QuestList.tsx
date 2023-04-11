import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Quest } from "./types";

const columns = [
  { field: 'name', headerName: 'Quest Name', width : 400 },
];

function QuestList({ quests, onSelectHandler, activeQuest }: {
  quests: Quest[],
  onSelectHandler: (quest: Quest) => void,
  activeQuest: Quest | null
}) {
  const selectionModel = activeQuest ? ([activeQuest.id] as string[]) : [];

  return (
        <div data-testid='questList-1'>
          <DataGrid
            rows={quests}
            columns={columns}
            pageSize={15}
            onRowClick={(cell) => onSelectHandler(cell.row)}
            autoHeight {...quests}
            selectionModel={selectionModel}
            rowsPerPageOptions={[15]}
          />
        </div>
  );
}

export default QuestList;