import { useState, useEffect } from "react";
import { getUserStorageKey } from "./utils.ts";

interface TableRow {
    operation: string;
    value: number;
}

export const useTableRows = (userId: string | null) => {
    const storageKey = userId ? getUserStorageKey(userId) : "";

    // 1. Инициализация состояния rows
    const [rows, setRows] = useState<TableRow[]>(() => {
        if (userId) {
            const savedRows = localStorage.getItem(storageKey);
            return savedRows ? JSON.parse(savedRows) : [];
        }
        return [];
    });

    // 2. Синхронизация с localStorage
    useEffect(() => {
        if (userId) {
            localStorage.setItem(storageKey, JSON.stringify(rows));
        }
    }, [rows, userId, storageKey]);

    // 3. Добавление новой строки в таблицу
    const addRowToTable = (firstOperand: number, lastOperation: string, secondOperand: number, result: number) => {
        const row = { operation: `${firstOperand} ${lastOperation} ${secondOperand}`, value: result };
        setRows((prev) => [...prev, row]);
    };

    // 4. Сброс таблицы
    const resetRows = () => {
        setRows([]);
        if (userId) {
            localStorage.removeItem(storageKey);
        }
    };

    // Возвращаем функции и состояние для использования в компоненте
    return { rows, addRowToTable, resetRows };
};
