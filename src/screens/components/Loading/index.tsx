import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoadingComponent = () => (
  <Container>
    <StyledActivityIndicator size="large" color="#0000ff" />
  </Container>
);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
  width: 150px;
  height: 150px;
`;

export default LoadingComponent;
