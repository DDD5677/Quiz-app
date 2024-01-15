import axios from "./axios";

const QuestionService = {
	getQuestion(){
		return axios.get('/questions')
	},
	getQuestionById (id:string){
		return axios.get(`/questions/${id}`)
	},
	// postQuestion(question:object){
	// 	return axios.post('/questions',question)
	// },
	postQuestion(question:any){
		console.log(question)
		const correctAnswer = question.correctAnswer+''
		let formData = new FormData();
		if(question.image) formData.append("image", question.image);
		if(question.text) formData.append("text", question.text);
		if(question.correctAnswer||question.correctAnswer===0)formData.append("correctAnswer",correctAnswer );
		if(question.answers)formData.append("answers", JSON.stringify(question.answers));
		if(question.difficulty)formData.append("difficulty", question.difficulty);
		if(question.point)formData.append("point", question.point);
		if(question.questionType)formData.append("questionType", question.questionType);
		if(question.category)formData.append("category", question.category);
		if(question.user)formData.append("user", question.user);
		if(question.quizId)formData.append("quizId", question.quizId);
		if(question.questionId)formData.append("questionId", question.questionId);
		return axios.post('/questions', formData);
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