import {store} from "../store.ts";
import {resetCalculator, setInputValue, setUserId} from "../calculatorSlice.ts";
import {describe, expect, test} from "vitest";

describe('calculatorSlice', () => {
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

})