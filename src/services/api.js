import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

// api.interceptors.response.use(response => {
//     return response;
//  }, error => {
// //    if (error.response.status === 401) {
// //         console.log('Dentro da API, interceptor erro 401');    
// //         //place your reentry code
// //    } else if (error.response.status === 400) {
// //         console.log('Dentro da API, interceptor erro 400');
// //    }
//    //return error;
//    console.log('error no interceptor: ', error);
//    return Promise.reject(error);
//  });

export default api;