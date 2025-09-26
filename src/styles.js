import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

//Estilos da página Main
export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: #ff1c1c;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-color: #fff;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#ff1c1c",
})`
  flex: 1;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  padding: 0 15px;
  border: 2px solid #ff1c1c;
  color: #ff1c1c;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #d90429;
  border-radius: 20px;
  margin-left: 10px;
  padding: 0 20px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 2px 8px #d90429;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #ffe066;
  border-width: 3px;
  border-color: #d90429;
`;

export const Name = styled.Text`
  font-size: 22px;
  color: #d90429;
  font-weight: bold;
  margin-top: 8px;
  text-align: center;
  letter-spacing: 2px;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 16px;
  line-height: 22px;
  color: #d90429;
  margin-top: 8px;
  text-align: center;
  font-weight: bold;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 20px;
  background: #d90429;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

//Estilos da página Users
export const Header = styled.View`
  padding: 30px;
  align-items: center;
  justify-content: center;
  background: #ff1c1c;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
`;

export const AvatarPerfil = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: #ffe066;
  border-width: 4px;
  border-color: #fff;
`;

export const NamePerfil = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  margin-top: 12px;
  text-align: center;
  letter-spacing: 3px;
`;

export const BioPerfil = styled.Text`
  font-size: 18px;
  line-height: 24px;
  color: #ffe066;
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.Text`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;
