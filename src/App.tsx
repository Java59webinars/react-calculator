import {useState, useMemo, useEffect, useCallback} from "react";
import Buttons from "./components/Buttons.tsx";
import CustomTable from "./components/CustomTable.tsx";
import {Calculator} from "./components/Calculator.ts";
import {parseInput, LOCAL_STORAGE_KEY} from "./components/utils.ts";
import {themeStyles} from "./components/themes.ts";
import {Box, TextField} from "@mui/material";
import "./App.css";

const App = () => {
    const [rows, setRows] = useState<TableRow[]>(() => {
        const savedRows = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedRows ? JSON.parse(savedRows) : [];
    });
    const [inputValue, setInputValue] = useState<number | string>(0);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
    }, [rows]);

    const calculator = useMemo(() => new Calculator(), []);

    function addRowToTable(firstOperand: number, lastOperation: string, secondOperand: number, result: number) {
        const row = {
            operation: `${firstOperand} ${lastOperation} ${secondOperand}`,
            value: result
        };
        setRows((prev) => [...prev, row]);
    }

    const handleButtonClick = useCallback((operation: keyof Calculator | "calculate") => {
        try {
            if (operation === "reset") {
                calculator.reset();
                setInputValue(0);
                setRows([]);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
            if (operation === "calculate" && !calculator.lastOperation) {
                return;
            }
            if (!calculator.lastOperation) {
                const value = parseInput(inputValue);
                calculator.setValues(value, operation as keyof Calculator);
                return;
            }
            const secondOperand = parseInput(inputValue);
            const firstOperand = calculator.currentValue;
            calculator.executeOperation(calculator.lastOperation, secondOperand);
            addRowToTable(firstOperand, calculator.lastOperation, secondOperand, calculator.getResult());
            setInputValue(calculator.getResult());
            calculator.lastOperation = operation !== 'calculate' ? operation : null;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }, [inputValue, calculator, setRows]);

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
