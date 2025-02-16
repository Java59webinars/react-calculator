import  {useState, useRef, useEffect} from "react";
import Buttons from "./components/Buttons.tsx";
import CustomTable from "./components/CustomTable.tsx";
import {Calculator} from "./components/Calculator.ts";
import {parseInput} from "./components/utils.ts";
import {Box, Button, TextField} from "@mui/material";
import "./App.css";
import {useNavigate} from "react-router-dom";

const LOCAL_STORAGE_KEY = "calculatorRows";

const App = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };
    const [rows, setRows] = useState<TableRow[]>(() => {
        const savedRows = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedRows ? JSON.parse(savedRows) : [];
    });
    const [inputValue, setInputValue] = useState<number | string>(0);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
    }, [rows]);
    const calculator = useRef(new Calculator());// Постоянный экземпляр калькулятора
    console.log(calculator.current.operations.multiply);
    function addRowToTable(firstOperand: number, lastOperation: string, secondOperand: number, result: number) {
        const row = {
            operation: `${firstOperand} ${lastOperation} ${secondOperand}`,
            value: result
        }
        setRows((prev) => [...prev, row]);
        console.log("Row added to table", row);
    }
    const handleButtonClick = (operation: keyof Calculator | "calculate") =>{
        try{
            if(operation === "reset"){
                calculator.current.reset();
                setInputValue(0);
                setRows([]);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                console.log("Calculator reset called");
            }
            if(operation === "calculate" && !calculator.current.lastOperation){
                return;
            }
            if(!calculator.current.lastOperation) {
                const value = parseInput(inputValue);
                calculator.current.setValues(value, operation as keyof Calculator)
                return;
            }
            const secondOperand = parseInput(inputValue);
            const firstOperand = calculator.current.currentValue;
            //calculator.current[calculator.current.lastOperation](secondOperand);
            calculator.current.executeOperation(calculator.current.lastOperation, secondOperand);
            addRowToTable(firstOperand, calculator.current.lastOperation, secondOperand, calculator.current.getResult());
            setInputValue( calculator.current.getResult());
            calculator.current.lastOperation = operation !== 'calculate'? operation : null;
            return;
        } catch (error) {
            if (error instanceof Error){
                alert(error.message);
            }
        }
    };
    return (
        <Box
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: 400,          // Задаём фикс. ширину или maxWidth: 400
                margin: "0 auto",    // Чтобы контейнер располагался по центру страницы
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
            <Button onClick={handleLogout} variant="outlined">Выйти</Button>
            <TextField
                label="Enter a number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                sx={{
                    width: "100%",
                    // Если хотите белый фон (по умолчанию TextField - белый),
                    // можно явно указать:
                    backgroundColor: "white",

                    // Уточняем цвет бордера в разных состояниях:
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "primary.main", // основной цвет (синий)
                        },
                        "&:hover fieldset": {
                            borderColor: "primary.dark",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "primary.dark",
                        },
                    },
                }}
            />

            <Buttons
                buttonData={calculator.current.getActions()}
                onButtonClick={handleButtonClick}
            />
            <CustomTable rows={rows}/>
        </Box>
    );
};

export default App;