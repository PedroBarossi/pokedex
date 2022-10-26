const pokemonList = document.getElementById('pokemonList')
const btnMore = document.getElementById('btnMore')

const maxRecords = 905
const limit = 10;
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
         <li class="pokemon ${pokemon.mainType}">
                <span class="number">#${pokemon.pokeNumber}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.picture}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    }).catch((error) => console.error(error))
}

loadPokemonItems(offset, limit)
btnMore.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
    
        btnMore.parentElement.removeChild(btnMore)
    } else {
        loadPokemonItems(offset, limit);
    }
})