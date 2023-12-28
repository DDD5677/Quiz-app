import axios from "axios";
const TOKEN = 'customToken'
const TelegramService = {
	sendMessage(data:any){
		return axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`,data)
	}
}

export default TelegramService