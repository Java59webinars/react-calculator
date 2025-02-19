import { useState, useEffect } from "react";
import { getUserStorageKey } from "./utils.ts";

export const useTableRows = (userId: string) => {
    // Получаем уникальный ключ для текущего пользователя
    const storageKey = getUserStorageKey(userId);

    // 1. Инициализация состояния rows
    const [rows, setRows] = useState<TableRow[]>(() => {
        const savedRows = localStorage.getItem(storageKey);
        return savedRows ? JSON.parse(savedRows) : [];
    });

    // 2. Синхронизация с localStorage
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(rows));
    }, [rows, storageKey]);

    // 3. Добавление новой строки в таблицу
    const addRowToTable = (firstOperand: number, lastOperation: string, secondOperand: number, result: number) => {
        const row = {
            operation: `${firstOperand} ${lastOperation} ${secondOperand}`,
            value: result
        };
        setRows((prev) => [...prev, row]);
    };

    // 4. Сброс таблицы
    const resetRows = () => {
        setRows([]);
        localStorage.removeItem(storageKey);
    };

    // Возвращаем функции и состояние для использования в компоненте
    return { rows, addRowToTable, resetRows };
};
