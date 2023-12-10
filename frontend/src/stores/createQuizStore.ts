import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Editors,Answers } from '@/types/createQuizType'

export const useCreateQuizStore = defineStore('createQuiz', () => {
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
  //checkboxes
  const correctAnswer = ref<keyof Answers|null>(null)

  function assignCorrectAnswer(answer:keyof Answers|null){
	correctAnswer.value=answer
  }

  return { toggleEditors, editors,correctAnswer,assignCorrectAnswer }
})
