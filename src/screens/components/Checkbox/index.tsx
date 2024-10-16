import React from "react";
import styled from "styled-components/native";

interface CheckboxProps {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  strikeThroughOnChecked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onChange,
  strikeThroughOnChecked = false,
}) => {
  return (
    <Container onPress={() => onChange(!value)} activeOpacity={0.8}>
      <CheckboxContainer>
        {value && <Checkmark>✓</Checkmark>}
      </CheckboxContainer>
      <Label strikeThrough={value && strikeThroughOnChecked}>{label}</Label>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-vertical: 8px;
`;

const CheckboxContainer = styled.View`
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-color: #000;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  position: relative;
`;

const Checkmark = styled.Text`
  color: #007bff;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
`;

const Label = styled.Text<{ strikeThrough?: boolean }>`
  font-size: 16px;
  color: #000;
  text-decoration-line: ${({ strikeThrough }) => (strikeThrough ? "line-through" : "none")};
  color: ${({ strikeThrough }) => (strikeThrough ? "#888" : "#000")};
`;

export default Checkbox;
