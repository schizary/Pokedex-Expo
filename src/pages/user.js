import React, { Component } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  BioPerfil,
} from "../styles.js";

const Card = ({ title, children }) => (
  <View style={{ backgroundColor: '#fff', borderRadius: 20, marginVertical: 10, marginHorizontal: 8, padding: 16, shadowColor: '#d90429', shadowOpacity: 0.2, shadowRadius: 6 }}>
    <NamePerfil style={{ color: '#d90429', fontSize: 20, marginBottom: 8 }}>{title}</NamePerfil>
    {children}
  </View>
);

async function fetchEvolutionChain(speciesUrl) {
  try {
    const speciesRes = await fetch(speciesUrl);
    const speciesData = await speciesRes.json();
    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();
    // Parse evolution chain
    const chain = [];
    let evo = evoData.chain;
    while (evo) {
      chain.push(evo.species.name);
      if (evo.evolves_to && evo.evolves_to.length > 0) {
        evo = evo.evolves_to[0];
      } else {
        evo = null;
      }
    }
    return chain;
  } catch (err) {
    return [];
  }
}

async function fetchPokemonImage(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    return data.sprites.front_default;
  } catch {
    return null;
  }
}

export default class User extends Component {
  state = {
    evolution: [],
    evolutionImages: [],
    loadingEvolution: true,
  };

  async componentDidMount() {
    const { pokemon } = this.props.route.params;
    if (pokemon.species && pokemon.species.url) {
      const evolutionNames = await fetchEvolutionChain(pokemon.species.url);
      const evolutionImages = await Promise.all(
        evolutionNames.map(async (name) => await fetchPokemonImage(name))
      );
      this.setState({
        evolution: evolutionNames,
        evolutionImages,
        loadingEvolution: false,
      });
    } else {
      this.setState({ loadingEvolution: false });
    }
  }

  render() {
    const { route } = this.props;
    const { pokemon } = route.params;
    const { evolution, evolutionImages, loadingEvolution } = this.state;

    const abilities = pokemon.abilities
      ? pokemon.abilities.map(a => a.ability.name).join(', ')
      : 'N/A';
    const stats = pokemon.stats
      ? pokemon.stats.map(s => `${s.stat.name.toUpperCase()}: ${s.base_stat}`).join(' | ')
      : 'N/A';
    const moves = pokemon.moves
      ? pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')
      : 'N/A';
    const spriteList = pokemon.sprites
      ? Object.values(pokemon.sprites).filter(v => typeof v === 'string' && v)
      : [];

    return (
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <AvatarPerfil source={{ uri: pokemon.avatar }} />
            <NamePerfil>{pokemon.name.toUpperCase()}</NamePerfil>
            <BioPerfil>#{pokemon.id} | {pokemon.types}</BioPerfil>
          </Header>

          <Card title="Linha Evolutiva">
            {loadingEvolution ? (
              <ActivityIndicator color="#d90429" size="large" />
            ) : evolution.length > 0 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                {evolution.map((name, idx) => (
                  <React.Fragment key={name}>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                      <AvatarPerfil source={{ uri: evolutionImages[idx] }} style={{ width: 60, height: 60, marginBottom: 4, borderRadius: 30 }} />
                      <BioPerfil style={{ color: '#d90429', fontSize: 14 }}>{name.toUpperCase()}</BioPerfil>
                    </View>
                    {idx < evolution.length - 1 && (
                      <BioPerfil style={{ color: '#d90429', fontSize: 24, marginHorizontal: 2, marginBottom: 0, marginTop: 0, alignSelf: 'center' }}>→</BioPerfil>
                    )}
                  </React.Fragment>
                ))}
              </View>
            ) : (
              <BioPerfil>N/A</BioPerfil>
            )}
          </Card>

          <Card title="Informações Básicas">
            <BioPerfil>Altura: {pokemon.height ?? 'N/A'} | Peso: {pokemon.weight ?? 'N/A'}</BioPerfil>
            <BioPerfil>Experiência base: {pokemon.base_experience ?? 'N/A'}</BioPerfil>
            <BioPerfil>Ordem: {pokemon.order ?? 'N/A'}</BioPerfil>
          </Card>

          <Card title="Habilidades">
            <BioPerfil>{abilities}</BioPerfil>
          </Card>

          <Card title="Stats">
            <BioPerfil>{stats}</BioPerfil>
          </Card>

          <Card title="Movimentos (5 primeiros)">
            <BioPerfil>{moves}</BioPerfil>
          </Card>

          {spriteList.length > 1 && (
            <Card title="Outras imagens">
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {spriteList.map((img, idx) => (
                  <AvatarPerfil key={idx} source={{ uri: img }} style={{ width: 60, height: 60, margin: 5, borderRadius: 30 }} />
                ))}
              </View>
            </Card>
          )}
        </ScrollView>
      </Container>
    );
  }
}
