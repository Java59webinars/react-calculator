// Local storage keys
export const LOCAL_STORAGE_KEY = "calculatorRows";
export const AUTH_TOKEN_KEY = "authToken";

// Общие функции (оставил существующие)
export const parseInput = (input: number | string): number => {
    const value = Number(input);
    if (isNaN(value)) {
        throw new Error("Invalid input: must be a number");
    }
    return value;
};
