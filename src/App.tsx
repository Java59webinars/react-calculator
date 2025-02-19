import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./components/Buttons.tsx";
import CustomTable from "./components/CustomTable.tsx";
import { Calculator } from "./components/Calculator.ts";
import { parseInput, USER_ID_KEY, logoutUser } from "./components/utils.ts";
import { useTableRows } from "./components/useTableRows.ts";
import { themeStyles } from "./components/themes.ts";
import { Box, TextField, Typography, Button } from "@mui/material";
import "./App.css";

const App = () => {
    const navigate = useNavigate(); // Хук для перенаправления на другую страницу

    // Получаем userId из localStorage (может быть null)
    const userId = localStorage.getItem(USER_ID_KEY);

    // Хук вызывается всегда, даже если нет userId
    const { rows, addRowToTable, resetRows } = useTableRows(userId || "guest");

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

            calculator.lastOperation = operation !== 'calculate' ? operation : null;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }, [inputValue, calculator, addRowToTable, resetRows]);

    // Функция выхода из системы
    const handleLogout = () => {
        logoutUser(); // Удаляем токен и userId
        navigate("/login"); // Перенаправляем пользователя на страницу входа
    };

    // Если нет userId, показываем сообщение об ошибке
    if (!userId) {
        return <Typography variant="h5" color="error">User is not authenticated</Typography>;
    }

    return (
        <Box sx={themeStyles.app.container}>
            {/* Кнопка Logout */}
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

export default App;
