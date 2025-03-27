import { miniApp } from "@telegram-apps/sdk"

export const expandApp = () => {
    if (window.innerWidth < 768) { // Если ширина экрана меньше 768px (обычно телефон)
        miniApp.expand()
    }
}