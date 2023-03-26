let pokemonList = [
  
];

pokemonList = [ //pokemon objects 
                   {name:'Squirtle (height: 1.08)', height:'1.08', type: ['water', 'dragon']}, 
                   {name:'Charmander (height: 2.00)', height:'2.00', type: ['dragon', 'monster']},
                   {name: 'Clefairy (height: 2.00)', height:'2.00', type: ['fairy']},
                   {name: 'Charizard (height:5.07)', height: '5.07', type: ['flame']},
                   {name: 'Arbok (height: 11.06)', height: '11.06', type: ['Cobra']}]



for (let i = 0; i <= pokemonList.length; i++) { 
  // this if statement will index = 0 
  if (pokemonList[i].height <10 && pokemonList[i].height >5){
    document.write(pokemonList[i].name + " is medium");
  }else if (pokemonList[i].height <5){
    document.write(pokemonList[i].name + " is small");
  }else {
    document.write(pokemonList[i].name + " Wow, that's big!");
  }
}
