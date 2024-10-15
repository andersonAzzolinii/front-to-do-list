import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputWithForm from '../components/TextInputWithForm';
import colors from '../../colors';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../types/routes';

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

  const onSubmit = (values: { username: string; password: string }) => {
    console.log('Valores enviados:', values);
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
                <ButtonText isPrimary>Create account</ButtonText>
              </Button>
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default LoginScreen;
