import axios from "./axios";

const QuestionService = {
	getQuestion(){
		return axios.get('/questions')
	},
	getQuestionById (id:string){
		return axios.get(`/questions/${id}`)
	},
	postQuestion(question:object){
		return axios.post('/questions',question)
	},
	deleteQuestion(payload:any){
		return axios.delete(`/questions`, {
			params:{
				questionId:payload.questionId,
				quizId:payload.quizId
			}
		})
	}
}

export default QuestionService