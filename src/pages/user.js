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
    if (!speciesData.evolution_chain?.url) {
      return [];
    }
    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();
    // Parse evolution chain
    const chain = [];
    let evo = evoData.chain;
    while (evo) {
      const evolutionDetails = evo.evolution_details?.[0];
      let evolutionMethod = 'Level up';

      if (evolutionDetails) {
        if (evolutionDetails.min_level) {
          evolutionMethod = `Level ${evolutionDetails.min_level}`;
        } else if (evolutionDetails.trigger?.name === 'trade') {
          evolutionMethod = 'Trade';
        } else if (evolutionDetails.item) {
          evolutionMethod = `Use ${evolutionDetails.item.name}`;
        } else if (evolutionDetails.min_happiness) {
          evolutionMethod = 'Happiness';
        }
      }

      chain.push({
        name: evo.species.name,
        min_level: evolutionDetails?.min_level ?? null,
        evolution_method: evolutionMethod
      });

      evo = evo.evolves_to?.[0] ?? null;
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
    showAllMoves: false,
  };

  async componentDidMount() {
    const { pokemon } = this.props.route.params;
    if (pokemon.species && pokemon.species.url) {
      const evolution_chain = await fetchEvolutionChain(pokemon.species.url);
      const evolutionImages = await Promise.all(
        evolution_chain.map(async (evo) => await fetchPokemonImage(evo.name))
      );
      this.setState({
        evolution: evolution_chain,
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
    const { evolution, evolutionImages, loadingEvolution, showAllMoves } = this.state;

    const abilities = pokemon.abilities
      ? pokemon.abilities.map(a => a.ability.name).join(', ')
      : 'N/A';
    const stats = pokemon.stats
      ? pokemon.stats.map(s => `${s.stat.name.toUpperCase()}: ${s.base_stat}`).join(' | ')
      : 'N/A';
    const allMoves = pokemon.moves
      ? pokemon.moves
        .map(m => {
          const details = m.version_group_details;
          const latestDetail = details[details.length - 1];
          const learnMethod = latestDetail?.move_learn_method?.name;
          const level = latestDetail?.level_learned_at;

          let method = '';
          let priority = 5;

          switch (learnMethod) {
            case 'level-up':
              method = level ? ` (Lv ${level})` : ' (Level up)';
              priority = 2;
              break;
            case 'egg':
              method = ' (Egg)';
              priority = 1;
              break;
            case 'tutor':
              method = ' (Tutor)';
              priority = 3;
              break;
            case 'machine':
              method = ' (TM/HM)';
              priority = 4;
              break;
            case 'trade':
              method = ' (Trade)';
              priority = 6;
              break;
            default:
              method = learnMethod ? ` (${learnMethod})` : '';
              priority = 5;
          }

          return {
            name: m.move.name,
            method,
            priority,
            level: level || 0
          };
        })
        .sort((a, b) => {
          if (a.priority !== b.priority) return a.priority - b.priority;
          if (a.priority === 2) return a.level - b.level;
          return a.name.localeCompare(b.name);
        })
        .map(m => `${m.name}${m.method}`)
      : [];
    const movesToDisplay = showAllMoves ? allMoves : allMoves.slice(0, 5);
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
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {evolution.map((evo, idx) => (
                  <React.Fragment key={evo.name}>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                      <AvatarPerfil source={{ uri: evolutionImages[idx] }} style={{ width: 60, height: 60, marginBottom: 4, borderRadius: 30 }} />
                      <BioPerfil style={{ color: '#d90429', fontSize: 14, textAlign: 'center' }}>{evo.name.toUpperCase()}</BioPerfil>
                      {idx < evolution.length - 1 && evolution[idx + 1].evolution_method && (
                        <BioPerfil style={{ fontSize: 12, color: '#555' }}>{evolution[idx + 1].evolution_method}</BioPerfil>
                      )}
                    </View>
                    {idx < evolution.length - 1 && (<BioPerfil style={{ color: '#d90429', fontSize: 24, marginHorizontal: 2 }}>→</BioPerfil>)}
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

          <Card title="Movimentos">
            {allMoves.length > 0 ? (
              <View>
                {movesToDisplay.map((move, idx) => (
                  <BioPerfil key={idx} style={{ marginBottom: 4 }}>
                    {move}
                  </BioPerfil>
                ))}
                {allMoves.length > 5 && (
                  <BioPerfil
                    onPress={() => this.setState({ showAllMoves: !showAllMoves })}
                    style={{ color: '#d90429', marginTop: 8 }}
                  >
                    {showAllMoves ? 'Ver menos ▲' : 'Ver todos ▼'}
                  </BioPerfil>
                )}
              </View>
            ) : (
              <BioPerfil>N/A</BioPerfil>
            )}
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
