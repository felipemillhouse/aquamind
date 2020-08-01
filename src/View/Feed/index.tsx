import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import FakeLoadingScreen from '../Components/FakeLoadingScreen'
import { FeedProps } from '../../routes'
import { ConfigRTK } from '../../store/config'
import FeedRTK from '../../store/feed'
import { RootState } from '../../store/rootReducer'
import { getFeed } from '../../API/feed'
import { ScrollView } from './styles'
import FeedBox from './Components/FeedBox'

const Feed = ({ navigation }: FeedProps) => {
  const dispatch = useDispatch()
  const feed = useSelector((state: RootState) => state.feed)

  useEffect(() => {
    async function fetchFeed() {
      dispatch(ConfigRTK.actions.setLoading({ visible: true }))
      const response = await getFeed()
      if (response) dispatch(FeedRTK.actions.setFeed(response))
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
    }
    fetchFeed()
  }, [dispatch])

  if (!feed) {
    return <FakeLoadingScreen />
  }
  return (
    <ScrollView>
      {_.map(feed, item => (
        <FeedBox key={item.feedId} feed={item} />
      ))}
    </ScrollView>
  )
}

export default Feed
