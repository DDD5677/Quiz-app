import {defineStore} from 'pinia'
import QuizService from '@/server/quiz'
import { ref } from 'vue'
import type { Quiz } from '@/types/quizType';

export const useQuizStore = defineStore('quiz',()=>{
	const isLoading = ref(true);
	const quiz = ref<any|null>(null);
	const errors = ref<any|null>(null);
	
	const assignQuiz=(data:object)=>{
		quiz.value=data
	}

	const getQuizById = (id:string)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			quiz.value=null;
			errors.value=null;
			QuizService.getQuizById(id).then((response)=>{
				isLoading.value=false;
				quiz.value=response.data;
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

	return {createQuiz,getQuizById,isLoading,quiz,assignQuiz,errors}
})