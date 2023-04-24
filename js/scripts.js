let pokemonRepository = (function () {
let pokemonArray = []; // empty array

pokemonArray = [ //pokemon objects 
                   {
                    name:'Squirtle', 
                    height:'1.08', 
                    type: ['water', 'dragon']
                  }, 
                  {
                    name:' Charmander', 
                    height:'2.00', 
                    type: ['dragon', 'monster']
                  },
                  {
                    name: ' Clefairy', 
                    height:'2.00', type: ['fairy']
                  },
                  {
                    name: ' Charizard ',
                    height: '5.07',
                    type: ['flame']
                  },
                  {
                    name: ' Arbok ',
                    height: '11.06', type: ['Cobra']
                  }]
    
  function add(pokemon) {
    pokemonArray.push(pokemon);
  }

  function getAll(pokemon) {
    return pokemonArray;
  }
  
  return {
  add: add
  getAll: getAll
  };
})();

console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Squirtle' });
console.log(pokemonRepository.getAll()); // [ { name: 'Squirtle' } ]

function getAll(pokemon) {
  document.write(pokemon.name + ' is ' + pokemon.height ,' tall and is a ' + pokemon.type , ' type of pokemon. ' );
}
pokemonArray.forEach(getAll);
