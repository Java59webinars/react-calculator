import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";
import calculatorReducer from "./calculatorSlice";

export const store = configureStore({
    reducer: {
        table: tableReducer,
        calculator: calculatorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
