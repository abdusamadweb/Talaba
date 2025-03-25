import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { init, miniApp } from '@telegram-apps/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom";



const initializeTelegramSDK = async () => {
    try {
        await init()

        if (miniApp.ready.isAvailable()) {
            await miniApp.ready()
            console.log('Mini App готово')
        }

    } catch (error) {
        console.error('Ошибка инициализации:', error)
    }
}

initializeTelegramSDK()

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)