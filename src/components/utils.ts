export const AUTH_TOKEN_KEY = "authToken";
export const USER_ID_KEY = "userId";

/**
 * Генерирует уникальный ключ для хранения таблицы пользователя
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

/**
 * Выход пользователя из системы: удаляет токен и userId, но сохраняет данные
 */
export const logoutUser = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
};
