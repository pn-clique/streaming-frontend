import axios from "axios";

let token = '';
if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = localStorage.getItem('token');
}
const instance = axios.create({
    baseURL: 'https://api-streaming.onrender.com/',
   // baseURL: 'http://localhost:4000/',
    headers: {
        "Accept": "application/json, text/plain, /",
        //'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${token}`
    }
})




export default instance;
