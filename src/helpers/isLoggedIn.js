import jwtDecode from "jwt-decode";

const isLoggedIn = () => {
    const token = localStorage.getItem("userToken");
    let currentDate = new Date();
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                localStorage.clear();
                localStorage.removeItem("userToken");
                return false;
            }
        }
        return !!decodedToken;
    }
    return false;
};
export default isLoggedIn();