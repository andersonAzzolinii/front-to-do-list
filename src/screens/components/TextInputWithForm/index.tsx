import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { useField } from 'formik';
import styled from 'styled-components/native';
import colors from '../../../colors';

interface TextInputWithFormProps extends TextInputProps {
  label: string;
  name: string;
  style?: object;
  secureTextEntry?: boolean; 
}

const Container = styled(View)`
  justifyContent:center;
`;

const StyledTextInput = styled(TextInput)<{ hasError: boolean }>`
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? colors.error : colors.border)};
`;

const ErrorText = styled(Text)`
  color: red;
  font-size: 14px;
  margin-bottom:5px;
`;

const Label = styled(Text)`
  font-weight: bold;
`;

const TextInputWithForm: React.FC<TextInputWithFormProps> = ({ label, name, style, secureTextEntry, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Container style={style}>
      <Label>{label}</Label>
      <StyledTextInput
        {...props}
        value={field.value}
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
        secureTextEntry={secureTextEntry}
        hasError={meta.touched && !!meta.error}
      />
      {meta.touched && meta.error ? <ErrorText>{meta.error}</ErrorText> : null}
    </Container>
  );
};

export default TextInputWithForm;
