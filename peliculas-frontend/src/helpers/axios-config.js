import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://app-pelicula-1.onrender.com/media'
})

export {axiosInstance }