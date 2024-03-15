import axios from "axios";
const url = "http://localhost:3001/api/users";

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