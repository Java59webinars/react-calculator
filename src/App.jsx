// eslint-disable-next-line no-unused-vars
import React, {useState, useRef} from "react";
import Buttons from "./Buttons";
import Table from "./Table";
import {Calculator} from "./Calculator";
import {parseInput} from "./utils.js";
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