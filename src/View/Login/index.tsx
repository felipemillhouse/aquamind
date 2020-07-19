import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Platform } from 'react-native'

import { LoginProps } from 'routes'
import { setLoading, setAuthenticated } from 'store/config/actions'
import { getUser } from 'store/user/actions'
import Input from 'View/@Components/Input'
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
  SeparatorView,
  KeyboardAvoidingView,
  ScrollView,
} from './styles'

type FormData = {
  email: string
  password: string
}

const Login = ({ navigation }: LoginProps) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const formValues = {
    email,
    password,
  }
  const validation = Yup.object({
    email: Yup.string().email('Invalid e-mail').required('required'),
    password: Yup.string().required('required'),
  })

  const checkLogin = async () => {
    // dispatch(
    //   setAlert({
    //     visible: true,
    //     alertTitle: 'Delete Photo',
    //     alertMessage: 'Are you sure that you want to delete this photo?',
    //     cancelText: 'Cancel',
    //   }),
    // )
    dispatch(setLoading(true))

    const resultValidation = await checkValidation(errors, formValues, validation)

    if (resultValidation) {
      setErrors(resultValidation)
      dispatch(setLoading(false))
      return
    }
    setErrors({})

    dispatch(getUser(1))
    dispatch(setLoading(false))
    dispatch(setAuthenticated(true))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <ImageHeader source={headerImage} />
        <Container>
          <AppNameView>
            <AppSubTitle>Welcome to</AppSubTitle>
            <AppTitle>Aquamind Care</AppTitle>
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
          <LoginButton mode="contained" onPress={() => checkLogin()}>
            Login
          </LoginButton>
          <RowView>
            <SecondaryButton onPress={() => navigation.navigate('createAccount')}>
              Create account
            </SecondaryButton>
            <SeparatorView />
            <SecondaryButton onPress={() => navigation.navigate('forgotPassword')}>
              Forgot Password
            </SecondaryButton>
          </RowView>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login
