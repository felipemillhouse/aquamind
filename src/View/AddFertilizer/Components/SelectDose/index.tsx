import React, { useState } from 'react'
import { Portal, Dialog, Paragraph } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import _ from 'lodash'
import * as Yup from 'yup'

import { ConfigRTK } from '../../../../store/config'
import Input from '../../../Components/Input'
import theme from '../../../Theme'
import { YupErrorsType, checkValidation } from '../../../../helper'

import { Button } from './styles'

type SelectDoseProps = {
  visible: boolean
  onDismiss: CallableFunction
  fertilizerId: number
  fertilizerName: string
  fertilizerData: {
    id: number
    name: string
    dose: string
  }[]
}
type FormData = {
  dose: string
}
const SelectDose = ({
  visible,
  onDismiss,
  fertilizerId,
  fertilizerName,
  fertilizerData,
}: SelectDoseProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [dose, setDose] = useState('')
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const validation = Yup.object({
    dose: Yup.string()
      .matches(/^([1-9]{1}\d{0,2}|\d{1,3}\.[1-9]{1})$/, 'between 0.1 and 999.9')
      .required('required'),
  })

  const save = async () => {
    const resultValidation = await checkValidation(errors, { dose }, validation)

    if (resultValidation) {
      setErrors(resultValidation)
      return
    }
    setErrors({})
    onDismiss(false)

    if (fertilizerData?.length > 0 && !!_.find(fertilizerData, { id: fertilizerId })) {
      dispatch(
        ConfigRTK.actions.setAlert({
          visible: true,
          alertTitle: 'Oops!',
          alertMessage: `You already have ${fertilizerName} added to your tank`,
          okText: 'Ok',
        }),
      )
      return
    }

    const fertilizerDoseData = {
      id: fertilizerId,
      name: fertilizerName,
      dose,
    }
    setDose('')

    navigation.navigate('addTank', {
      fertilizerDoseData: [...fertilizerData, fertilizerDoseData],
    })
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => onDismiss(false)}>
        <Dialog.Title>Dose</Dialog.Title>
        <Dialog.Content>
          <Paragraph>How many milliliters do you dose per day?</Paragraph>
          <Input
            label="Dose"
            onChangeText={text => {
              checkValidation(errors, { dose: text }, validation, setErrors, true)
              setDose(text)
            }}
            keyboardType="numeric"
            value={dose}
            error={errors.dose}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color={theme.colors.error} onPress={() => onDismiss(false)}>
            Cancel
          </Button>
          <Button onPress={() => save()}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default SelectDose
