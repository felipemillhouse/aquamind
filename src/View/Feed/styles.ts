import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'

import theme from '../Theme'

export const MainView = styled(Animatable.View)`
  flex: 1;
  background-color: ${theme.colors.backdrop};
`
type FeedImageProps = {
  width: number
  height: number
}
export const FeedImage = styled.Image<FeedImageProps>`
  width: ${theme.sizes.width}px;
  height: ${props => theme.sizes.width * (props.height / props.width)}px;
`
