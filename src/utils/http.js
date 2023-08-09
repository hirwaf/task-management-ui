import axios from "axios";

export const httpClient = axios.create({
    baseURL: process.env.APP_BACKEND_URI,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});