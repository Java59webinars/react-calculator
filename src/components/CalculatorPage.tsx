import { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Buttons from "./Buttons.tsx";
import CustomTable from "./CustomTable.tsx";
import { Calculator } from "./Calculator.ts";
import { parseInput, USER_ID_KEY, logoutUser, getUserStorageKey } from "../services/utils.ts";
import { initializeTable, addRow, resetTable, TableRow } from "../redux/actions.ts";
import { RootState } from "../redux/store.ts";
import { themeStyles } from "../services/themes.ts";
import { Box, TextField, Typography, Button } from "@mui/material";

const CalculatorPage = () => {
    const userId = localStorage.getItem(USER_ID_KEY);

    // Доступ к состоянию через Redux
    const rows = useSelector((state: RootState) => state.rows);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState<number | string>(0);
    const calculator = useMemo(() => new Calculator(), []);

    // Инициализация таблицы при монтировании компонента
    useEffect(() => {
        if (userId) {
            const storageKey = getUserStorageKey(userId);
            const savedRows = localStorage.getItem(storageKey);
            if (savedRows) {
                dispatch(initializeTable(JSON.parse(savedRows)));
            }
        }
    }, [dispatch, userId]);

    // Синхронизация данных с localStorage при изменении rows
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
            const newRow: TableRow = {
                operation: `${firstOperand} ${calculator.lastOperation} ${value}`,
                value: calculator.getResult()
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

    const handleLogout = () => {
        logoutUser();
        window.location.href = "/login";
    };

    if (!userId) {
        return <Typography variant="h5" color="error">User is not authenticated</Typography>;
    }

    return (
        <Box sx={themeStyles.app.container}>
            <Button variant="outlined" color="error" onClick={handleLogout} sx={{ alignSelf: "flex-end" }}>
                Logout
            </Button>

            <TextField
                label="Enter a number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                sx={themeStyles.app.textField}
            />
            <Buttons
                buttonData={calculator.getActions()}
                onButtonClick={handleButtonClick}
            />
            <CustomTable rows={rows} />
        </Box>
    );
};

export default CalculatorPage;
