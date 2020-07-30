import React from 'react'

import { FeedImage } from './styles'

type PhotoBoxProps = {
  uri: string
  width: number
  height: number
}
export default ({ uri, width, height }: PhotoBoxProps) => {
  return (
    <>
      <FeedImage source={{ uri }} width={width} height={height} />
    </>
  )
}
