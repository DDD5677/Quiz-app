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
  },
  updateUser(user:any){
	let formData = new FormData();
		if(user.avatar) formData.append("avatar", user.avatar);
		if(user.firstname) formData.append("firstname", user.firstname);
      if(user.lastname)formData.append("lastname", user.lastname);
      if(user.newPassword)formData.append("newPassword", user.newPassword);
      if(user.email)formData.append("email", user.email);
      if(user.phone)formData.append("phone", user.phone);
      if(user.password)formData.append("password", user.password);
      return axios.put(`/users/${user.id}`, formData);
  }
}

export default AuthService
