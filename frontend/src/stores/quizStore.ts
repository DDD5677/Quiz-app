import {defineStore} from 'pinia'
import QuizService from '@/server/quiz'
import { ref } from 'vue'
import type { Quiz } from '@/types/quizType';

export const useQuizStore = defineStore('quiz',()=>{
	const isLoading = ref(true);
	const quizList = ref<any>(null)
	const quiz = ref<any|null>(null);
	const errors = ref<any|null>(null);
	const page = ref(1);
	const limit =ref<number|null>(null)
	const pageSize = ref(1);
	
	const assignQuiz=(data:object)=>{
		quiz.value=data
	}

	const getQuiz = (payload:any)=> {
		return new Promise(() => {
			isLoading.value=true,
			quizList.value = null,
			errors.value = null
			QuizService.getQuiz(payload)
				.then((res) => {
					isLoading.value = false;
					quizList.value = res.data.quizList;
					pageSize.value = res.data.pagination.pageSize;
					page.value = res.data.pagination.page;
					limit.value = res.data.pagination.limit
				})
				.catch((error) => {
					isLoading.value=false;
					errors.value=error.response.data;
				});
		});
	}

	const getQuizById = (id:string)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			quiz.value=null;
			errors.value=null;
			QuizService.getQuizById(id).then((response)=>{
				quiz.value=response.data;
				isLoading.value=false;
				resolve(response.data)
			}).catch((error)=>{
				isLoading.value=false;
				errors.value=error.response.data;
				reject(error.response.data)
			})
		})
	}


	const createQuiz = (data:Quiz)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			quiz.value = null;
			errors.value = null;
			QuizService.postQuiz(data).then((response)=>{
				isLoading.value=false;
				quiz.value=response.data;
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				console.log(error)
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}

	const updateQuiz = (data:any)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			quiz.value = null;
			errors.value = null;
			QuizService.updateQuiz(data).then((response)=>{
				isLoading.value=false;
				quiz.value=response.data;
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				console.log(error)
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}

	const deleteQuiz =(id:string)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			errors.value=null;
			QuizService.deleteQuiz(id).then((response)=>{
				isLoading.value=false;
				resolve(response.data)
			}).catch((error)=>{
				isLoading.value=false;
				errors.value=error.response.data;
				reject(error.response.data)
			})
		})
	}

	return {getQuiz,createQuiz,updateQuiz,getQuizById,deleteQuiz,assignQuiz,isLoading,quiz,errors,page,quizList,limit,pageSize}
})