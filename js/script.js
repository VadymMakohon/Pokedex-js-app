// scripts.js
// created new pokemonRepository variable

let pokemonRepository = (function() {
  let pokemonList = [
    { name: "Venusaur", height: 7, types: ['grass', 'poison']},
    { name: "Charmander", height: 6, types: ['fire']},
    { name: "Squirtle", height: 5, types: ['water']}
  ];

  // Public functions
  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  // Return an object with public functions
  return {
    getAll,
    add
  };
})();

// forEach loop to iterate over each Pokémon in the repository
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');

  if (pokemon.height > 5) {
    document.write('Wow, that\'s a big pokemon!');
  }

  document.write('<br>');
});
