import {useState, useMemo, useCallback} from "react";
import Buttons from "./components/Buttons.tsx";
import CustomTable from "./components/CustomTable.tsx";
import {Calculator} from "./components/Calculator.ts";
import {parseInput} from "./components/utils.ts";
import {useTableRows} from "./components/useTableRows.ts";
import {themeStyles} from "./components/themes.ts";
import {Box, TextField} from "@mui/material";
import "./App.css";

const App = () => {
    const { rows, addRowToTable, resetRows } = useTableRows();
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
                // Если предыдущей операции нет, сохраняем текущий ввод и операцию
                calculator.setValues(value, operation as keyof Calculator);
                return;
            }

            // Если предыдущая операция есть, выполняем её и добавляем результат в таблицу
            const firstOperand = calculator.currentValue;
            calculator.executeOperation(calculator.lastOperation, value);
            addRowToTable(firstOperand, calculator.lastOperation, value, calculator.getResult());
            setInputValue(calculator.getResult());

            // Если нажата не кнопка "=", сохраняем операцию для следующего вычисления
            calculator.lastOperation = operation !== 'calculate' ? operation : null;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }, [inputValue, calculator, addRowToTable, resetRows]);

    return (
        <Box sx={themeStyles.app.container}>
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
            <CustomTable rows={rows}/>
        </Box>
    );
};

export default App;
