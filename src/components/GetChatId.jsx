import React, { useEffect, useState } from "react";
import axios from "axios";

const TelegramChatId = () => {
    const [chatId, setChatId] = useState(null);
    const token = "7434516681:AAG5L3L5AKnNNlCBgaDzP0Y-RFO0LRfBIH8"; // Твой токен

    useEffect(() => {
        const fetchChatId = async () => {
            try {
                // 1️⃣ Удаляем вебхук, если он есть
                await axios.get(`https://api.telegram.org/bot${token}/deleteWebhook`);

                // 2️⃣ Получаем обновления
                const response = await axios.get(`https://api.telegram.org/bot${token}/getUpdates`);
                const updates = response.data.result;

                if (updates.length > 0) {
                    const latestChatId = updates[updates.length - 1].message.chat.id;
                    setChatId(latestChatId);
                } else {
                    console.log("Нет сообщений, напиши боту первым!");
                }
            } catch (error) {
                console.error("Ошибка при получении chat_id:", error);
            }
        };

        fetchChatId();
    }, []);

    return (
        <div className="p-2">
            {chatId ? (
                <p>Chat ID: {chatId}</p>
            ) : (
                <p>Напиши что-нибудь боту, чтобы получить chat_id!</p>
            )}
        </div>
    );
};

export default TelegramChatId;
