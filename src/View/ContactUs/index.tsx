import React, { useState } from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'

import { ConfigRTK } from 'store/config'
import { ContactUsProps } from 'routes'
import Input from 'View/Components/Input'
import { YupErrorsType, checkValidation } from 'helper'
import { FormView, SendButton, KeyboardAvoidingView, ScrollView } from './styles'

type FormData = {
  subject: string
  message: string
}
export default ({ navigation }: ContactUsProps) => {
  const HeaderHeight = useHeaderHeight()
  const dispatch = useDispatch()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<YupErrorsType<FormData>>({})
  const formValues = { subject, message }

  const validation = Yup.object({
    subject: Yup.string().required('required'),
    message: Yup.string().required('required'),
  })

  const Send = async () => {
    dispatch(ConfigRTK.actions.setLoading({ visible: true }))

    const resultValidation = await checkValidation(errors, formValues, validation)

    if (resultValidation) {
      setErrors(resultValidation)
      dispatch(ConfigRTK.actions.setLoading({ visible: false }))
      return
    }
    setErrors({})
    // send message

    dispatch(ConfigRTK.actions.setLoading({ visible: false }))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={HeaderHeight + 64}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormView>
            <Input
              label="Subject"
              onChangeText={text => {
                checkValidation(
                  errors,
                  { ...formValues, subject: text },
                  validation,
                  setErrors,
                  true,
                )
                setSubject(text)
              }}
              value={subject}
              error={errors.subject}
            />
            <Input
              label="Message"
              multiline
              onChangeText={text => {
                checkValidation(
                  errors,
                  { ...formValues, message: text },
                  validation,
                  setErrors,
                  true,
                )
                setMessage(text)
              }}
              value={message}
              error={errors.message}
            />
            <SendButton mode="contained" icon="email-send-outline" onPress={() => Send()}>
              Send
            </SendButton>
          </FormView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
