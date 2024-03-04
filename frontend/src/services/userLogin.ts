import axios from "axios";
const url = "http://localhost:3001/api/login";

const loginUser = (username, password) => {
    return axios.post(url, {username, password});
}

export {
    loginUser
}