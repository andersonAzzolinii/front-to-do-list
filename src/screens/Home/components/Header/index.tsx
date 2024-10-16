import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackNavigationProp } from "../../../../types/routes";

interface HeaderProps {
  setFilterInputText: (text: string) => void;
}

const Header: React.FC<HeaderProps> = React.memo(({ setFilterInputText }) => {
  const { user } = useAuth()
  const navigation = useNavigation<RootStackNavigationProp>()

  const logOut = async () => {
    await AsyncStorage.clear()
    navigation.replace('Login')
  }
  return (
    <Container>
      <ViewInfoUser>
        <UserInfo>Welcome {user?.username}</UserInfo>
        <Pressable onPress={logOut}>
          <Text>Logout</Text>
        </Pressable>
      </ViewInfoUser>
      <StyledTextInput
        placeholder="Filter your activities"
        onChangeText={(text) => setFilterInputText(text)}
      />
    </Container>
  )
})

const Container = styled(View)`
  gap:15px;  
`
const ViewInfoUser = styled.View`
  justify-content:space-between;
  flex-direction:row;
`

const UserInfo = styled(Text)`
  font-size:15px
`

const StyledTextInput = styled(TextInput)`
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  padding-horizontal: 10px;
  border-radius: 5px;
`;

export default Header;
