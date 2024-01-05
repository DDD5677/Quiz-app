import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Editors,Answers } from '@/types/createQuizType'
import QuestionService from '@/server/question'
import { useQuizStore } from './quizStore'

export const useQuestionStore = defineStore('question', () => {
	//editors
	const editors =ref<Editors>({
		question:false,
		answer1: false,
		answer2: false,
		answer3: false,
		answer4: false,
		answer5: false,
	})
	function toggleEditors(v:boolean,title:keyof Editors){
		const keys = Object.keys(editors.value) as Array<keyof typeof editors.value>;
		keys.forEach((key)=>{
			if(key===title){
				editors.value[key]=v;
			}else{
				editors.value[key]=false;
			}
		})
	}
	type MyRange = 0|1|2|3|4
  //checkboxes choose correct Answer
  const correctAnswer = ref<MyRange|null>(null)

  function assignCorrectAnswer(answer:MyRange|null){
	correctAnswer.value=answer
  }
  //create Question
  const quizStore = useQuizStore()
  const isLoading = ref(true);
	const question = ref<any|null>(null);
	const errors = ref<any|null>(null);
	
	const createQuestion = (data:object)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			errors.value = null;
			QuestionService.postQuestion(data).then((response)=>{
				isLoading.value=false;
				//quizStore.assignQuiz(response.data);
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				console.log(error)
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}

	const deleteQuestion = (data:object)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			errors.value = null;
			QuestionService.deleteQuestion(data).then((response)=>{
				isLoading.value=false;
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				console.log(error)
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}
	const getQuestionById = (id:string)=>{
		return new Promise((resolve,reject)=>{
			isLoading.value=true;
			question.value=null;
			errors.value=null;
			QuestionService.getQuestionById(id).then((response)=>{
				question.value = response.data;
				correctAnswer.value = response.data.correctAnswer
				isLoading.value = false;
				resolve(response.data)
			}).catch((error)=>{
				isLoading.value=false;
				errors.value=error.response.data;
				reject(error.response.data)
			})
		})
	}
  return {
		getQuestionById,
		deleteQuestion, 
		toggleEditors, 
		editors,
		correctAnswer,
		question,
		assignCorrectAnswer,
		createQuestion 
	}
})
