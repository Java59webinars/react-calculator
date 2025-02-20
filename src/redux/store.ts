// store.ts

import { createStore } from "redux";
import { tableReducer } from "./reducers.ts";

// Создаём Redux Store
export const store = createStore(tableReducer);

// Типы для хуков
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
