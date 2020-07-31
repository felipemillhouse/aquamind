import styled from 'styled-components/native'
import { Animated } from 'react-native'

import theme from '../../../Theme'

type FeedImageProps = {
  width: number
  height: number
}
export const FeedImage = styled(Animated.Image)<FeedImageProps>`
  width: ${theme.sizes.width}px;
  height: ${props => theme.sizes.width * (props.height / props.width)}px;
`
export const ImageView = styled.View`
  flex: 1;
  justify-content: center;
`
