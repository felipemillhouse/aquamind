import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Platform } from 'react-native'

import { ForgotPasswordProps } from 'routes'
import { ConfigRTK } from 'store/config'
import Input from 'View/Components/Input'
import headerImage from 'assets/appImages/loginHeader.png'
import { YupErrorsType, checkValidation } from 'helper'
import {
  Container,
  AppNameView,
  AppTitle,
  AppSubTitle,
  ImageHeader,
  LoginButton,
  RowView,
  SecondaryButton,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from './styles'

interface FormData {
  email: string
}

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const formValues = { email }
  const validation = Yup.object({
    email: Yup.string().email('Invalid e-mail').required('required'),
  })

  const resetPassword = async () => {
    dispatch(ConfigRTK.actions.setLoading({ visible: true }))

    const resultValidation = await checkValidation(errors, formValues, validation)
    if (resultValidation) {
      setErrors(resultValidation)
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
      return
    }
    setErrors({})
    // execute reset password process
    dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <ImageHeader source={headerImage} />
        <Container>
          <AppNameView>
            <AppSubTitle> </AppSubTitle>
            <AppTitle>Forgot Password</AppTitle>
          </AppNameView>
          <Text>Enter your e-mail address</Text>
          <Text>We will e-mail you with instructions to reset your password</Text>
          <Input
            label="E-mail"
            onChangeText={text => {
              checkValidation(errors, { ...formValues, email: text }, validation, setErrors, true)
              setEmail(text)
            }}
            value={email}
            error={errors.email}
            keyboardType="email-address"
          />
          <LoginButton onPress={() => resetPassword()}>Reset Password</LoginButton>
          <RowView>
            <SecondaryButton onPress={() => navigation.goBack()}>Go to Login</SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword
