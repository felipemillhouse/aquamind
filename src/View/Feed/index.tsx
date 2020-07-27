import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import FakeLoadingScreen from '../Components/FakeLoadingScreen'
import { FeedProps } from '../../routes'
import { ConfigRTK } from '../../store/config'
import FeedRTK from '../../store/feed'
import UserHeader from './Components/UserHeader'
import Footer from './Components/Footer'
import { RootState } from '../../store/rootReducer'
import { getFeed } from '../../API/feed'
import { FeedImage } from './styles'

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
      <View>
        <UserHeader
          userName={feed[0]?.userName}
          url={feed[0]?.userAvatar}
          dimensions={feed[0]?.dimensions}
          date={feed[0]?.date}
        />
        <FeedImage
          source={{ uri: feed[0]?.photoUrl }}
          width={feed[0]?.width}
          height={feed[0]?.height}
        />
        <Footer liked likes={feed[0]?.likes} comments={feed[0]?.comments} />
      </View>
      <View>
        <UserHeader
          userName={feed[1]?.userName}
          url={feed[1]?.userAvatar}
          dimensions={feed[1]?.dimensions}
          date={feed[1]?.date}
        />
        <FeedImage
          source={{ uri: feed[1]?.photoUrl }}
          width={feed[1]?.width}
          height={feed[1]?.height}
        />
        <Footer liked likes={feed[1]?.likes} comments={feed[1]?.comments} />
      </View>
      <View>
        <UserHeader
          userName={feed[2]?.userName}
          url={feed[2]?.userAvatar}
          dimensions={feed[2]?.dimensions}
          date={feed[2]?.date}
        />
        <FeedImage
          source={{ uri: feed[2]?.photoUrl }}
          width={feed[2]?.width}
          height={feed[2]?.height}
        />
        <Footer liked likes={feed[2]?.likes} comments={feed[2]?.comments} />
      </View>
    </ScrollView>
  )
}

export default Feed
