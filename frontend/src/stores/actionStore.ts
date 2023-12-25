import {defineStore} from 'pinia'
import ActionService from '@/server/action'
import { computed, ref } from 'vue'

export const useActionStore = defineStore('action',()=>{
	const isLoading = ref(true);
	const actionLoading = ref(true);
	const action = ref<any>(null)
	const actionsList = ref<any>(null)
	const activeAction = ref<any>(null)
	const errors = ref<any|null>(null);
	const finished= ref<any|null>(false)
	const chooses = ref<any|undefined>(undefined)
	//variables for countdown
	const time= ref<any|null>(null)
	const created= ref<any|null>(null)

	const getAction = (payload:any)=> {
		return new Promise(() => {
			isLoading.value=true,
			actionsList.value = null,
			errors.value = null
			ActionService.getAction(payload)
				.then((res) => {
					isLoading.value = false;
					actionsList.value = res.data;
				})
				.catch((error) => {
					isLoading.value=false;
					errors.value=error.response.data;
				});
		});
	}
	const getActiveAction = (userId:string)=>{
		return new Promise(() => {
			isLoading.value=true,
			activeAction.value = null,
			errors.value = null
			ActionService.getActiveAction(userId)
				.then((res) => {
					isLoading.value = false;
					activeAction.value = res.data[0];
					
					time.value = res.data[0].quiz.time;
					created.value = res.data[0].createdAt;
				})
				.catch((error) => {
					isLoading.value=false;
					errors.value=error.response.data;
				});
		});
	}
	const getActionById = (payload:any)=> {
		return new Promise((resolve,reject) => {
			isLoading.value=true,
			action.value = null,
			errors.value = null
			ActionService.getActionById(payload)
				.then((response) => {
					isLoading.value = false;
					action.value = response.data;
					time.value = response.data.quiz.time;
					created.value = response.data.createdAt;
					finished.value = response.data.finished
					chooses.value = response.data.chooses
					resolve(response.data)
				})
				.catch((error) => {
					isLoading.value=false;
					errors.value=error.response.data;
					reject(error.response.data)
				});
		});
	}

	const createAction = (data:any)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			activeAction.value = null;
			errors.value = null;
			ActionService.postAction(data).then((response)=>{
				isLoading.value=false;
				activeAction.value=response.data;
				finished.value = response.data.finished
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}

	const updateAction = (data:any)=>{
		return new Promise((resolve,reject)=>{
			actionLoading.value=true;
			activeAction.value = null;
			errors.value = null;
			ActionService.updateAction(data).then((response)=>{
				actionLoading.value=false;
				activeAction.value=response.data;
				chooses.value = response.data.chooses
				resolve(response.data);
			}).catch((error)=>{
				actionLoading.value=false;
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}
	const finishAction = (data:any)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			action.value = null;
			errors.value = null;
			ActionService.finishAction(data).then((response)=>{
				isLoading.value=false;
				action.value=response.data;
				activeAction.value=null;
				finished.value = response.data.finished
				chooses.value = response.data.chooses
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}


	return {
		getAction,
		getActiveAction,
		getActionById,
		createAction,
		updateAction,
		finishAction,
		action,
		activeAction,
		actionsList,
		actionLoading,
		isLoading,
		errors,
		time,
		created,
		finished,
		chooses
	}
})