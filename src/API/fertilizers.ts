import API from '../services/api'
import { FertilizersState } from '../store/fertilizers'

export async function getFertilizers() {
  try {
    const response = await API.get<FertilizersState[]>('/fertilizers')

    if (response && response.status === 200) {
      return response.data
    }

    return false
  } catch (error) {
    //
  }
  return false
}
