let modalContainer = document.querySelector('#modal-container');

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
        hideLoadingMessage();
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

        // Fetch additional details including description
        let speciesUrl = details.species.url;
        return fetch(speciesUrl);
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (species) {
        item.description = species.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        ).flavor_text.replace(/[\n\f\r\v]/g, " ");
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      openModal(pokemon);
    });
  }

  function openModal(pokemon) {
    modalContainer.innerHTML = '';

    modalContainer.classList.add('is-visible');

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

    let descriptionElement = document.createElement('p');
    descriptionElement.innerText = `Description: ${pokemon.description}`;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = pokemon.name;

    modalContent.appendChild(closeButton);
    modalContent.appendChild(nameElement);
    modalContent.appendChild(heightElement);
    modalContent.appendChild(descriptionElement);
    modalContent.appendChild(imageElement);

    modal.appendChild(modalContent);

    modalContainer.appendChild(modal);

    modalContainer.style.display = 'block';

    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function closeModal() {
    modalContainer.style.display = 'none';
  }

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
    showDetails: showDetails,
    openModal: openModal,
    closeModal: closeModal
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
