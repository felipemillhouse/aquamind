import styled from 'styled-components/native'
import { Button as PaperButton, Text, Divider as PaperDivider } from 'react-native-paper'

import theme from 'View/@Theme'
import Slot from './Components/HeaderSlot'

export const MainView = styled.View`
  flex: 1;
  background-color: ${theme.colors.surface};
  justify-content: flex-start;
`
export const ButtonHeader = styled(PaperButton)``
export const TakeAPhotoButton = styled(PaperButton)`
  margin: ${theme.sizes.margin}px ${theme.sizes.margin}px 0 0;
  align-self: flex-end;
`
export const RowView = styled.View`
  flex-direction: row;
`
export const RowGalleryView = styled(RowView)`
  flex-wrap: wrap;
`
export const HeaderView = styled(RowView)`
  margin: ${theme.sizes.margin}px;
  align-items: center;
  max-height: 100px;
`
export const TankHeaderThumb = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: ${theme.roundness}px;
  align-self: center;
  margin-right: ${theme.sizes.margin / 2}px;
`
export const HeaderSlotView = styled(RowView)`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`
export const DetailView = styled(RowView)`
  margin: 0 ${theme.sizes.pagePadding}px;
  justify-content: space-evenly;
`
export const Label = styled(Text)``
export const LabelValue = styled(Text)`
  font-weight: ${theme.fonts.medium.fontWeight};
`
export const HeaderSlot = styled(Slot)``
export const ScrollView = styled.ScrollView`
  flex: 1;
  margin-top: ${theme.sizes.margin}px;
`
