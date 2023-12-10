import axios from './axios'
import type { User } from '@/types/userType';
const AuthService = {
  register(user:User) {
    return axios.post('/users/register', user)
  }
}

export default AuthService
