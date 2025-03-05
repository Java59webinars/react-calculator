export class Calculator {
    currentValue: number = 0;
    lastOperation: string | null = null;
    operations: Record<string, { label: string; action?: (value: number) => void; className?: string }> = {
        add: { label: "+", action: (value) => this.currentValue += value  },
        subtract: { label: "-", action: (value) => this.currentValue -= value },
        multiply: { label: "*", action: (value) => this.currentValue *= value },
        divide: { label: "/", action: (value) => {
                if (value === 0) throw new Error("Cannot divide by zero");
                this.currentValue /= value
            }},
        calculate: { label: "=",
            action: () => {
                this.lastOperation = null; // Завершаем текущую операцию
            }
            }, // Добавляем calculate без action
        reset: { label: "C", className: "cancel", action: () => this.reset() }, // Добавляем reset
    };

    getActions(): { label: string; operation: string; className?: string }[] {
        return Object.entries(this.operations).map(([key, { label, className }]) => ({
            label,
            operation: key,
            className,
        }));
    }

    executeOperation(operation: string, value: number) {
        const operationMethod = this.operations[operation]?.action;
        if (operationMethod) {
            operationMethod(value);
        } else {
            throw new Error(`Unknown operation: ${operation}`);
        }
    }

    reset() {
        this.currentValue = 0;
        this.lastOperation = null;
    }

    getResult(): number {
        return this.currentValue;
    }

    setValues(value: number, operation: string) {
        this.currentValue = value;
        this.lastOperation = operation;
    }

    toString(): string {
        return `Current Value: ${this.currentValue}, Last Operation: ${this.lastOperation ?? "None"}`;
    }
}
