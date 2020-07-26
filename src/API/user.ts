import API from '../services/api'
import { UserState } from '../store/user'

export async function getUser(userId: number) {
  try {
    const response = await API.get<UserState>(`/users/${userId}`)

    if (response && response.status === 200) {
      return response.data
    }

    return false
  } catch (error) {
    //
  }
  return false
}
