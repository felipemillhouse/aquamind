import React, { useState } from 'react'
import { Animated } from 'react-native'
import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerStateChangeEvent,
  PinchGestureHandlerGestureEvent,
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

import theme from '../../../Theme'
import { FeedImage, ImageView } from './styles'

type PhotoBoxProps = {
  uri: string
  width: number
  height: number
}
const PhotoBox = ({ uri, width, height }: PhotoBoxProps) => {
  const scale = new Animated.Value(1)
  const ratioWidth = theme.sizes.width
  const ratioHeight = theme.sizes.width * (height / width)
  const [zIndex, setZIndex] = useState(1)
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
      setTimeout(() => setZIndex(1), 500)
    }
    if (event.nativeEvent.state === State.ACTIVE) {
      setZIndex(20)
    }
  }

  console.log({ onPinchEvent })
  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={event => onPinchStateChange(event)}
    >
      <Animated.View style={{ width: ratioWidth, height: ratioHeight, zIndex }}>
        <FeedImage
          source={{ uri }}
          width={width}
          height={height}
          style={{
            transform: [{ scale }, { translateX: tX }, { translateY: tY }],
            position: 'absolute',
          }}
          resizeMode="contain"
        />
      </Animated.View>
    </PinchGestureHandler>
  )
}

export default PhotoBox
