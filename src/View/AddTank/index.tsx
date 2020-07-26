import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { View, Platform } from 'react-native'
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'
import { SwipeRow } from 'react-native-swipe-list-view'
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker'
import { TouchableRipple } from 'react-native-paper'
import _ from 'lodash'

import { addTankProps } from 'routes'
import EmptyImage from 'assets/coverVoidImage.png'
import TankMeasurement from 'assets/tankMeasurement.png'
import FakeLoadingScreen from 'View/Components/FakeLoadingScreen'
import theme from 'View/Theme'
import { ConfigRTK } from 'store/config'
import { getPlants } from 'API/plants'
import { getFertilizers } from 'API/fertilizers'
import PlantsRTK from 'store/plants'
import FertilizersRTK from 'store/fertilizers'
import { RootState } from 'store/rootReducer'
import { YupErrorsType, checkValidation } from 'helper'
import Input from 'View/Components/Input'
import FlatListItem from './Components/FlatListItem'
import {
  RowView,
  MainView,
  TankThumbImage,
  FullView,
  EmptyView,
  SmallText,
  LengthRowView,
  TankMeasurementImage,
  Title,
  AddNewButton,
  Divider,
  ActionButton,
  ActionButtonText,
  Icon,
  SaveButton,
  ActionEmptyView,
  ActionView,
  KeyboardAvoidingView,
} from './styles'

type fertilizerDataType = {
  id: number
  name: string
  dose: string
}[]
type plantDataType = {
  id: number
  name: string
}[]
type FormData = {
  tankName: string
  bornAt: string
  length: string
  width: string
  height: string
  co2?: string
  lightPeriod?: string
  lightModel?: string
  gravel?: string
  filter?: string
}
const AddTank = ({ navigation, route }: addTankProps) => {
  const [coverImage, setCoverImage] = useState('')
  const [tankName, setTankName] = useState('')
  const [bornAt, setBornAt] = useState('')
  const [length, setLength] = useState('0')
  const [width, setWidth] = useState('0')
  const [height, setHeight] = useState('0')
  const [co2, setCo2] = useState('0')
  const [lightPeriod, setLightPeriod] = useState('0')
  const [lightModel, setLightModel] = useState('')
  const [gravel, setGravel] = useState('')
  const [filter, setFilter] = useState('')
  const [fertilizerData, setFertilizerData] = useState<fertilizerDataType>([])
  const [fertilizerRender, setFertilizerRender] = useState<React.ReactElement[] | null>(null)
  const [plantData, setPlantData] = useState<plantDataType>([])
  const [plantRender, setPlantRender] = useState<React.ReactElement[] | null>(null)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const fertilizers = useSelector((state: RootState) => state.fertilizers)
  const plants = useSelector((state: RootState) => state.plants)
  const tanks = useSelector((state: RootState) => state.tanks)
  const formValues = {
    tankName,
    bornAt,
    length,
    width,
    height,
    co2,
    lightPeriod,
    lightModel,
    gravel,
    filter,
  }
  const validation = Yup.object({
    tankName: Yup.string().required('required'),
    bornAt: Yup.string()
      .matches(
        /^((\d{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|02-(0[1-9]|1\d|2[0-8])))|((\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00)-02-29))$/,
        'invalid date, format is YYYY-MM-DD',
      )
      .required('required'),
    length: Yup.string()
      .matches(/^([1-9]{1}\d{0,2})$/, 'between 1 and 999')
      .required('required'),
    width: Yup.string()
      .matches(/^([1-9]{1}\d{0,2})$/, 'between 1 and 999')
      .required('required'),
    height: Yup.string()
      .matches(/^([1-9]{1}\d{0,2})$/, 'between 1 and 999')
      .required('required'),
    co2: Yup.string().matches(/^(\d{0,1}|(\d\.\d))$/, 'between 0 and 9.9'),
    lightPeriod: Yup.string().matches(/^(\d{0,1}|(\d\.\d))$/, 'between 0 and 9.9'),
    lightModel: Yup.string().max(100, 'Maximum 100 characters'),
    filter: Yup.string().max(100, 'Maximum 100 characters'),
  })

  const fetchState = useCallback(
    (id: number) => {
      const tank = _.find(tanks, { id })
      if (tank) {
        if (tank.title) setTankName(tank.title)
        if (tank.coverImageURL) setCoverImage(tank.coverImageURL)
        if (tank.bornAt) setBornAt(tank.bornAt)
        if (tank.length) setLength(tank.length.toString())
        if (tank.width) setWidth(tank.width.toString())
        if (tank.height) setHeight(tank.height.toString())
        if (tank.co2) setCo2(tank.co2.toString())
        if (tank.lightPeriod) setLightPeriod(tank.lightPeriod.toString())
        if (tank.lightModel) setLightModel(tank.lightModel)
        if (tank.gravel) setGravel(tank.gravel)
        if (tank.filter) setFilter(tank.filter)
        if (tank?.plants?.length) setPlantData(tank.plants)
        if (tank?.fertilizers?.length) setFertilizerData(tank.fertilizers)
      }
    },
    [tanks],
  )

  useEffect(() => {
    if (route.params?.tankId) fetchState(route.params.tankId)
    async function fetch() {
      if (!plants.length) {
        const response = await getPlants()
        if (response) dispatch(PlantsRTK.actions.setPlants(response))
      }
      if (!fertilizers.length) {
        const response = await getFertilizers()
        if (response) dispatch(FertilizersRTK.actions.setFertilizers(response))
      }
    }
    fetch()
  }, [dispatch, fertilizers.length, fetchState, plants.length, route.params])

  const Save = async () => {
    dispatch(ConfigRTK.actions.setLoading({ visible: true }))

    const resultValidation = await checkValidation(errors, formValues, validation)

    if (resultValidation) {
      setErrors(resultValidation)
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
      return
    }
    setErrors({})
    // save data

    dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  }

  /** *************************************************
   * Start Fertilizer Stuffs
   */
  useEffect(() => {
    if (route.params?.fertilizerDoseData) {
      setFertilizerData(route.params.fertilizerDoseData)
    }
  }, [route.params])

  const renderFertilizerList: CallableFunction = useCallback(
    (newData?: fertilizerDataType) => {
      return _.map(newData || fertilizerData, item => (
        <View key={`${item.id}fertilizer`}>
          <SwipeRow rightOpenValue={-85} stopRightSwipe={-105} stopLeftSwipe={0.1}>
            <ActionView>
              <ActionEmptyView />
              <ActionButton
                onPress={() => deleteFertilizerHandler(item.id)}
                rippleColor={theme.colors.onSurface}
              >
                <RowView>
                  <Icon icon="delete-outline" />
                  <ActionButtonText>Delete</ActionButtonText>
                </RowView>
              </ActionButton>
            </ActionView>
            <FlatListItem text={`${item.dose}ml ${item.name}`} type="fertilizer" />
          </SwipeRow>
          <Divider />
        </View>
      ))
    },
    [deleteFertilizerHandler, fertilizerData],
  )

  const deleteFertilizerHandler: CallableFunction = useCallback(
    (id: number) => {
      const deleteFertilizer = () => {
        const newFertilizerData = fertilizerData
        _.remove(newFertilizerData, item => {
          return item.id === id
        })
        setFertilizerData(newFertilizerData)
        const newRender = renderFertilizerList(newFertilizerData)
        setFertilizerRender(newRender)
      }
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Delete Fertilizer',
          alertMessage: `Are you sure that you want to delete ${
            _.find(fertilizerData, { id })?.name
          }?`,
          cancelText: 'No',
          okText: 'Yes',
          okPress: deleteFertilizer,
        }),
      )
    },
    [dispatch, fertilizerData, renderFertilizerList],
  )

  useEffect(() => {
    const newRender = renderFertilizerList()
    setFertilizerRender(newRender)
  }, [deleteFertilizerHandler, fertilizerData, renderFertilizerList])
  /**
   * End Fertilizer Stuffs
   ************************************************* */
  /** *************************************************
   * Start Plant Stuffs
   */
  useEffect(() => {
    if (route.params?.plantCallbackData) {
      setPlantData(route.params.plantCallbackData)
    }
  }, [route.params])

  const renderPlantList: CallableFunction = useCallback(
    (newData?: plantDataType) => {
      return _.map(newData || plantData, item => (
        <View key={`${item.id}plant`}>
          <SwipeRow rightOpenValue={-85} stopRightSwipe={-105} stopLeftSwipe={0.1}>
            <ActionView>
              <ActionEmptyView />
              <ActionButton
                onPress={() => deletePlantHandler(item.id)}
                rippleColor={theme.colors.onSurface}
              >
                <RowView>
                  <Icon icon="delete-outline" />
                  <ActionButtonText>Delete</ActionButtonText>
                </RowView>
              </ActionButton>
            </ActionView>
            <FlatListItem text={item.name} type="plant" />
          </SwipeRow>
          <Divider />
        </View>
      ))
    },
    [deletePlantHandler, plantData],
  )

  const deletePlantHandler: CallableFunction = useCallback(
    (id: number) => {
      const deletePlant = () => {
        const newPlantData = plantData
        _.remove(newPlantData, item => {
          return item.id === id
        })
        setPlantData(newPlantData)
        const newRender = renderPlantList(newPlantData)
        setPlantRender(newRender)
      }
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Delete Plant',
          alertMessage: `Are you sure that you want to delete ${_.find(plantData, { id })?.name}?`,
          cancelText: 'No',
          okText: 'Yes',
          okPress: deletePlant,
        }),
      )
    },
    [dispatch, plantData, renderPlantList],
  )

  useEffect(() => {
    const newRender = renderPlantList()
    setPlantRender(newRender)
  }, [deletePlantHandler, plantData, renderPlantList])
  /**
   * End Plant Stuffs
   ************************************************* */

  const takePicture = async () => {
    const options: ImagePickerOptions = {
      title: 'Select Photo',
      mediaType: 'photo',
      noData: true,
      maxWidth: 500,
      maxHeight: 500,
      allowsEditing: true,
      quality: 0.8,
    }

    ImagePicker.showImagePicker(options, async response => {
      if (response.error) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops! Something went wrong',
            alertMessage: response.error,
            okText: 'Ok',
          }),
        )
      } else if (!response.didCancel) {
        setCoverImage(response.uri)
      }
    })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <MainView>
        <RowView>
          <TouchableRipple onPress={() => takePicture()}>
            <TankThumbImage source={coverImage ? { uri: coverImage } : EmptyImage} />
          </TouchableRipple>
          <FullView>
            <Input
              label="Tank name"
              onChangeText={text => {
                checkValidation(
                  errors,
                  { ...formValues, tankName: text },
                  validation,
                  setErrors,
                  true,
                )
                setTankName(text)
              }}
              value={tankName}
              error={errors.tankName}
            />
            <Input
              label="Born date YYYY-MM-DD"
              onChangeText={text => {
                checkValidation(
                  errors,
                  { ...formValues, bornAt: text },
                  validation,
                  setErrors,
                  true,
                )
                setBornAt(text)
              }}
              value={bornAt}
              error={errors.bornAt}
            />
          </FullView>
        </RowView>
        <RowView>
          <EmptyView>
            <LengthRowView>
              <FullView>
                <Input
                  label="Length"
                  onChangeText={text => {
                    checkValidation(
                      errors,
                      { ...formValues, length: text },
                      validation,
                      setErrors,
                      true,
                    )
                    setLength(text)
                  }}
                  keyboardType="number-pad"
                  value={length}
                  error={errors.length}
                />
              </FullView>
              <SmallText>cm</SmallText>
            </LengthRowView>
            <LengthRowView>
              <FullView>
                <Input
                  label="Width"
                  onChangeText={text => {
                    checkValidation(
                      errors,
                      { ...formValues, width: text },
                      validation,
                      setErrors,
                      true,
                    )
                    setWidth(text)
                  }}
                  keyboardType="number-pad"
                  value={width}
                  error={errors.width}
                />
              </FullView>
              <SmallText>cm</SmallText>
            </LengthRowView>
            <LengthRowView>
              <FullView>
                <Input
                  label="Height"
                  onChangeText={text => {
                    checkValidation(
                      errors,
                      { ...formValues, height: text },
                      validation,
                      setErrors,
                      true,
                    )
                    setHeight(text)
                  }}
                  keyboardType="number-pad"
                  value={height}
                  error={errors.height}
                />
              </FullView>
              <SmallText>cm</SmallText>
            </LengthRowView>
          </EmptyView>
          <TankMeasurementImage source={TankMeasurement} />
        </RowView>
        <RowView>
          <FullView>
            <Input
              label="CO2 level"
              onChangeText={text => {
                checkValidation(errors, { ...formValues, co2: text }, validation, setErrors, true)
                setCo2(text)
              }}
              keyboardType="numeric"
              value={co2}
              error={errors.co2}
            />
          </FullView>
          <SmallText marginRight>bubbles/sec</SmallText>
          <FullView>
            <Input
              label="Day light"
              onChangeText={text => {
                checkValidation(errors, { ...formValues, lightPeriod: text }, validation, setErrors)
                setLightPeriod(text)
              }}
              keyboardType="numeric"
              value={lightPeriod}
              error={errors.lightPeriod}
            />
          </FullView>
          <SmallText>hours/day</SmallText>
        </RowView>
        <Input
          label="Light (T5 4 x 45W High Lite Day)"
          onChangeText={text => {
            checkValidation(errors, { ...formValues, lightModel: text }, validation, setErrors)
            setLightModel(text)
          }}
          value={lightModel}
          error={errors.lightModel}
        />
        <Input
          label="Gravel (ADA Aqua Soil Amazonia)"
          onChangeText={text => {
            checkValidation(errors, { ...formValues, gravel: text }, validation, setErrors)
            setGravel(text)
          }}
          value={gravel}
          error={errors.gravel}
        />
        <Input
          label="Filter OASE Indoor Aquatics Biomaster 250"
          onChangeText={text => {
            checkValidation(errors, { ...formValues, filter: text }, validation, setErrors)
            setFilter(text)
          }}
          value={filter}
          error={errors.filter}
        />
        <Title>Fertilizer Dose (per day)</Title>
        <AddNewButton
          mode="text"
          icon="plus"
          onPress={() =>
            navigation.navigate('addFertilizer', {
              fertilizerDoseData: fertilizerData,
            })
          }
        >
          Add new
        </AddNewButton>
        {fertilizerRender}
        <Title>Current Plants</Title>
        <AddNewButton
          mode="text"
          icon="plus"
          onPress={() => navigation.navigate('addPlant', { plantData })}
        >
          Add new
        </AddNewButton>
        {plantRender}
        <SaveButton mode="contained" icon="database-check" onPress={() => Save()}>
          Save
        </SaveButton>
      </MainView>
    </KeyboardAvoidingView>
  )
}

export default optimizeHeavyScreen(AddTank, FakeLoadingScreen)
