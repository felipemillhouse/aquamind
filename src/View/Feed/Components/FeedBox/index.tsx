// resources: https://www.youtube.com/watch?v=MukiK57qwVY

import React, { useState } from 'react'
import { Animated, StyleSheet, View, Alert } from 'react-native'
import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerStateChangeEvent,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import defaultAvatar from '../../../../assets/Avatar.png'

import theme from '../../../Theme'
import { FeedImage } from './styles'
import UserHeader from '../UserHeader'
import Footer from '../Footer'
import { FeedState } from '../../../../store/feed'
import DoubleTap from '../../../Components/DoubleTap/index.js'

type FeedBoxProps = {
  feed: FeedState
}
export default ({ feed }: FeedBoxProps) => {
  const scale = new Animated.Value(1)
  const ratioWidth = theme.sizes.width
  const ratioHeight = theme.sizes.width * (feed.height / feed.width)
  const [zIndex, setZIndex] = useState(2)
  const tX = new Animated.Value(0)
  const tY = new Animated.Value(0)

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale,
        },
      },
    ],
    {
      useNativeDriver: true,
      listener: (event: PinchGestureHandlerGestureEvent) => {
        tX.setValue(event.nativeEvent.focalX - ratioWidth / 2)
        tY.setValue(event.nativeEvent.focalY - ratioHeight / 2)
      },
    },
  )

  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
      Animated.spring(tX, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
      Animated.spring(tY, {
        toValue: 0,
        useNativeDriver: true,
      }).start()
      setTimeout(() => setZIndex(2), 500)
    }
    if (event.nativeEvent.state === State.ACTIVE) {
      setZIndex(20)
    }
  }

  return (
    <>
      <UserHeader
        userName={feed.userName}
        url={feed.userAvatar || defaultAvatar}
        dimensions={feed.dimensions}
        date={feed.date}
      />
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={event => onPinchStateChange(event)}
      >
        <Animated.View style={{ width: ratioWidth, height: ratioHeight, zIndex }}>
          <DoubleTap style={{ zIndex: 2 }} onPress={() => Alert.alert('Like the picture function')}>
            <FeedImage
              source={{ uri: feed.photoUrl }}
              width={feed.width}
              height={feed.height}
              style={{
                transform: [{ scale }, { translateX: tX }, { translateY: tY }],
                zIndex: 2,
              }}
            />
          </DoubleTap>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.background }]} />
        </Animated.View>
      </PinchGestureHandler>
      <Footer liked likes={feed.likes} comments={feed.comments} />
    </>
  )
}
