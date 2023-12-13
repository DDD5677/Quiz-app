import axios from "./axios";

const QuestionService = {
	getQuestion(){
		return axios.get('/questions')
	},
	postQuestion(question:object){
		return axios.post('/questions',question)
	}
}

export default QuestionService