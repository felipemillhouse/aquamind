import API from '../services/api'
import { TanksState } from '../store/tanks'

export async function getTanks(userId: number) {
  try {
    const response = await API.get<TanksState[]>(`/tanks?userId=${userId}`)

    if (response && response.status === 200) {
      return response.data
    }

    return false
  } catch (error) {
    //
  }
  return false
}
