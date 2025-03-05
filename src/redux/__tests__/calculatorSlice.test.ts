import {store} from "../store.ts";
import {executeOperation, resetCalculator, setInputValue, setUserId} from "../calculatorSlice.ts";
import {describe, expect, test, beforeEach, } from "vitest";
import {loadFromLocalStorage} from "../../services/storage.ts";

describe('calculatorSlice', () => {
    beforeEach(() => {
        store.dispatch(resetCalculator()); // Очищаем перед каждым тестом
    });
    test('should set input value', () => {
        store.dispatch(setInputValue('20'));
        expect (store.getState().calculator.inputValue).toBe('20');
    });
    test('should set user ID', () =>{
        store.dispatch(setUserId('user123'));
        expect(store.getState().calculator.userId).toBe('user123');
    })

    test('should reset calculator state', () => {
        store.dispatch(setInputValue('50'));
        store.dispatch(resetCalculator());
        expect (store.getState().calculator.inputValue).toBe(0);
    })


    describe('executeOperation reducer', () => {
        beforeEach(() => {
            store.dispatch(resetCalculator()); // Очищаем перед каждым тестом
        });

        test('should execute operation and update state', () => {
            store.dispatch(setInputValue(5));
            store.dispatch(executeOperation({ operation: 'add' }));
            store.dispatch(setInputValue(3));
            store.dispatch(executeOperation({ operation: 'calculate' }));

            expect(store.getState().calculator.inputValue).toBe(8); // Redux должен обновить состояние
        });

        test('should store history in localStorage', () => {
            store.dispatch(setInputValue(4));
            store.dispatch(executeOperation({ operation: 'multiply' }));
            store.dispatch(setInputValue(2));
            store.dispatch(executeOperation({ operation: 'calculate' }));

            const userId = store.getState().calculator.userId;
            const storedRows = loadFromLocalStorage(userId);

            expect(storedRows).toContainEqual({
                operation: '4 multiply 2',
                value: 8
            }); // Проверяем, что история операций записалась в localStorage
        });

        test('should reset calculator state in Redux', () => {
            store.dispatch(setInputValue(50));
            store.dispatch(executeOperation({ operation: 'reset' }));

            expect(store.getState().calculator.inputValue).toBe(0);
            expect(store.getState().calculator.rows).toHaveLength(0);
        });
    });


})