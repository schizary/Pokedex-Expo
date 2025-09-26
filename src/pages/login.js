import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user")
    if(!user){
      alert("Nenhum usuário cadastro")
      return
    }
    const userJson = JSON.parse(user)
    if(userJson.email === email && userJson.password === password){
      navigation.navigate("main")
    }else{
      alert("E-mail ou senha inválidos!")
    }
  };

  const handleCadastro = () => {
    navigation.navigate('cadastro')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POKEDEX LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#8B0000"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#8B0000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cadastroButton]} onPress={handleCadastro}>
        <Text style={[styles.buttonText, { color: '#8B0000' }]}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B0000",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffe066",
    marginBottom: 30,
    letterSpacing: 3,
    textShadowColor: '#d90429',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ffe066",
    borderRadius: 20,
    padding: 12,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#fff",
    color: "#8B0000",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#ffe066",
    borderRadius: 20,
    padding: 14,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: '#d90429',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cadastroButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ffe066',
  },
  buttonText: {
    color: "#8B0000",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default Login;