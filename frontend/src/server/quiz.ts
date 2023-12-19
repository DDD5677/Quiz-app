import axios from "./axios";

const QuizService = {
	getQuiz(payload:any){
		return axios.get('/quizes',{
			params:{
				page:payload.page,
				limit:payload.limit,
				sort:payload.sort,
				search:payload.search,
				category:payload.category,
				user:payload.user
			}
		})
	},
	getQuizById(id:string){
		return axios.get(`/quizes/${id}`)
	},
	postQuiz(quiz:object){
		return axios.post('/quizes',quiz)
	},
	deleteQuiz(id:string){
		return axios.delete(`/quizes/${id}`)
	},
	updateQuiz(quiz:any){
		return axios.put(`/quizes/${quiz.quizId}`,quiz)
	}
}

export default QuizService