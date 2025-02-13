import {Calculator} from "./Calculator.ts";

declare global{
    type TableRow = {
        operation: string;
        value: number
    }

    interface CustomTableProps {
        rows: TableRow[];
    }

    interface ButtonProps {
        label: string;
        operation: keyof Calculator | string;
        className?: string;
    }

    interface ButtonsProps {
      buttonData: ButtonProps[];
      onButtonClick: (operation: keyof Calculator) => void;
    }



}
export {};