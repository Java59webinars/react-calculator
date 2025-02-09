export class Calculator {
    lastOperation: keyof Calculator | null;
    currentValue: number;
    actions:({
        label: string; operation: string; className?: string
    })[];

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

    setValues(value: number, operation: keyof Calculator) {
        this.currentValue = value;
        this.lastOperation = operation;
    }

    add(value: number) {
        this.currentValue += value;
    }

    subtract(value: number) {
        this.currentValue -= value;
    }

    multiply(value: number) {
        this.currentValue *= value;
    }

    divide(value: number) {
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

    executeOperation (operation: keyof Calculator, value: number){
        if (typeof this[operation] === "function") {
            (this[operation] as (val: number) => void)(value);
        } else {
            throw new Error(`Unexpected operation: ${operation}`);
        }
    }
}