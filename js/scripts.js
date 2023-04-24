let pokemonList = (function () { [
  
];

pokemonList = [ //pokemon objects 
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
                  
function myLoopFunction(pokemon) {
  document.write(pokemon.name + ' is ' + pokemon.height ,' tall and is a ' + pokemon.type , ' type of pokemon. ' );
}
pokemonList.forEach(myLoopFunction);
})();