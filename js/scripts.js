let repository = []; // empty array

repository = [ //pokemon objects 
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

for (let i = 0; i <= repository.length; i++) { 
  if (repository[i].height <12){
    document.write(repository[i].name + ',' + repository[i].height  + ',' + repository[i].type );
  }
 }

