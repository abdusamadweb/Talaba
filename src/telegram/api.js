import { miniApp, init } from "@telegram-apps/sdk";

export const expandApp = async () => {
    try {
        await init(); // Убедимся, что SDK инициализирован

        if (!miniApp.ready.isAvailable()) {
            console.warn("Мини-приложение не запущено в Telegram.");
            return;
        }

        if (miniApp.viewport?.expand) {
            miniApp.viewport.expand();
            console.log("Приложение развернуто!");
        } else {
            console.error("Метод expand не найден!");
        }
    } catch (error) {
        console.error("Ошибка инициализации Telegram SDK:", error);
    }
};
