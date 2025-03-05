
import { store, RootState } from '../store';
import { initializeTable, addRow, resetTable } from '../tableSlice';
import {describe, expect, test, beforeEach } from "vitest";

describe('tableSlice', () => {
    beforeEach(() => {
        store.dispatch(resetTable()); // Очищаем таблицу перед каждым тестом
    });

    test('should initialize table with given rows', () => {
        const initialRows = [
            { operation: '0 add 0', value: 0 },
            { operation: '5 subtract 0', value: 5 }
        ];
        store.dispatch(initializeTable(initialRows));
        const state: RootState = store.getState();
        expect(state.table.rows).toEqual(initialRows);
    });

    test('should add a row to the table', () => {
        const newRow = { operation: '3 multiply 1', value: 3 };
        store.dispatch(addRow(newRow));
        const state: RootState = store.getState();
        expect(state.table.rows).toContainEqual(newRow);
    });

    test('should reset table to empty', () => {
        store.dispatch(addRow({ operation: '4 divide 2', value: 2 }));
        store.dispatch(resetTable());
        const state: RootState = store.getState();
        expect(state.table.rows).toHaveLength(0);
    });
});