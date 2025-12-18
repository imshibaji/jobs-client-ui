import getServerData from "./getServerData";
import login from "./login";
import register from "./register";
import token from "./token";
import tokenToUser from "./tokenToUser";

export const server = {
    register,
    login,
    token,
    tokenToUser,
    getServerData
};