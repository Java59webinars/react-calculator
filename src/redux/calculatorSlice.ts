import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Calculator } from "../services/Calculator";
import { saveToLocalStorage, loadFromLocalStorage } from "../services/storage";
import {USER_ID_KEY} from "../services/utils.ts";



const getUserId = () => localStorage.getItem(USER_ID_KEY); // Получаем userId

interface CalculatorState {
    inputValue: string | number;
    calculator: Calculator;
    rows: { operation: string; value: number }[];
    userId: string | null;
}

const initialState: CalculatorState = {
    inputValue: 0,
    calculator: new Calculator(),
    userId: getUserId(), // Загружаем userId из localStorage
    rows: loadFromLocalStorage(getUserId()), // Загружаем данные пользователя
};

const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        setInputValue: (state, action: PayloadAction<string | number>) => {
            state.inputValue = action.payload;
        },
        resetCalculator: (state) => {
            state.calculator.reset();
            state.inputValue = 0;
            state.rows = [];
            saveToLocalStorage(state.userId, []); // 📌 Сброс истории пользователя
        },
        executeOperation: (state, action: PayloadAction<{ operation: keyof typeof state.calculator.operations }>) => {
            const { operation } = action.payload;
            const value = Number(state.inputValue);

            if (!state.calculator.operations[operation]) return;

            if (operation === "reset") {
                state.calculator.reset();
                state.inputValue = 0;
                state.rows = [];
                saveToLocalStorage(state.userId, []); // 📌 Очищаем историю пользователя
                return;
            }

            if (!state.calculator.lastOperation) {
                state.calculator.setValues(value, operation);
                return;
            }

            const firstOperand = state.calculator.getResult();
            state.calculator.executeOperation(state.calculator.lastOperation, value);
            const newRow = {
                operation: `${firstOperand} ${state.calculator.lastOperation} ${value}`,
                value: state.calculator.getResult(),
            };

            state.rows.push(newRow);
            saveToLocalStorage(state.userId, state.rows); // 📌 Сохраняем обновленный список операций

            state.inputValue = state.calculator.getResult();
            state.calculator.lastOperation = operation !== "calculate" ? operation : null;
        },
        setUserId: (state, action: PayloadAction<string | null>) => {
            state.userId = action.payload;
            state.rows = loadFromLocalStorage(action.payload); // 📌 Переключаем историю на нового пользователя
        },
    },
});

export const { setInputValue, resetCalculator, executeOperation, setUserId } = calculatorSlice.actions;
export default calculatorSlice.reducer;
