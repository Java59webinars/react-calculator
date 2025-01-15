// eslint-disable-next-line no-unused-vars
import React, {useState, useRef} from "react";
import Buttons from "./components/Buttons.jsx";
import Table from "./components/Table.jsx";
import {Calculator} from "./components/Calculator.js";
import {parseInput} from "./components/utils.js";
import "./App.css";




const App = () => {
    const [inputValue, setInputValue] = useState(0);
    const [rows, setRows] = useState([]); //History of operation for the table
   const calculator = useRef(new Calculator()); // Постоянный экземпляр калькулятора
//    const calculator = (new Calculator());


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
        <div>
            <div id="input-container">
                <input
                    type="text"
                    id="input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter a number"
                />
            </div>
            <Buttons
                buttonData={calculator.current.getActions()}
                onButtonClick={handleButtonClick}

            />
            <Table rows={rows}/>
        </div>
    );
};

export default App;