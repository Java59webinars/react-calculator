import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Calculator } from "../services/Calculator";

interface CalculatorState {
    inputValue: string | number;
    calculator: Calculator;
    rows: { operation: string; value: number }[];
}

const initialState: CalculatorState = {
    inputValue: 0,
    calculator: new Calculator(),
    rows: [],
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
        },
        executeOperation: (state, action: PayloadAction<{ operation: string }>) => {
            const { operation } = action.payload;
            const value = Number(state.inputValue);

            if (!state.calculator.operations[operation]) return;

            if (operation === "reset") {
                state.calculator.reset();
                state.inputValue = 0;
                state.rows = [];
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
            state.inputValue = state.calculator.getResult();
            state.calculator.lastOperation = operation !== "calculate" ? operation  : null;
        },
    },
});

export const { setInputValue, resetCalculator, executeOperation } = calculatorSlice.actions;
export default calculatorSlice.reducer;
