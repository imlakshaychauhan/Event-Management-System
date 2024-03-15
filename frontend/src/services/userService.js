import axios from "axios";
const url = "https://event-management-system-ptoj.onrender.com/api/users";

const getAllUsers = () => {
    return axios.get(url);
}

const registerUser = (userData) => {
    return axios.post(url + "/register", userData);
}

const getUserInfo = (username) => {
    return axios.get(url + `/${username}`);
}

export {
    getAllUsers,
    registerUser,
    getUserInfo
}