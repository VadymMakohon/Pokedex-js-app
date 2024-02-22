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

// print the list of names from pokemonList and corresponding height of that name using forEach()
pokemonList.forEach(function(pokemon) {
  document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');

  if (pokemon.height > 5) {
    document.write('Wow, that\'s a big pokemon!');
  }

  document.write('<br>');
});
