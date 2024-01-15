import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import SettingsService from '@/server/settings';

export const useSettingStore = defineStore('settings', () => {
  const isLoading = ref(true);
  const msgLoading=ref(false)
  const errors = ref<any|null>(null);
  const statistics = ref<any|null>(null);


	const getStatistics = ()=> {
		return new Promise(() => {
			isLoading.value=true,
			statistics.value = null,
			errors.value = null
			SettingsService.getStatistics()
				.then((res) => {
					isLoading.value = false;
					statistics.value = res.data
				})
				.catch((error) => {
					isLoading.value=false;
					errors.value=error.response.data;
				});
		});
	}
	const sendMessage = (data:any)=>{
		return new Promise((resolve,reject)=>{
			msgLoading.value=true;
			errors.value = null;
			SettingsService.sendMessage(data).then((response)=>{
				msgLoading.value=false;
				resolve(response);
			}).catch((error)=>{
				msgLoading.value=false;
				errors.value = error.response.data
				reject(error)
			})
		})
	}

  return {
	getStatistics,
	sendMessage,
	isLoading,
	msgLoading,
	statistics,
	errors
  }
})
