#**Pokedex Expo – PokeAPI**

Aplicativo desenvolvido em **React Native (Expo)** que consome a [PokeAPI](https://pokeapi.co/) para exibir informações completas sobre Pokémon:  
- Tipos, stats e habilidades  
- Linha evolutiva com imagens  
- Lista de movimentos organizados por método de aprendizado  
- Sprites alternativos e dados básicos

---

## 📌 **Sumário**
- [✨ Funcionalidades](#-funcionalidades)
- [🧰 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📂 Estrutura de Pastas](#-estrutura-de-pastas)
- [⚙️ Instalação e Execução](#️-instalação-e-execução)
- [🧪 Exemplo de Uso da PokeAPI](#-exemplo-de-uso-da-pokeapi)
- [📄 Documentação do Código](#-documentação-do-código)
- [🌐 Referências](#-referências)
- [🤝 Contribuindo](#-contribuindo)
- [📜 Licença](#-licença)

---

## ✨ **Funcionalidades**

- ✅ Listagem de Pokémon com rolagem  
- 🔍 Busca e seleção de Pokémon específicos  
- 🧬 Exibição de **linha evolutiva** com imagens e método de evolução  
- 📊 Dados detalhados: altura, peso, ordem, experiência, stats  
- 📝 Lista de **movimentos organizados por prioridade**:
  - 🥚 **Ovo** (prioridade 1)  
  - ⬆️ **Nível** (prioridade 2 — ordenado pelo nível aprendido)  
  - 🧑‍🏫 **Tutor** (prioridade 3)  
  - 💽 **TM/HM** (prioridade 4)  
  - Outros métodos (troca, especiais etc.)  
- 🖼️ Galeria de sprites alternativos  
- 📱 Interface amigável e responsiva

---

## 🧰 **Tecnologias Utilizadas**

- [React Native](https://reactnative.dev/)  
- [Expo](https://expo.dev/)  
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)  
- [PokeAPI](https://pokeapi.co/)  
- **Fetch API** (requisições HTTP nativas)

---

## 📂 **Estrutura de Pastas**

```
📦 Pokedex-Expo
┣ 📂 .expo
┣ 📂 assets
┣ 📂 node_modules
┣ 📂 src
┃ ┣ 📂 pages
┃ ┃ ┣ allPokemons.js → Lista todos os Pokémon
┃ ┃ ┣ cadastro.js → Tela de cadastro/login
┃ ┃ ┣ login.js → Tela de login
┃ ┃ ┣ main.js → Tela principal / home
┃ ┃ ┗ user.js → Tela de detalhes do Pokémon 🟡
┃ ┣ 📂 services
┃ ┣ 📜 routes.js → Navegação entre telas
┃ ┣ 📜 styles.js → Estilização global
┣ 📜 App.js
┣ 📜 app.json
┣ 📜 index.js
┣ 📜 package.json
┗ 📜 README.md
```

---

## ⚙️ **Instalação e Execução**

### 📌 **Pré-requisitos**
- [Node.js LTS](https://nodejs.org/)  
- [Git](https://git-scm.com/)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  

---

### 📥 **1. Clonar o repositório**
```bash
git clone https://github.com/SEU_USUARIO/Pokedex-Expo.git
cd Pokedex-Expo
```

### 📦 **2. Instalar dependências**
```bash
npm install
```

### 🚀 **3. Iniciar o projeto Expo**
```bash
npx expo start
```

Após o carregamento, você pode:

- Escanear o QR Code no app Expo Go 📱  
- Pressionar `a` para abrir no emulador Android  
- Pressionar `i` para abrir no iOS (Mac)
- Pressionar `w` para abrir no navegador (localhost)

---

## 🧪 **Exemplo de Uso da PokeAPI**

📄 **Arquivo:** `src/pages/user.js`  
Busca e exibe a cadeia evolutiva do Pokémon:

```javascript
async function fetchEvolutionChain(speciesUrl) {
  const speciesRes = await fetch(speciesUrl);
  const speciesData = await speciesRes.json();

  if (!speciesData.evolution_chain?.url) return [];

  const evoRes = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoRes.json();

  const chain = [];
  let evo = evoData.chain;

  while (evo) {
    const evolutionDetails = evo.evolution_details?.[0];
    let evolutionMethod = 'Level up';

    if (evolutionDetails) {
      if (evolutionDetails.min_level) evolutionMethod = `Level ${evolutionDetails.min_level}`;
      else if (evolutionDetails.trigger?.name === 'trade') evolutionMethod = 'Trade';
      else if (evolutionDetails.item) evolutionMethod = `Use ${evolutionDetails.item.name}`;
      else if (evolutionDetails.min_happiness) evolutionMethod = 'Happiness';
    }

    chain.push({
      name: evo.species.name,
      evolution_method: evolutionMethod
    });

    evo = evo.evolves_to?.[0] ?? null;
  }

  return chain;
}
```

---

## 📄 **Documentação do Código**

Os componentes seguem um padrão com **JSDoc** para facilitar manutenção:

```javascript
/**
 * Busca e parseia a cadeia evolutiva de um Pokémon.
 * @param {string} speciesUrl - URL da espécie do Pokémon.
 * @returns {Promise<Array>} Lista de evoluções.
 */
```

👉 Cada tela está localizada em `src/pages`, com navegação centralizada em `src/routes.js`.

---

## 🌐 **Referências**

📚 **PokeAPI Docs**: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)

🧠 **Endpoints principais**:  
- `/pokemon/{id or name}` – Dados gerais  
- `/evolution-chain/{id}` – Linha evolutiva  
- `/type/{id}` – Tipos e vantagens  

📌 **Expo**: [https://docs.expo.dev](https://docs.expo.dev)

---

## 🤝 **Contribuindo**

1. Faça um fork do projeto  
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "feat: nova feature"
   ```
4. Envie para seu fork:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request 🚀

---

## 📜 **Licença**

Este projeto está licenciado sob a licença **MIT**.  
Sinta-se livre para usar, modificar e compartilhar.

👨‍💻 Criado por:

Gustavo Schizari Ferreira Filho e Maria Clara Cardoso Costa
