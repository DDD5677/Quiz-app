import axios from "./axios";

const SettingsService = {
	getStatistics(){
		return axios.get('/settings/statistics')
	},
	sendMessage(data:object){
		return axios.post('/settings/supports',data)
	}
}

export default SettingsService