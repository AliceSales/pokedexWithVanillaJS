const list = document.querySelector('[data-js="list"]')

const pokemonPromises = []

function getPokemonUrl(params) {
  return axios
  .get(`https://pokeapi.co/api/v2/pokemon/${params}`)
}

function getPokemonsDataUrl() {
  for(let i = 1; i <= 150; i++) {
    pokemonPromises.push(
      getPokemonUrl(i).then(response => response.data)
      .then(pokemons => {

        const type = pokemons.types.map(typePokemon=>typePokemon.type.name)

        console.log(pokemons)

          let acc = `
            <li class="list__item">
              <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemons.id}.png" alt="${pokemons.name}"/>
              <p class="name">${pokemons.id}.${pokemons.name}</p>
              <small class="type">${type.join(' | ')}</small>
            </li>
            `
            list.innerHTML += acc
        })
    )
  }
}

getPokemonsDataUrl()
