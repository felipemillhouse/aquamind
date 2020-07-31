import styled from 'styled-components/native'
import { Text as PaperText, IconButton as PaperIconButton } from 'react-native-paper'

import theme from '../../../Theme'

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 2;
`
export const Text = styled(PaperText)`
  /* margin-left: ${theme.sizes.margin}px; */
`
export const Icon = styled(PaperIconButton)``
