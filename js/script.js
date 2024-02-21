// describtions of pokemon lists
let pokemonList = [
  {
    name: "Venusaur",
    height: 7,
    types: ['grass', 'poison']
  },
  {
    name: "Charmander",
    height: 6,
    types: ['fire']
  },
  {
    name: "Squirtle",
    height: 5,
    types: ['water']
  }
  ];
  // print the list of names from pokemonList and coresponding height of that name 
  for (let i = 0; i < pokemonList.length; i++)
  // print a message if the height is bigger than 5 
 {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    if (pokemonList[i].height < 5) {
      document.write('<br>');
    }
    else {
      document.write('Wow, that\'s a big pokemon!');
      document.write('<br>');
    }
  }
