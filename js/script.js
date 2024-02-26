let modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
document.body.appendChild(modalContainer);

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=40";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage(); // hide loading message even in case of an error
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage(); // hide loading message even in case of an error
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      openModal(pokemon); // Use openModal to display details
    });
  }

  // Add openModal functions
  function openModal(pokemon) {
    // Clear existing content
    modalContainer.innerHTML = '';

    // Create modal content
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    let closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', closeModal);

    let nameElement = document.createElement('h2');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${pokemon.height} m`;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = pokemon.name;

    // Append elements to modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(nameElement);
    modalContent.appendChild(heightElement);
    modalContent.appendChild(imageElement);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Append modal to modal container
    modalContainer.appendChild(modal);

    // Display modal
    modalContainer.style.display = 'block';

    // Close modal on background click
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    // Close modal on Esc key press
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function closeModal() {
    modalContainer.style.display = 'none';
  }
  // End of added functions

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // Adding event listener to the button
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function showLoadingMessage() {
  document.getElementById("loadingMessage").style.display = "block";
}

function hideLoadingMessage() {
  document.getElementById("loadingMessage").style.display = "none";
}
