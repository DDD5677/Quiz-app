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
  //checkboxes choose correct Answer
  const correctAnswer = ref<keyof Answers|null>(null)

  function assignCorrectAnswer(answer:keyof Answers|null){
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
				quizStore.assignQuiz(response.data);
				resolve(response.data);
			}).catch((error)=>{
				isLoading.value=false;
				console.log(error)
				errors.value = error.response.data
				reject(error.response.data)
			})
		})
	}

  return { toggleEditors, editors,correctAnswer,assignCorrectAnswer,createQuestion }
})
