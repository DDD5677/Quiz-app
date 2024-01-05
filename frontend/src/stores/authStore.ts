import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from "@/server/auth"
import type { User } from '@/types/userType';
import { removeItem, setItem } from '@/helpers/localStorage';

export const useAuthStore = defineStore('auth', () => {
  const isLoading=ref(true);
  const user = ref<any|null>(null)
  const errors = ref<any|null>(null)
  const isLogged = ref(false)


  const logout=()=>{
	removeItem('token');
	isLoading.value=true;
	user.value=null;
	isLogged.value = false;
  }
function register(userData:User){
	return new Promise((resolve,reject)=>{
		isLoading.value=true;
		user.value = null;
		errors.value = null;
		AuthService.register(userData).then((response)=>{
			isLoading.value=false;
			user.value=response.data;
			resolve(response);
		}).catch((error)=>{
			isLoading.value=false;
			console.log(error)
			errors.value = error.response.data
			reject(error.response.data)
		})
	})
}
function login(userData:object){
	return new Promise((resolve,reject)=>{
		isLoading.value=true;
		user.value=null;
		errors.value=null;
		isLogged.value=false;
		AuthService.login(userData).then((response)=>{
			setItem("token",response.data.token);
			isLoading.value=false;
			user.value=response.data.user;
			isLogged.value=true;
			resolve(response.data.user)
		}).catch((error)=>{
			isLoading.value=false;
			errors.value=error.response.data;
			reject(error.response.data)
		})

	})
}
function refresh(){
	return new Promise((resolve,reject)=>{
		isLoading.value=true;
		user.value=null;
		errors.value=null;
		isLogged.value=false;
		AuthService.refresh().then((response)=>{
			isLoading.value=false;
			user.value=response.data.user;
			isLogged.value=true;
			resolve(response.data.user)
		}).catch((error)=>{
			isLoading.value=false;
			errors.value=error.response.data;
			reject(error.response.data)
		})
	})
}

const updateUser=(data:any)=>{
	return new Promise((resolve,reject)=>{
		isLoading.value=true;
		errors.value=null;
		AuthService.updateUser(data).then((response)=>{
			isLoading.value=false;
			user.value=response.data.user;
			resolve(response.data.user)
		}).catch((error)=>{
			isLoading.value=false;
			errors.value=error.response.data;
			reject(error.response.data)
		})
	})

}
  return { register,login,refresh,updateUser,logout,user,isLoading,errors,isLogged }
})
