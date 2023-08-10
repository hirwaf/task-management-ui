import jwtDecode from "jwt-decode";

export const IsLoggedIn = () => {
    const token = localStorage.getItem("accessToken");
    let currentDate = new Date();
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                localStorage.clear();
                localStorage.removeItem("accessToken");
                return false;
            }
        }
        return !!decodedToken;
    }
    return false;
};

export const TokenHeader = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        return {
            Authorization: `Bearer ${token}`
        };
    }
    return {};
}
