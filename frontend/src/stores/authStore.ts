import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthService from "@/server/auth"
import type { User } from '@/types/userType';

export const useAuthStore = defineStore('auth', () => {
  const isLoading=ref(true);
  const user = ref<object|null>(null)
  const errors = ref<object|null>(null)
  const isLogged = ref(false)
  
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
			//errors.value = error.response.data
			reject(error)
		})
	})
}
  return { register,user,isLoading,errors,isLogged }
})
