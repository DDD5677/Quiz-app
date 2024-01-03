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
	getQuizByIdForAdmin(id:string){
		return axios.get(`/quizes/admin/${id}`)
	},
	postQuiz(quiz:object){
		return axios.post('/quizes',quiz)
	},
	deleteQuiz(id:string){
		return axios.delete(`/quizes/${id}`)
	},
	updateQuiz(quiz:any){
		return axios.put(`/quizes/${quiz.quizId}`,quiz)
	},
	updateQuizImage(quiz:any){
		let formData = new FormData();
		if(quiz.image) formData.append("image", quiz.image);
		return axios.put(`/quizes/image/${quiz.id}`,formData)
	}
}

export default QuizService