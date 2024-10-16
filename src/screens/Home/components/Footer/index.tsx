import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View, Text } from "react-native";
import { Formik } from "formik";
import TextInputWithForm from "../../../components/TextInputWithForm";
import * as Yup from "yup";

interface FooterProps {
  handleAddNewTask: (inputValue: string) => void;
}

const validationSchema = Yup.object().shape({
  newTask: Yup.string().required("This field is required"), // Campo obrigatório
});

const Footer: React.FC<FooterProps> = React.memo(({ handleAddNewTask }) => {
  return (
    <Formik
      initialValues={{ newTask: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleAddNewTask(values.newTask);
        resetForm();
      }}
    >
      {({ handleSubmit, errors, touched }) => {
        const isError = !!(errors.newTask && touched.newTask);

        return (
          <Container>
            <TextInputWithForm
              validateOnBlur={false}
              placeholder="Add new activitie"
              name="newTask"
              style={{ flex: 1 }}
            />
            <AddButton onPress={() => handleSubmit()} isError={isError}>
              <ButtonText>+</ButtonText>
            </AddButton>
          </Container>
        );
      }}
    </Formik>
  );
})

const Container = styled(View)`
  flex-direction: row;
  gap: 10px; 
  justify-content: center;
  align-items: center; 
`;

const AddButton = styled(TouchableOpacity) <{ isError: boolean }>`
  background-color: green;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ isError }) => (isError ? "20px" : "0")};
`;
const ButtonText = styled(Text)`
  font-size: 25px;
  text-align: center;
  color: white;
`;

export default Footer;
