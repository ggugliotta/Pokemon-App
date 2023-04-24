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
   if (
     typeof pokemon === "object" &&
     "name" in pokemon &&
     "height" in pokemon &&
     "type" in pokemon
   ) {
    pokemonRepository.push(pokemon); 
   } else {
    console.log ("pokemon is not correct");
   }

  }   
  function getAll() {
    return pokemonRepository;
  }
  
  return {
  add: add,
  getAll: getAll,
  };
})();

console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Squirtle' });
console.log(pokemonRepository.getAll()); // [ { name: 'Squirtle' } ]

forEach(function (getAll) {
  let size; 
  if (item.height > 7) {
    size = "It's GIGANTIC!";
   } else {
      size = "It's a little baby pokemon, how cute!";
    }
  });