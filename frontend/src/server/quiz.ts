import axios from "./axios";

const QuizService = {
	getQuiz(){
		return axios.get('/quizes')
	},
	getQuizById(id:string){
		return axios.get(`/quizes/${id}`)
	},
	postQuiz(quiz:object){
		return axios.post('/quizes',quiz)
	}
}

export default QuizService