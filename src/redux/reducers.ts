import { TableActionTypes, TableRow, INITIALIZE_TABLE, ADD_ROW, RESET_TABLE } from "./actions.ts";

// Интерфейс состояния таблицы
interface TableState {
    rows: TableRow[];
}

// Начальное состояние
const initialState: TableState = {
    rows: []
};

// Редьюсер таблицы
export const tableReducer = (state = initialState, action: TableActionTypes): TableState => {
    switch (action.type) {
        case INITIALIZE_TABLE:
            return { ...state, rows: action.payload };

        case ADD_ROW:
            return { ...state, rows: [...state.rows, action.payload] };

        case RESET_TABLE:
            return { ...state, rows: [] };

        default:
            return state;
    }
};
