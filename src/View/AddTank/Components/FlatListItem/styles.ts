import styled from 'styled-components/native'
import { Text, IconButton } from 'react-native-paper'

import theme from '../../../Theme'

export const Icon = styled(IconButton)`
  margin: 0 ${theme.sizes.margin}px;
`
export const Description = styled(Text)``
export const View = styled.View`
  justify-content: center;
`
export const RowView = styled.View`
  flex-direction: row;
  min-height: 50px;
  align-items: center;
  background-color: ${theme.colors.surface};
`
