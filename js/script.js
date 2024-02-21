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
  for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
    if (pokemonList[i].height < 5) {
      document.write('<br>');
    }
    else {
      document.write('That\'s a big pokemon!');
      document.write('<br>');
    }
  }
