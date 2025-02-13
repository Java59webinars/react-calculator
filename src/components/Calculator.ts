export class Calculator {
    currentValue: number = 0;
    lastOperation: keyof Calculator | null = null;

    operations: Record<string, { label: string; action?: (value: number) => void; className?: string }> = {
        add: { label: "+", action: (value) => this.currentValue += value  },
        subtract: { label: "-", action: (value) => this.currentValue -= value },
        multiply: { label: "*", action: (value) => this.currentValue *= value },
        divide: { label: "/", action: (value) => {
                if (value === 0) throw new Error("Cannot divide by zero");
                this.currentValue /= value
            }},
        calculate: { label: "=" }, // Добавляем calculate без action
        reset: { label: "C", className: "cancel", action: () => this.reset() }, // Добавляем reset
    };

    getActions(): { label: string; operation: keyof Calculator; className?: string }[] {
        return Object.entries(this.operations).map(([key, { label, className }]) => ({
            label,
            operation: key as keyof Calculator,
            className,
        }));
    }

    executeOperation(operation: keyof Calculator, value: number) {
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

    setValues(value: number, operation: keyof Calculator) {
        this.currentValue = value;
        this.lastOperation = operation;
    }

    toString(): string {
        return `Current Value: ${this.currentValue}, Last Operation: ${this.lastOperation ?? "None"}`;
    }
}
