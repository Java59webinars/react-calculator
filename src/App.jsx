// eslint-disable-next-line no-unused-vars
import React, {useState, useRef} from "react";
import Buttons from "./components/Buttons.jsx";
import Table from "./components/Table.jsx";
import {Calculator} from "./components/Calculator.js";
import {parseInput} from "./components/utils.js";
import "./App.css";


const App = () => {

   const calculator = useRef(new Calculator()); // Постоянный экземпляр калькулятора
//    const calculator = (new Calculator());





    return (
        <div>
            <div id="input-container">
                <input
                    type="text"
                    id="input"

                    placeholder="Enter a number"
                />
            </div>
            <Buttons
                buttonData={calculator.current.getActions()}

            />
            <Table/>
        </div>
    );
};

export default App;