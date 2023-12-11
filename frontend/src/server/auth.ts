import axios from './axios'
import type { User } from '@/types/userType';
const AuthService = {
  register(user:User) {
    return axios.post('/users/register', user)
  },
  login(user:object){
	return axios.post('/users/login',user)
  },
  refresh(){
	return axios.get("/users/user/refresh");
  }
}

export default AuthService
