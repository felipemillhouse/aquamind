import React from 'react'

import { MainView, Label, Value } from './styles'

type HeaderSlotProps = {
  label: string
  value: number
}
const HeaderSlot = ({ label, value }: HeaderSlotProps) => {
  return (
    <MainView>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </MainView>
  )
}

export default HeaderSlot
