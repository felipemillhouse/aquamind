import API from '../services/api'
import { FeedState } from '../store/feed'

export async function getFeed() {
  try {
    const response = await API.get<FeedState[]>('/feed/')

    if (response && response.status === 200) {
      return response.data
    }

    return false
  } catch (error) {
    //
  }
  return false
}
