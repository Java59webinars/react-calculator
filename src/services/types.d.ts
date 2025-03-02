declare global{
    type TableRow = {
        operation: string;
        value: number
    }

    interface CustomTableProps {
        rows: TableRow[];
    }

    interface CalculatorInputProps {
        inputValue: string | number;
        setInputValue: (value: string | number) => void;
    }

}
export {};