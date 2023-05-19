// pokemonRepository wrapped in IIFE
let pokemonRepository = (function () {
    let pokemonList = [] // empty array

    //External pokemon repository with 150 pokemons listed
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon)
        } else {
            console.log('pokemon is not correct')
        }
    }

    function getAll() {
        return pokemonList
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list')
        let listpokemon = document.createElement('li')
        listpokemon.classList.add('list-group-item')

        let button = document.createElement('button')

        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })

        button.innerText = pokemon.name
        listpokemon.appendChild(button)
        pokemonList.appendChild(listpokemon)
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    }
                    add(pokemon)
                })
            })
            .catch(function (e) {
                console.error(e)
            })
    }

    function loadDetails(item) {
        let url = item.detailsUrl
        return fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (details) {
                //add the details to the item
                item.imageUrl = details.sprites.front_default
                item.height = details.height
                item.types - details.types
                showModal(item)
            })
            .catch(function (e) {
                console.error(e)
            })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
    }

    let modalTitle = document.querySelector('#modal-title')

    //Modal with pokemon name, height, and image
    function showModal(pokemon) {
        //Adds Pokemon name to modal
        modalTitle.innerHTML = pokemon.name
        let modal = document.createElement('div')
        modal.classList.add('modal')

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        // Adds <img> of pokemon to modal
        let pokemonImage = document.querySelector('.pokemon-image')
        pokemonImage.src = item.imageUrl

        // Adds pokemon height to modal
        let pokemonHeight = document.querySelector('.pokemon-height')
        pokemonHeight.innerText = 'Height' + pokemon.height

        // Modal close button
        let closeButtonElement = document.createElement('button')
        closeButtonElement.classList.add('modal-close')
        closeButtonElement.innerText = 'X'
        closeButtonElement.addEventListener('click', hideModal)
    }

    // Hide Modal function
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container')
        modalContainer.classList.remove('is-visible')
        modalContainer.classList.add('modal')
        modalCloseButton.innerHTML = ''
    }

    window.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            modalContainer.classList.contains('is-visible')
        ) {
            hideModal()
        }

        modalContainer.addEventListener('click', (e) => {
            let target = e.target
            if (target === modalContainer) {
                hideModal()
            }

            // Return
            return {
                getALL: getAll,
                add: add,
                addListItem: addListItem,
                loadList: loadList,
                loadDetails: loadDetails,
                showDetails: showDetails,
                showModal: showModal,
            }
        })()

        pokemonRepository.loadList().then(
            (function () {
                pokemonRepository.getAll().forEach(function (pokemon) {
                    pokemonRepository.addListItem(pokemon)
                }())
            
}())
