// Ключ для хранения токена аутентификации
export const AUTH_TOKEN_KEY = "authToken";
// Ключ для хранения ID пользователя
export const USER_ID_KEY = "userId";

/**
 * Генерирует уникальный ключ для хранения таблицы пользователя
 * Пример: "calculatorRows_admin"
 */
export const getUserStorageKey = (userId: string): string => {
    return `calculatorRows_${userId}`;
};

/**
 * Преобразует входное значение в число или выбрасывает ошибку
 */
export const parseInput = (input: number | string): number => {
    const value = Number(input);
    if (isNaN(value)) {
        throw new Error("Invalid input: must be a number");
    }
    return value;
};
