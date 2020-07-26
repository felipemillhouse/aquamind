import styled from 'styled-components/native'
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native'
import {
  Text,
  Title as PaperTitle,
  Button,
  Divider as PaperDivider,
  TouchableRipple,
  IconButton,
} from 'react-native-paper'

import theme from '../Theme'

export const MainView = styled.ScrollView`
  background-color: ${theme.colors.surface};
  padding: ${theme.sizes.padding}px;
  flex: 1;
`
export const EmptyView = styled.View``
export const FullView = styled.View`
  flex: 1;
`
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`
export const LengthRowView = styled(RowView)`
  width: 100px;
`
export const TankThumbImage = styled.Image`
  width: ${70}px;
  height: ${70}px;
  border-radius: ${theme.roundness}px;
  align-self: flex-start;
  margin-right: ${theme.sizes.margin}px;
`
export const TankMeasurementImage = styled.Image`
  align-self: center;
  flex: 1;
`
type SmallTextProps = {
  marginRight?: boolean
}
export const SmallText = styled(Text)<SmallTextProps>`
  font-size: ${theme.fonts.sizes.xxsmall}px;
  margin-left: ${theme.sizes.margin / 2}px;
  margin-right: ${props => (props.marginRight ? theme.sizes.margin : 0)}px;
`
export const Title = styled(PaperTitle)`
  align-self: center;
  margin-top: ${theme.sizes.margin}px;
`
export const AddNewButton = styled(Button)`
  align-self: flex-end;
`
export const Divider = styled(PaperDivider)``
export const ActionEmptyView = styled.View`
  background-color: ${theme.colors.error};
  height: 100%;
  width: 20px;
  align-self: flex-end;
`
export const ActionButton = styled(TouchableRipple)`
  background-color: ${theme.colors.error};
  align-items: flex-end;
  justify-content: center;
  padding-right: ${theme.sizes.margin}px;
  height: 100%;
  width: 85px;
  align-self: flex-end;
`
export const ActionButtonText = styled(Text)`
  color: ${theme.colors.surface};
`
export const Icon = styled(IconButton).attrs({
  color: theme.colors.surface,
})`
  margin: 0;
`
export const SaveButton = styled(Button)`
  margin: ${theme.sizes.margin}px 0 ${theme.sizes.margin * 2}px 0;
`
export const ActionView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`
export const KeyboardAvoidingView = styled(RNKeyboardAvoidingView)`
  flex: 1;
`
