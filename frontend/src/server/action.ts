import axios from "./axios";

const ActionService = {
	getAction(payload:any){
		return axios.get('/actions',{
			params:{
				page:payload.page,
				limit:payload.limit,
				search:payload.search,
				sort:payload.sort,
				date:payload.date,
				quiz:payload.quiz
			}
		})
	},
	getActiveAction(userId:string){
		return axios.get('/actions/active',{
			params:{
				user:userId
			}
		})
	},
	getActionById(id:string){
		return axios.get(`/actions/${id}`)
	},
	postAction(action:object){
		return axios.post('/actions',action)
	},
	updateAction(action:any){
		return axios.put(`/actions/${action.actionId}`,action)
	},
	finishAction(action:any){
		return axios.put(`/actions/finish/${action.actionId}`,action)
	}
}

export default ActionService