import {httpClient} from "../utils/http";
import {TokenHeader} from "../helpers/users";

const register = async (data) => {
    try {
        const res = await httpClient.post("/user/register", data);
        return res.data;
    } catch (err) {
        throw new Error(err.message)
    }
    return false;
};

const login = async ({email, password}) => {
    try {
        const res = await httpClient.post('/user/auth/login', {email, password});
        if (res.status === 200 || res.status === 201) {
            console.log(res);
            localStorage.setItem("accessToken", res.data.token);
            return res.data.token;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
};

const profile = async () => {
    try {
        const res = await httpClient.get('/user/profile', {
            headers: {...TokenHeader},
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
    return {};
}

const allUsers = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const res = await httpClient.get('/user/all', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
    return [];
}

const logout = () => {
    localStorage.removeItem("accessToken");
};

export {
    register,
    login,
    logout,
    profile,
    allUsers
};