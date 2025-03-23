
// site language
import {$resp} from "../../api/apiResp.js";

export const lang = localStorage.getItem('lang') || 'en'
export const changeLang = (lang) => {
    localStorage.setItem('lang', lang)
    window.location.reload()
}


// format price
export const formatPrice = (price) => {
    return Intl.NumberFormat('ru-RU').format(price)
}


// format phone number
export const formatPhone = (str) => {
    const mask = "+### ## ### ## ##"
    if (!mask) return str
    const numeric = str?.replaceAll(/[^\d]/g, "")
    let idx = 0
    const formatted = mask?.split("").map((el) => {
        if (el === "#") {
            el = numeric[idx]
            idx++
        }
        return el
    })
    return formatted.join("")
}

// upload file
export const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file) // Важно: 'file' — это ключ, который ждёт API

    const { data } = await $resp.post('/upload-file', formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return data
}



