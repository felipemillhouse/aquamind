import React, { useState } from 'react'
import { Animated } from 'react-native'
import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import {
  onGestureEvent,
  pinchActive,
  pinchBegan,
  timing,
  transformOrigin,
  translate,
  vec,
} from 'react-native-redash'

import { FeedImage, ImageView } from './styles'

type PhotoBoxProps = {
  uri: string
  width: number
  height: number
}
const PhotoBox = ({ uri, width, height }: PhotoBoxProps) => {
  const scale = new Animated.Value(1)
  const [zIndex, setZIndex] = useState(1)

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
    },
  )

  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
      setTimeout(() => setZIndex(1), 500)
    }
    if (event.nativeEvent.state === State.ACTIVE) {
      setZIndex(20)
    }
  }

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={event => onPinchStateChange(event)}
    >
      <FeedImage
        source={{ uri }}
        width={width}
        height={height}
        style={{ transform: [{ scale }], zIndex }}
        resizeMode="contain"
      />
    </PinchGestureHandler>
  )
}

export default PhotoBox
