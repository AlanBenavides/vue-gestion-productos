import axios from "axios";

const instance = axios.create({
    baseURL: "http://api-gestion-productos.herokuapp.com",
    headers: { "Content-Type": "application/json" },
});

export default instance;