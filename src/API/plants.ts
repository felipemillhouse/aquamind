import API from 'services/api'
import { PlantsState } from 'store/plants'

export async function getPlants() {
  try {
    const response = await API.get<PlantsState[]>('/plants')

    if (response && response.status === 200) {
      return response.data
    }

    return false
  } catch (error) {
    //
  }
  return false
}
