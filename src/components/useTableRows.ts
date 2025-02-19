// useTableRows.ts

import {useState, useEffect} from "react";
import {LOCAL_STORAGE_KEY} from "./utils.ts";

export const useTableRows = () => {
    const [rows, setRows] = useState<TableRow[]>(() => {
        const savedRows = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedRows ? JSON.parse(savedRows) : [];
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
    }, [rows]);

    const addRowToTable = (firstOperand: number, lastOperation: string, secondOperand: number, result: number) => {
        const row = {
            operation: `${firstOperand} ${lastOperation} ${secondOperand}`,
            value: result
        };
        setRows((prev) => [...prev, row]);
    };

    const resetRows = () => {
        setRows([]);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    return { rows, addRowToTable, resetRows };
};
