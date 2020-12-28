import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import _ from 'lodash'

import { pickImage } from '../../helper'
import { TankDetailProps } from '../../routes'
import { RootState } from '../../store/rootReducer'
import { ConfigRTK } from '../../store/config'
import theme from '../Theme'
import AvatarImg from '../../assets/Avatar.png'
import ThumbPhoto from './Components/ThumbPhoto'
import {
  ButtonHeader,
  MainView,
  HeaderView,
  TankHeaderThumb,
  HeaderSlot,
  HeaderSlotView,
  LabelValue,
  Label,
  RowView,
  DetailView,
  ScrollView,
  RowGalleryView,
  TakeAPhotoButton,
} from './styles'

const TankDetail = ({ navigation, route }: TankDetailProps) => {
  const dispatch = useDispatch()
  const tank = _.find(
    useSelector((state: RootState) => state.tanks),
    { id: route.params.id },
  )
  const volume = _.round(((tank?.length || 0) * (tank?.width || 0) * (tank?.height || 0)) / 1000)
  const size = `${tank?.length}x${tank?.width}x${tank?.height}cm`

  useEffect(() => {
    navigation.setOptions({
      title: tank?.title || 'My Tank',
      headerRight: () => (
        <ButtonHeader
          color={theme.colors.surface}
          onPress={() => navigation.navigate('addTank', { tankId: tank?.id || 0 })}
        >
          Edit
        </ButtonHeader>
      ),
    })
  })

  const renderGallery = () => {
    return _.map(tank?.allPhotos, photo => <ThumbPhoto source={photo.url} key={photo.id} />)
  }

  const takePicture = async () => {
    const image = await pickImage()
    if (!image) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: 'Sorry, we need camera roll permissions to make this work!',
          okText: 'Ok',
        }),
      )
      return
    }
    if (!image.cancelled) {
      if (image.height > image.width + 30) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops! Vertical Image',
            alertMessage: 'Please, do not use vertical images',
            okText: 'Ok',
          }),
        )
        return
      }
      console.log({ image })
    }
  }

  return (
    <MainView>
      <HeaderView>
        <TankHeaderThumb source={tank?.coverImageURL ? { uri: tank.coverImageURL } : AvatarImg} />
        <HeaderSlotView>
          <HeaderSlot label="Photos" value={tank?.photos || 0} />
          <HeaderSlot label="Likes" value={tank?.likes || 0} />
          <HeaderSlot label="Comments" value={tank?.comments || 0} />
        </HeaderSlotView>
      </HeaderView>
      <DetailView>
        <RowView>
          <Label>Size </Label>
          <LabelValue>{size}</LabelValue>
        </RowView>
        <RowView>
          <Label>Volume </Label>
          <LabelValue>{`${volume}L`}</LabelValue>
        </RowView>
      </DetailView>
      <TakeAPhotoButton mode="contained" icon="camera" onPress={() => takePicture()}>
        Take a photo
      </TakeAPhotoButton>
      <ScrollView>
        <RowGalleryView>{renderGallery()}</RowGalleryView>
      </ScrollView>
    </MainView>
  )
}

export default TankDetail
