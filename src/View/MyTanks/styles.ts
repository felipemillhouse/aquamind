import styled from 'styled-components/native'
import { Title, Button, Text, IconButton, TouchableRipple } from 'react-native-paper'

import theme from 'View/Theme'

export const MainView = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.surface};
`
export const HeaderView = styled.View`
  height: ${theme.sizes.width / 3}px;
  background-color: ${theme.colors.primary};
`
export const ContentView = styled.View`
  flex: 1;
  margin-top: ${theme.sizes.width / 2.6 - theme.sizes.width / 3}px;
`
export const HeaderTitle = styled(Title)`
  align-self: center;
  color: ${theme.colors.primary};
`
export const Avatar = styled.Image`
  width: ${theme.sizes.width / 2.6}px;
  height: ${theme.sizes.width / 2.6}px;
  border-radius: ${theme.sizes.width / 2.6 / 2}px;
  border-width: 3px;
  border-color: ${theme.colors.surface};
  align-self: center;
`
export const AddNewButton = styled(Button)`
  align-self: flex-end;
`
export const ScrollView = styled.ScrollView`
  flex: 1;
`
type DeleteProps = {
  delete?: boolean
}
export const ActionButtonEmptyView = styled.View`
  background-color: ${theme.colors.error};
  width: 20px;
`
export const ActionButton = styled(TouchableRipple)<DeleteProps>`
  background-color: ${props => (props.delete ? theme.colors.error : theme.colors.text)};
  align-items: center;
  justify-content: center;
  width: 70px;
`
export const ActionButtonText = styled(Text)`
  color: ${theme.colors.surface};
`
export const Icon = styled(IconButton).attrs({
  color: theme.colors.surface,
})`
  margin: 0;
`
export const ActionView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`
