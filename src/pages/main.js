import React, { Component } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { getPokemon } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";
export default class Main extends Component {
  state = {
    newPokemon: "",
    pokemons: [],
    loading: false,
  };

  async componentDidMount() {
    const pokemons = await AsyncStorage.getItem("pokemons");
    if (pokemons) {
      this.setState({ pokemons: JSON.parse(pokemons) });
    }
    // Adiciona botão no header
    this.props.navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name="list"
          backgroundColor="#8B0000"
          onPress={() => this.props.navigation.navigate("allPokemons")}
          style={{ marginRight: 10 }}
        >
          Todos
        </Icon.Button>
      ),
    });
  }

  componentDidUpdate(_, prevState) {
    const { pokemons } = this.state;
    if (prevState.pokemons !== pokemons) {
      AsyncStorage.setItem("pokemons", JSON.stringify(pokemons));
    }
  }

  handleAddPokemon = async () => {
    try {
      const { pokemons, newPokemon } = this.state;
      this.setState({ loading: true });
      const data = await getPokemon(newPokemon.toLowerCase());
      if (pokemons.find((p) => p.id === data.id)) {
        alert("Pokémon já adicionado!");
        this.setState({ loading: false });
        return;
      }
      // Adiciona avatar e types para facilitar listagem, mas salva o objeto completo
      const pokemonData = {
        ...data,
        avatar: data.sprites.front_default,
        types: data.types.map((t) => t.type.name).join(", "),
      };
      this.setState({
        pokemons: [...pokemons, pokemonData],
        newPokemon: "",
        loading: false,
      });
      Keyboard.dismiss();
    } catch (error) {
      alert("Pokémon não encontrado!");
      this.setState({ loading: false });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: () => (
      <Icon.Button
        name="list"
        backgroundColor="#8B0000"
        onPress={() => navigation.navigate("allPokemons")}
        style={{ marginRight: 10 }}
      >
        Todos
      </Icon.Button>
    ),
  });

  render() {
    const { pokemons, newPokemon, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Pokémon (nome ou ID)"
            value={newPokemon}
            onChangeText={(text) => this.setState({ newPokemon: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddPokemon}
          />
          <SubmitButton loading={loading} onPress={this.handleAddPokemon}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={pokemons}
          keyExtractor={(pokemon) => String(pokemon.id)}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>Tipos: {item.types}</Bio>
              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate("user", { pokemon: item });
                }}
              >
                <ProfileButtonText>Ver detalhes</ProfileButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {
                  this.setState({
                    pokemons: pokemons.filter((p) => p.id !== item.id),
                  });
                }}
                style={{ backgroundColor: "#FFC0CB" }}
              >
                <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
