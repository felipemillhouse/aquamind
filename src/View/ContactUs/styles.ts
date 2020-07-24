import styled from 'styled-components/native'
import { Button } from 'react-native-paper'

import theme from 'View/@Theme'

export const ScrollView = styled.ScrollView`
  background-color: ${theme.colors.surface};
  flex: 1;
`
export const FormView = styled.View`
  padding: ${theme.sizes.pagePadding}px;
`
export const SendButton = styled(Button)`
  margin: ${theme.sizes.margin}px 0 ${theme.sizes.margin * 2}px 0;
`
export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`
