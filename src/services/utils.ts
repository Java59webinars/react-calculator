export const AUTH_TOKEN_KEY = "authToken";
export const USER_ID_KEY = "userId";


export const logoutUser = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
};
