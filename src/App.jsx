// eslint-disable-next-line no-unused-vars
import React, {useState, useRef} from "react";
import Buttons from "./components/Buttons.jsx";
import CustomTable from "./components/CustomTable.jsx";
import {Calculator} from "./components/Calculator.js";
import {parseInput} from "./components/utils.js";
import {Box, TextField} from "@mui/material";
import "./App.css";




const App = () => {
    const [inputValue, setInputValue] = useState(0);
    const [rows, setRows] = useState([]); //History of operation for the table
   const calculator = useRef(new Calculator()); // Постоянный экземпляр калькулятора
    function addRowToTable(firstOperand, lastOperation, secondOperand, result) {
        const row = {
            operation: `${firstOperand} ${lastOperation} ${secondOperand}`,
            value: result
        }
        setRows((prev) => [...prev, row]);
        console.log("Row added to table", row);
    }

    const handleButtonClick = (operation) =>{
        try{
            if(operation === "reset"){
                calculator.current.reset();
                setInputValue(0);
                setRows([]);
                console.log("Calculator reset called");
            }

            if(operation === "calculate" && !calculator.current.lastOperation){
                return;
            }
            if(!calculator.current.lastOperation) {
                const value = parseInput(inputValue);
                calculator.current.setValues(value, operation)
                return;
            }
            const secondOperand = parseInput(inputValue);
            const firstOperand = calculator.current.currentValue;
            calculator.current[calculator.current.lastOperation](secondOperand);
            addRowToTable(firstOperand, calculator.current.lastOperation, secondOperand, calculator.current.getResult());
            setInputValue( calculator.current.getResult());
            calculator.current.lastOperation = operation !== 'calculate'? operation : null;
            return;
        } catch (error) {
            alert(error.message);
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