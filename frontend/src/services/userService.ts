import axios from "axios";
const url = "https://event-management-system-ptoj.onrender.com/api/users";

interface UserData {
    name: string,
    username: string;
    password: string;
}

const getAllUsers = () => {
    return axios.get(url);
}

const registerUser = (userData: UserData) => {
    return axios.post(url + "/register", userData);
}

const getUserInfo = (username: string) => {
    return axios.get(url + `/${username}`);
}

export {
    getAllUsers,
    registerUser,
    getUserInfo
}