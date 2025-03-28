import TelegramBot from 'node-telegram-bot-api';

const TOKEN = "7434516681:AAG5L3L5AKnNNlCBgaDzP0Y-RFO0LRfBIH8"; // Замени на свой токен от BotFather
// Создаём экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const appUrl = `https://irish-owen-barrel-wallace.trycloudflare.com?chat_id=${chatId}`;

    bot.sendMessage(chatId, "Открыть приложение", {
        reply_markup: {
            inline_keyboard: [[
                { text: "Открыть Web App", web_app: { url: appUrl } }
            ]]
        }
    });
});

bot.on("message", (msg) => {
    bot.sendMessage(msg.chat.id, `Ваш Chat ID: ${msg.chat.id}`);
})

console.log("Бот запущен...");
