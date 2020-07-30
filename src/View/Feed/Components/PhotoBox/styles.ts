import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'

import theme from '../../../Theme'

type FeedImageProps = {
  width: number
  height: number
}
export const FeedImage = styled.Image<FeedImageProps>`
  width: ${theme.sizes.width}px;
  height: ${props => theme.sizes.width * (props.height / props.width)}px;
`
