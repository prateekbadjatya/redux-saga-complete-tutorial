import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://rem.dbwebb.se/api'

const instance = axios.create({
    baseURL : 'https://jsonplaceholder.typicode.com',
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        timeout: 1000
    }
  })
  
  export default instance;