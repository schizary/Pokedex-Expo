import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./pages/main";
import Login from "./pages/login";
import User from "./pages/user";
import Cadastro from "./pages/cadastro";
import AllPokemons from "./pages/allPokemons";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "Pokedex Login",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              fontSize: 26,
              letterSpacing: 2,
            },
          }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            title: "Pokedex",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#8B0000", // vermelho escuro
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              fontSize: 26,
              letterSpacing: 2,
            },
          }}
        />
        <Stack.Screen
          name="user"
          component={User}
          options={{
            title: "Detalhes do Pokémon",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="allPokemons"
          component={AllPokemons}
          options={{
            title: "Todos os Pokémons",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#8B0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
              fontSize: 22,
            },
          }}
        />
        <Stack.Screen
          name="cadastro"
          component={Cadastro}
          options={{
            title: "Cadastro de Usuários",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#3498DB",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
