import { getItem } from '@/helpers/localStorage'
import axios from 'axios'
import router from'@/router'
axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.interceptors.request.use((config) => {
   config.headers.Authorization = "Bearer " + getItem("token");
   return config;
});
axios.interceptors.response.use(null,error=>{
	let path = '/error';
	switch (error.response.status) {
		case 401: path = '/login'; break;
	 }
	 if(path ==='/login')router.push(path);
	 return Promise.reject(error);
})
export default axios
