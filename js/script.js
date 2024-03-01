let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=42";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // To add, append elements (li & button) and event listener.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let li = document.createElement("li");
    li.classList.add("col-12", "col-md-4", "mb-2");
    pokemonList.appendChild(li);

    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    li.appendChild(button);
    button.classList.add(
      "btn",
      "btn-success",
      "btn-block",
      "btn-lg",
      "w-100",
      "mb-3"
    );
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    addEventListenerToButton(button, pokemon);
  }
  function addEventListenerToButton(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
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
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Details we want to add
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.types = details.types;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  let modal = document.querySelector(".modal");

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalHeader = document.querySelector(".modal-header");
    modalBody.innerHTML = "";

    let modalTitle = document.querySelector(".modal-title");
    var capitalizedName = pokemon.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    modalTitle.innerHTML = capitalizedName;

    let closeButtonElement = document.querySelector(".close");

    let imageFront = document.createElement("img");
    imageFront.classList.add("modal-img");
    imageFront.src = pokemon.imageUrlFront;
    imageFront.alt = "Front image of " + pokemon.name;

    let imageBack = document.createElement("img");
    imageBack.classList.add("modal-img");
    imageBack.src = pokemon.imageUrlBack;
    imageBack.alt = "Back image of " + pokemon.name;

    let typesElement = document.createElement("p");
    let types = [pokemon.types[0].type.name];
    for (let i = 1; i < pokemon.types.length; i++) {
      types.push(", " + pokemon.types[i].type.name);
    }
    typesElement.innerHTML = "Types: " + types.join("");

    let heightElement = document.createElement("p");
    heightElement.innerHTML = "Height: " + pokemon.height;

    let weigthElement = document.createElement("p");
    weigthElement.innerHTML = "Weigth: " + pokemon.weight;

    let abilities = document.createElement("p");
    let abilitiesList = [pokemon.abilities[0].ability.name];
    for (let i = 1; i < pokemon.abilities.length; i++) {
      abilitiesList.push(", " + pokemon.abilities[i].ability.name);
    }
    abilities.innerHTML = "Abilities: " + abilitiesList.join("");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButtonElement);
    modalBody.appendChild(imageFront);
    modalBody.appendChild(imageBack);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weigthElement);
    modalBody.appendChild(abilities);
  }

  function hideModal() {
    modal.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-visible")) {
      hideModal();
    }
  });
  modal.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modal) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
