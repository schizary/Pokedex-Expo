import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import { getPokemon } from "../services/api";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const Container = styled.View`
  flex: 1;
  background: #ff1c1c;
  padding-top: 20px;
`;
const CARD_MARGIN = 10;
const CARD_WIDTH = (Dimensions.get('window').width / 2) - (CARD_MARGIN * 3);
const PokemonCard = styled.View`
  background: #fff;
  border-radius: 20px;
  margin: ${CARD_MARGIN}px;
  padding: 16px;
  align-items: center;
  box-shadow: 0px 2px 8px #d90429;
  width: ${CARD_WIDTH}px;
`;
const Name = styled.Text`
  font-size: 18px;
  color: #d90429;
  font-weight: bold;
  margin-top: 8px;
  text-align: center;
  letter-spacing: 2px;
`;
const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #ffe066;
  border-width: 3px;
  border-color: #d90429;
`;
const Title = styled.Text`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 3px;
`;

const LIMIT = 20;

const AllPokemons = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async (reset = false) => {
    setLoading(true);
    const offset = reset ? 0 : page * LIMIT;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
      const data = await response.json();
      const details = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokeData = await getPokemon(pokemon.name);
          return {
            ...pokeData,
            avatar: pokeData.sprites.front_default,
            types: pokeData.types.map((t) => t.type.name).join(", "),
          };
        })
      );
      setPokemons(reset ? details : [...pokemons, ...details]);
      setPage(reset ? 1 : page + 1);
    } catch (error) {
      // erro
    }
    setLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPokemons(true);
    setRefreshing(false);
  };

  return (
    <Container>
      <Title>Todos os Pokémons</Title>
      {loading && pokemons.length === 0 ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("user", { pokemon: item })}>
              <PokemonCard>
                <Avatar source={{ uri: item.avatar }} />
                <Name>{item.name.toUpperCase()}</Name>
                <Text style={{ color: '#d90429', fontWeight: 'bold' }}>Tipos: {item.types}</Text>
              </PokemonCard>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          onEndReached={() => fetchPokemons()}
          onEndReachedThreshold={0.2}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </Container>
  );
};

export default AllPokemons;
