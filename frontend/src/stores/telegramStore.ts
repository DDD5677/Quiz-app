import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import TelegramService from '@/server/telegram';

export const useTelegramStore = defineStore('telegram', () => {
	const isLoading = ref(true);
	const errors = ref<any|null>(null);
	const sendMessage = (data:any)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			errors.value = null;
			TelegramService.sendMessage(data).then((response)=>{
				isLoading.value=false;
				console.log(response)
				resolve(response);
			}).catch((error)=>{
				isLoading.value=false;
				console.log(error)
				//errors.value = error.response.data
				reject(error)
			})
		})
	}

  return {
	sendMessage,
	isLoading,
	errors
    }
})