let pokemonRepository = (function () {
    let pokemonList = [] // empty array

    pokemonList = [
        //pokemon objects
        {
            name: 'Squirtle',
            height: '1.08',
            type: ['water', 'dragon'],
        },
        {
            name: ' Charmander',
            height: '2.00',
            type: ['dragon', 'monster'],
        },
        {
            name: ' Clefairy',
            height: '2.00',
            type: ['fairy'],
        },
        {
            name: ' Charizard ',
            height: '5.07',
            type: ['flame'],
        },
        {
            name: ' Arbok ',
            height: '11.06',
            type: ['Cobra'],
        },
    ]

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            console.log('pokemon is not correct')
        }
    }

    function getAll() {
        return pokemonList
    }

    return {
        add: add,
        getAll: getAll,
    }
})()

console.log(pokemonRepository.getAll()) // []
pokemonRepository.add({
    name: 'Squirtle',
    height: '1.08',
    type: ['water, dragon'],
})
console.log(pokemonRepository.getAll()) // [ { 'name:Squirtle', height: '1.08', type: [ 'water, dragon' ] } ]

pokemonRepository.getAll().forEach(function (pokemon) {
    var size
    if (pokemon.height < 5) {
        size = 'is small.'
    } else {
        size = "Wow that's big!"
    }
    document.write(pokemon.name + ' ' + size)
})
