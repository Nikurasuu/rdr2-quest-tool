import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'name', headerName: 'Quest Name', width: 400 },
  { field: 'type', headerName: 'Typ'},
  { field: 'location', headerName: 'Ort'}
];

function QuestList({quests, onSelectHandler, activeQuest}) {
  const selectionModel = activeQuest ? [activeQuest.id] : [];

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