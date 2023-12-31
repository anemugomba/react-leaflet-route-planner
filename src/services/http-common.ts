import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL_BASE,
    headers: {
        'Content-type': 'application/json'
    },
})

Axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Do something with response error
    /*if (error.response.status === 401) {

    } else if (error.response.status === 400) {

    } else if(error.response.status === 500) {
        // internal server error

    }*/
    return Promise.reject(error);
})

export default Axios
