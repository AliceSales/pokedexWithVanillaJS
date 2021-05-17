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
          let elements = 
            majorElement[1] ? 
              `
              <small>
                  |
              </small>
              <small class="type ${majorElement[1]}">
                ${majorElement[1]}
              </small>
              ` : ` `
          let acc = `
            <li class="list__item">
              <div class="item__image ${majorElement[0]}">
                  <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemons.id}.png" alt="${pokemons.name}"/>
              </div>
              <div class="item__informations">
                  <p class="name" onclick="pokemonDetails('${pokemons.name}')">${pokemons.id}.${pokemons.name}</p></a>
                  <div class="container__type">
                      <small class="type ${majorElement[0]}">
                        ${majorElement[0]}
                      </small>
                      ${elements}
                  </div>
              </div>
            </li>
            `
          list.innerHTML += acc
          return pokemons.name
      })
    )
  }
}

getPokemonsDataUrl()
