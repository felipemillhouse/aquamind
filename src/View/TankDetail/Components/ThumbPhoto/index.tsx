import React from 'react'

import { MainView, TankHeaderThumb } from './styles'

type ThumbPhotoProps = {
  source: string
}
const ThumbPhoto = ({ source }: ThumbPhotoProps) => {
  return (
    <MainView>
      <TankHeaderThumb source={{ uri: source }} resizeMode="cover" />
    </MainView>
  )
}

export default ThumbPhoto
