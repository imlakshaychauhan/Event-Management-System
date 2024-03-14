import axios from "axios";
const url = "https://event-management-system-ptoj.onrender.com/api/login";

const loginUser = (username, password) => {
    return axios.post(url, {username, password});
}

export {
    loginUser
}