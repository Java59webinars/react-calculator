import { useState, useMemo, useCallback } from "react";
import Buttons from "./Buttons.tsx";
import CustomTable from "./CustomTable.tsx";
import { Calculator } from "./Calculator.ts";
import { parseInput, USER_ID_KEY, logoutUser } from "../services/utils.ts";
import { useTableRows } from "../services/useTableRows.ts";
import { themeStyles } from "../services/themes.ts";
import { Box, TextField, Typography, Button } from "@mui/material";

const CalculatorPage = () => {
    const userId = localStorage.getItem(USER_ID_KEY);

    // Используем кастомный хук useTableRows
    const { rows, addRowToTable, resetRows } = useTableRows(userId);

    const [inputValue, setInputValue] = useState<number | string>(0);
    const calculator = useMemo(() => new Calculator(), []);

    const handleButtonClick = useCallback((operation: keyof Calculator | "calculate") => {
        try {
            if (operation === "reset") {
                calculator.reset();
                setInputValue(0);
                resetRows();
                return;
            }

            const value = parseInput(inputValue);

            if (!calculator.lastOperation) {
                calculator.setValues(value, operation as keyof Calculator);
                return;
            }

            const firstOperand = calculator.currentValue;
            calculator.executeOperation(calculator.lastOperation, value);
            addRowToTable(firstOperand, calculator.lastOperation, value, calculator.getResult());
            setInputValue(calculator.getResult());

            calculator.lastOperation = operation !== "calculate" ? operation : null;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }, [inputValue, calculator, addRowToTable, resetRows]);

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
