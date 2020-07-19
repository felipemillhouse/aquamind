import React from 'react'

import AvatarImg from 'assets/Avatar.png'
import {
  RowView,
  TankView,
  TankHeaderView,
  TankHeaderThumb,
  TankHeaderDetailView,
  TankHeaderTitle,
  TankHeaderText,
  TankComments,
  ChevronIcon,
} from './styles'

type FlatListItemType = {
  title: string
  createdAt: string
  dimensions: string
  description?: string | null
  imageURL?: string | null
  comments?: number
}

const FlatListItem: React.FC<FlatListItemType> = ({
  imageURL,
  title,
  createdAt,
  dimensions,
  comments,
}) => {
  return (
    <RowView>
      <TankView>
        <TankHeaderView>
          <TankHeaderThumb source={imageURL ? { uri: imageURL } : AvatarImg} />
          <TankHeaderDetailView>
            <TankHeaderTitle>{title}</TankHeaderTitle>
            <TankHeaderText>{createdAt}</TankHeaderText>
            <TankHeaderText>{`${dimensions}cm`}</TankHeaderText>
          </TankHeaderDetailView>
        </TankHeaderView>
        <TankComments>{`${comments || 0} comments`}</TankComments>
      </TankView>
      <ChevronIcon icon="chevron-right" />
    </RowView>
  )
}

export default FlatListItem
