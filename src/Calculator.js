export class Calculator {
    constructor() {
        this.currentValue = 0; // Текущее значение
        this.lastOperation = null; // Последняя операция
        this.actions = [
            { label: "+", operation: "add" },
            { label: "-", operation: "subtract" },
            { label: "*", operation: "multiply" },
            { label: "/", operation: "divide" },
            { label: "=", operation: "calculate" },
            { label: "C", operation: "reset", className: "cancel" },
        ];
    }

    getActions() {
        return this.actions;
    }

    setValues(value, operation) {
        this.currentValue = value;
        this.lastOperation = operation;
    }

    add(value) {
        this.currentValue += value;
    }

    subtract(value) {
        this.currentValue -= value;
    }

    multiply(value) {
        this.currentValue *= value;
    }

    divide(value) {
        if (value === 0) {
            throw new Error("Cannot divide by zero");
        }
        this.currentValue /= value;
    }

    reset() {
        this.currentValue = 0;
        this.lastOperation = null;
    }

    getResult() {
        return this.currentValue; // Возвращает только результат
    }

    toString() {
        return ` CurrentVal: ${this.currentValue} LastOperation: ${this.lastOperation}`;
    }


}