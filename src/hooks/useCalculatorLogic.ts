import { useState, useMemo, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { initializeTable, addRow, resetTable } from "../redux/tableSlice";
import { Calculator } from "../services/Calculator.ts";
import { parseInput, USER_ID_KEY, getUserStorageKey } from "../services/utils";

export const useCalculatorLogic = () => {
    const dispatch = useAppDispatch();
    const rows = useAppSelector((state) => state.table.rows);
    const userId = localStorage.getItem(USER_ID_KEY);

    const [inputValue, setInputValue] = useState<number | string>(0);
    const calculator = useMemo(() => new Calculator(), []);

    useEffect(() => {
        if (userId) {
            const storageKey = getUserStorageKey(userId);
            const savedRows = localStorage.getItem(storageKey);
            if (savedRows) {
                dispatch(initializeTable(JSON.parse(savedRows)));
            }
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userId) {
            const storageKey = getUserStorageKey(userId);
            localStorage.setItem(storageKey, JSON.stringify(rows));
        }
    }, [rows, userId]);

    const handleButtonClick = useCallback((operation: keyof Calculator | "calculate") => {
        try {
            if (operation === "reset") {
                calculator.reset();
                setInputValue(0);
                dispatch(resetTable());
                return;
            }

            const value = parseInput(inputValue);

            if (!calculator.lastOperation) {
                calculator.setValues(value, operation as keyof Calculator);
                return;
            }

            const firstOperand = calculator.currentValue;
            calculator.executeOperation(calculator.lastOperation, value);
            const newRow = {
                operation: `${firstOperand} ${calculator.lastOperation} ${value}`,
                value: calculator.getResult(),
            };
            dispatch(addRow(newRow));
            setInputValue(calculator.getResult());

            calculator.lastOperation = operation !== "calculate" ? operation : null;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }, [inputValue, calculator, dispatch]);

    // 📌 Получаем кнопки динамически
    const buttonData = calculator.getActions();

    return {
        inputValue,
        setInputValue,
        handleButtonClick,
        rows,
        userId,
        buttonData,
    };
};
