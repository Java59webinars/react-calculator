import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableRow {
    operation: string;
    value: number;
}

interface TableState {
    rows: TableRow[];
}

const initialState: TableState = {
    rows: [],
};
const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        initializeTable: (state, action: PayloadAction<TableRow[]>) => {
            state.rows = action.payload;
        },
        addRow: (state, action: PayloadAction<TableRow>) => {
            state.rows.push(action.payload);
        },
        resetTable: (state) => {
            state.rows = [];
        },
    },
});

export const { initializeTable, addRow, resetTable } = tableSlice.actions;
export default tableSlice.reducer;
