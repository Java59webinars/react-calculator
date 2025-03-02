const getStorageKey = (userId: string) => `calculator_rows_${userId}`;

export const saveToLocalStorage = (userId: string | null, rows: { operation: string; value: number }[]) => {
    if (!userId) return; // Без userId не сохраняем данные
    try {
        localStorage.setItem(getStorageKey(userId), JSON.stringify(rows));
    } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
    }
};

export const loadFromLocalStorage = (userId: string | null): { operation: string; value: number }[] => {
    if (!userId) return []; // Если userId нет, ничего не загружаем
    try {
        const data = localStorage.getItem(getStorageKey(userId));
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Ошибка при загрузке из localStorage:", error);
        return [];
    }
};
