import axios from "axios";

  let token = '';
  if (typeof window !== 'undefined') {
      // Perform localStorage action
      token = localStorage.getItem('token');
  }


const Api = axios.create({
    baseURL: 'https://api-streaming.onrender.com/',
   // baseURL: 'http://localhost:4000/',
    headers: {
         "Accept": "application/json, text/plain, /",
        // 'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${token}`
    }

    
})



const ApiMovies = 'https://api.themoviedb.org/3/trending/all/day?api_key=8c55f9e819a9e2f5b48651b3b39ca6f1&fbclid=IwAR0c8hgWqhdrxy1cooPtTi8Pursp03Rw-CjvcJYMaBKaLS4CcvBAxKytRQw'


export {
  Api,
  ApiMovies,
}

