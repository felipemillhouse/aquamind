// resources: https://www.youtube.com/watch?v=MukiK57qwVY

import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { State, PinchGestureHandler } from 'react-native-gesture-handler'
import Animated, { block, cond, eq, set, useCode } from 'react-native-reanimated'
import {
  pinchActive,
  pinchBegan,
  transformOrigin,
  translate,
  vec,
  spring,
  usePinchGestureHandler,
} from 'react-native-redash'

import defaultAvatar from '../../../../assets/Avatar.png'
import theme from '../../../Theme'
import UserHeader from '../UserHeader'
import Footer from '../Footer'
import { FeedState } from '../../../../store/feed'
import DoubleTap from '../../../Components/DoubleTap/index.js'

type FeedBoxProps = {
  feed: FeedState
}
export default ({ feed }: FeedBoxProps) => {
  const ratioWidth = theme.sizes.width
  const ratioHeight = theme.sizes.width * (feed.height / feed.width)

  const { gestureHandler, numberOfPointers, state, scale, focal } = usePinchGestureHandler()
  const origin = vec.createValue(0, 0)
  const pinch = vec.createValue(0, 0)
  const zIndex = cond(eq(state, State.ACTIVE), 10, 1)
  const adjustedFocal = vec.add(
    {
      x: -ratioWidth / 2,
      y: -ratioHeight / 2,
    },
    focal,
  )

  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(
          pinchActive(state, numberOfPointers),
          vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal))),
        ),
        cond(eq(state, State.END), [
          set(pinch.x, spring({ from: pinch.x, to: 0, config: { mass: 0.5, damping: 10 } })),
          set(pinch.y, spring({ from: pinch.y, to: 0, config: { mass: 0.5, damping: 10 } })),
          set(scale, spring({ from: scale, to: 1, config: { mass: 0.5, damping: 10 } })),
        ]),
      ]),
    [adjustedFocal, numberOfPointers, origin, pinch, scale, state],
  )

  return (
    <>
      <UserHeader
        userName={feed.userName}
        url={feed.userAvatar || defaultAvatar}
        dimensions={feed.dimensions}
        date={feed.date}
      />
      <PinchGestureHandler {...gestureHandler}>
        <Animated.View style={{ width: ratioWidth, height: ratioHeight, zIndex }}>
          <DoubleTap style={{ zIndex: 2 }} onPress={() => Alert.alert('Like the picture function')}>
            <Animated.Image
              source={{ uri: feed.photoUrl }}
              style={{
                transform: [...translate(pinch), ...transformOrigin(origin, { scale })],
                ...StyleSheet.absoluteFillObject,
                width: ratioWidth,
                height: ratioHeight,
              }}
            />
          </DoubleTap>
          <View style={{ flex: 1, backgroundColor: theme.colors.background }} />
        </Animated.View>
      </PinchGestureHandler>
      <Footer liked likes={feed.likes} comments={feed.comments} />
    </>
  )
}
