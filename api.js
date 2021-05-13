const list = document.querySelector('[data-js="list"]')

const pokemonPromises = []

function getPokemonUrl(params) {
  return axios
  .get(`https://pokeapi.co/api/v2/pokemon/${params}`)
}

async function getPokemonsDataUrl() {
  for(let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      await getPokemonUrl(i).then(response => response.data)
      .then(pokemons => {
        const majorElement = pokemons.types.map(typePokemon=>typePokemon.type.name)
        const name = pokemons.name

          let acc = `
            <li class="list__item ${majorElement[0]} ${name}">
              <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemons.id}.png" alt="${pokemons.name}"/>
              <p class="name">${pokemons.id}.${name}</p>
              <small class="type">${majorElement.join(' | ')}</small>
            </li>
            `
            list.innerHTML += acc
        })
    )
  }
}

getPokemonsDataUrl()
