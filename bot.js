import TelegramBot from 'node-telegram-bot-api';

const TOKEN = "7434516681:AAG5L3L5AKnNNlCBgaDzP0Y-RFO0LRfBIH8"; // Замени на свой токен от BotFather
// Создаём экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Открыть приложение", {
        reply_markup: {
            inline_keyboard: [[
                { text: "Открыть Web App---", web_app: { url: "https://mattress-cabin-afterwards-aerial.trycloudflare.com" } }
            ]]
        }
    });
});

console.log("Бот запущен...");
