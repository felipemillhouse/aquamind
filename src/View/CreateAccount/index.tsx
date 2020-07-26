import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Platform } from 'react-native'
import * as Yup from 'yup'

import { CreateAccountProps } from 'routes'
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
  KeyboardAvoidingView,
  ScrollView,
} from './styles'

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

const CreateAccount = ({ navigation }: CreateAccountProps) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const formValues = {
    email,
    password,
    confirmPassword,
  }
  const validation = Yup.object({
    email: Yup.string().email('Invalid e-mail').required('required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Required'),
  })

  const createAccount = async () => {
    dispatch(ConfigRTK.actions.setLoading({ visible: true }))

    const resultValidation = await checkValidation(errors, formValues, validation)
    if (resultValidation) {
      setErrors(resultValidation)
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
      return
    }
    setErrors({})
    // execute create account process
    dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <ImageHeader source={headerImage} />
        <Container>
          <AppNameView>
            <AppSubTitle> </AppSubTitle>
            <AppTitle>Create Account</AppTitle>
          </AppNameView>
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
          <Input
            label="Password"
            onChangeText={text => {
              checkValidation(
                errors,
                { ...formValues, password: text },
                validation,
                setErrors,
                true,
              )
              setPassword(text)
            }}
            value={password}
            error={errors.password}
            secureTextEntry
          />
          <Input
            label="Confirm password"
            onChangeText={text => {
              checkValidation(
                errors,
                { ...formValues, confirmPassword: text },
                validation,
                setErrors,
                true,
              )
              setConfirmPassword(text)
            }}
            value={confirmPassword}
            error={errors.confirmPassword}
            secureTextEntry
          />
          <LoginButton onPress={() => createAccount()}>Create Account</LoginButton>
          <RowView>
            <SecondaryButton onPress={() => navigation.goBack()}>Go to Login</SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CreateAccount
