import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithForm from '../components/TextInputWithForm';
import colors from '../../colors';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../../types/routes';
import { login } from '../../services/auth';
import { useNotification } from '../../contexts/NotificationContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled(View)`
  padding: 20px;
  flex: 1;
  justify-content: center;
`;

const InputContainer = styled(View)`
  margin-bottom: 20px;
`;

const Button = styled(TouchableOpacity) <{ isPrimary?: boolean }>`
  height: 55px;
  background-color: ${({ isPrimary }) => (isPrimary ? colors.primary : 'transparent')};
  border: ${({ isPrimary }) => (isPrimary ? 'none' : `1px solid ${colors.text}`)};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const ButtonText = styled(Text) <{ isPrimary?: boolean }>`
  font-size: 15px;
  color: ${({ isPrimary }) => (isPrimary ? colors.background : colors.text)};
  font-weight: bold;
`;

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { notify } = useNotification()

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Min 6 characters are required')
      .required('Password is required'),
  });

  const onSubmit = async (values: { username: string; password: string }) => {
    const { data } = await login(values)
    if (data.token) {
      await AsyncStorage.setItem('authToken', data.token);
      navigation.replace('Home')
      return
    }
    notify('error', data.message, 2000)
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <InputContainer>
              <TextInputWithForm
                label="Username"
                placeholder='Type username'
                name="username"
              />
              <TextInputWithForm
                label="Password"
                placeholder='Type password'
                name="password"
                secureTextEntry
              />
            </InputContainer>
            <View>
              <Button isPrimary onPress={() => handleSubmit()}>
                <ButtonText isPrimary>Sign</ButtonText>
              </Button>
              <Button onPress={() => navigation.navigate('CreateUser')}>
                <ButtonText>Create account</ButtonText>
              </Button>
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;
