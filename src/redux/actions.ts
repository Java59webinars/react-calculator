import { AnyAction } from "redux";

// Типы действий
export const INITIALIZE_TABLE = "INITIALIZE_TABLE";
export const ADD_ROW = "ADD_ROW";
export const RESET_TABLE = "RESET_TABLE";

// Интерфейс строки таблицы
export interface TableRow {
    operation: string;
    value: number;
}

// Интерфейсы действий
export const initializeTable = (rows: TableRow[]): AnyAction => ({
    type: INITIALIZE_TABLE,
    payload: rows
});

export const addRow = (row: TableRow): AnyAction => ({
    type: ADD_ROW,
    payload: row
});

export const resetTable = (): AnyAction => ({
    type: RESET_TABLE
});
