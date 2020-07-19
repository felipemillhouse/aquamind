import styled from 'styled-components/native'
import * as Animatable from 'react-native-animatable'

import theme from 'View/@Theme'

export const MainView = styled(Animatable.View)`
  flex: 1;
  background-color: ${theme.colors.backdrop};
`
export const DialogContent = styled(Animatable.View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: ${theme.colors.surface};
  border-radius: ${theme.roundness * 2}px;
  padding: ${theme.sizes.pagePadding}px;
`
