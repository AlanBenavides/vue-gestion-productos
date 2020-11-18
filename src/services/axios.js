import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000/"/*"http://api-gestion-productos.herokuapp.com"*/,
    headers: { "Content-Type": "application/json" },
});

export default instance;
