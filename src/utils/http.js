import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});