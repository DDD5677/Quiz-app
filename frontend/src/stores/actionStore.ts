import {defineStore} from 'pinia'
import ActionService from '@/server/action'
import { computed, ref } from 'vue'

export const useActionStore = defineStore('action',()=>{
	const isLoading = ref(true);
	const isLoadingActive = ref(true);
	const actionLoading = ref(true);
	const finishLoading = ref(true);

	const action = ref<any>(null)
	const actionList = ref<any>(null)
	const activeAction = ref<any>(null)
	const pageSize = ref(1)
	const page = ref(1)
	const limit = ref<number|null>(null)
	const errors = ref<any|null>(null);
	const finished= ref(false)
	const chooses = ref<any|undefined>(undefined)
	
	//variables for countdown
	const time= ref<any|null>(null)
	const created= ref<any|null>(null)

	const getAction = (payload:any)=> {
		return new Promise(() => {
			//isLoading.value=true,
			//actionList.value = null,
			errors.value = null
			ActionService.getAction(payload)
				.then((res) => {
					isLoading.value = false;
					actionList.value = res.data.actionList;
					pageSize.value = res.data.pagination.pageSize;
					page.value = res.data.pagination.page;
					limit.value = res.data.pagination.limit;
				})
				.catch((error) => {
					isLoading.value=false;
					errors.value=error.response.data;
				});
		});
	}
	const getActiveAction = (userId:string)=>{
		return new Promise(() => {
			isLoadingActive.value=true,
			activeAction.value = null,
			errors.value = null
			ActionService.getActiveAction(userId)
				.then((res) => {
					isLoadingActive.value = false;
					activeAction.value = res.data[0];
					if(res.data[0]){
						time.value = res.data[0].quiz.time;
						created.value = res.data[0].createdAt;
					}
				})
				.catch((error) => {
					isLoadingActive.value=false;
					console.log(error)
					errors.value=error.response.data;
				});
		});
	}
	const getActionById = (payload:any)=> {
		return new Promise((resolve,reject) => {
			isLoading.value=true,
			console.log('getActionById',isLoading.value)
			action.value = null,
			errors.value = null
			ActionService.getActionById(payload)
				.then((response) => {
					action.value = response.data;
					time.value = response.data.quiz.time;
					created.value = response.data.createdAt;
					finished.value = response.data.finished
					chooses.value = response.data.chooses
					isLoading.value = false;
					console.log('getActionById success',isLoading.value)
					resolve(response.data)
				})
				.catch((error) => {
					isLoading.value=false;
					console.log('getActionById error',isLoading.value)
					errors.value=error.response.data;
					reject(error.response.data)
				});
		});
	}

	const createAction = (data:any)=>{
		return new Promise((resolve,reject)=>{
			actionLoading.value=true;
			activeAction.value = null;
			errors.value = null;
			ActionService.postAction(data).then((response)=>{
				actionLoading.value=false;
				activeAction.value=response.data;
				finished.value = response.data.finished
				resolve(response.data);
			}).catch((error)=>{
				actionLoading.value=false;
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
			console.log('finishAction',isLoading.value)
			finished.value = true;
			errors.value = null;
			ActionService.finishAction(data).then((response)=>{
				resolve(response.data);
				action.value=response.data;
				activeAction.value=null;
				finished.value = response.data.finished
				chooses.value = response.data.chooses
				isLoading.value=false;
				console.log('finishAction success',isLoading.value)
			}).catch((error)=>{
				isLoading.value=false;
				console.log('finishAction error',isLoading.value)
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
		actionList,
		actionLoading,
		isLoading,
		isLoadingActive,
		finishLoading,
		errors,
		time,
		created,
		finished,
		chooses,
		pageSize,
		page
	}
})