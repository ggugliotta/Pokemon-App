let pokemonRepository = (function () {
    //wrapped pokemonList inside IIFE (Immediately Invoked Function Expression)
    let pokemonList = []

    //External pokemon repository with 150 pokemons listed
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

    function add(pokemon) {
        //function used to add new pokemon to the pokemonList
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon)
        } else {
            console.log('pokemon can not be pushed to pokemonList')
        }
    }

    function addListItem(pokemon) {
        // used to add pokemon to unordered list in HTML
        let pokemonList = document.querySelector('.list-group')

        let listItem = document.createElement('li')
        listItem.classList.add('list-group-item')

        let button = document.createElement('button')
        button.innerText = pokemon.name
        button.classList.add('btn', 'btn-primary', 'w-100')
        button.setAttribute('data-target', '#exampleModal')
        button.setAttribute('data-toggle', 'modal')

        pokemonList.appendChild(listItem);
        listItem.appendChild(button);

        //When user clicks on pokemon, show details
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function getAllPokemon() {
        return pokemonList
    }

    function loadList() {
        showLoadingMessage()

        //fetch data from api and add to pokemonList
        return fetch(apiUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                hideLoadingMessage()
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    }
                    add(pokemon)
                })
            })
            .catch(function (e) {
                hideLoadingMessage()
                console.error(e)
            })
    }

    function get() {
        fetch(vm.options.apiUrl + vm.options.urlEndpoint)
            .then((response) => response.json())
            .then((data) => displayMessage(JSON.stringify(data)))
            .catch((error) => {
                displayError()
            })
    }

    function displayError(msg) {
        if (msg) {
            $('#error').text(msg)
            $('#error').removeClass('d-none')
        } else {
            $('#error').addClass('d-none')
        }
    }

    function loadDetails(pokemon) {
        //load data on individual pokemon
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json()
            })
            .then(function (details) {
                //add the details to the item
                pokemon.imageUrl = details.sprites.front_default
                pokemon.height = details.height
                pokemon.weight = details.weight
                pokemon.abilities = details.abilities
                pokemon.types = details.types
            })
            .catch(function (e) {
                console.error(e)
            })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
                showModal(pokemon)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    function showLoadingMessage() {
        let loadingDiv = document.createElement('div')
        loadingDiv.classList.add('text-light')
        let pokemonUL = document.querySelector('ul')
        pokemonUL.appendChild(loadingDiv)
    }

    function hideLoadingMessage() {
        let pokemonUL = document.querySelector('ul')
        pokemonUL.firstChild.remove()
    }

    function showModal(pokemon) {
        $('.modal-title').text(pokemon.name);

        $('.img-fluid').attr({
            src: pokemon.imageUrl,
            alt: pokemon.name
        });

        $('.pokemonHeight').text(`Height: ${pokemon.height}`)
        $('.pokemonWeight').text(`Height: ${pokemon.weight}`)

        let types = pokemon.types.map(item => item.type.name).join(', ');
        $('.pokemonTypes').text(`Types: ${types}`)
    }

    // Return
    return {
        //returning functions so that they can be used outside of the IIFE
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        getAllPokemon: getAllPokemon,
        loadDetails: loadDetails,
        showDetails: showDetails,
        addListItem: addListItem,
    }
})()

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAllPokemon().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    })
})
