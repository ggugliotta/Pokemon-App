let pokemonRepository = (function () {
    //wrapped pokemonList inside IIFE (Immediately Invoked Function Expression)
    let pokemonList = []

    let modalContainer = document.querySelector('#modal-container')

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

    function loadList() {
        //fetch data from api and add to pokemonList

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

    function getAllPokemon() {
        return pokemonList
    }

    function loadDetails(item) {
        //load data on individual pokemon
        return fetch(item.detailsUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (details) {
                //add the details to the item
                item.imageUrl = details.sprites.front_default
                item.height = details.height
                item.types = details.types
            })
            .catch(function (e) {
                console.error(e)
            })
    }

    function showDetails(pokemon) {
        //pokemon modal display
        loadDetails(pokemon).then(function () {
            showModal(pokemon)
        })
    }

    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container')

        // Clear all existing modal content
        modalContainer.innerHTML = ''

        let modal = document.createElement('div')
        modal.classList.add('modal')

        // Add the new modal content
        let closeButtonElement = document.createElement('button')
        closeButtonElement.classList.add('modal-close')
        closeButtonElement.innerText = 'Close'
        closeButtonElement.addEventListener('click', hideModal)

        let titleElement = document.createElement('h1')
        titleElement.innerText = pokemon.name

        let imageElement = document.createElement('img')
        imageElement.src = pokemon.imageUrl

        let heightElement = document.createElement('p')
        heightElement.innerText = `Height: ${pokemon.height}`

        let typesElement = document.createElement('p')
        typesElement.innerText = `Types: ${pokemon.types
            .map(({ type }) => type.name)
            .join(', ')}`

        modal.appendChild(closeButtonElement)
        modal.appendChild(titleElement)
        modal.appendChild(imageElement)
        modal.appendChild(heightElement)
        modal.appendChild(typesElement)
        modalContainer.appendChild(modal)

        modalContainer.classList.add('is-visible')

        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target
            if (target === modalContainer) {
                hideModal()
            }
        })
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container')
        modalContainer.classList.remove('is-visible')
    }

    function addListItem(pokemon) {
        // used to add pokemon to unordered list in HTML
        let pokemonList = document.querySelector('.pokemon-list')
        let listpokemon = document.createElement('li')
        listpokemon.classList.add('list-group-item', 'text-center', 'border-0')

        let button = document.createElement('button')

        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        })

        button.innerText = pokemon.name
        listpokemon.appendChild(button)
        pokemonList.appendChild(listpokemon)
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container')
        if (
            e.key === 'Escape' &&
            modalContainer.classList.contains('is-visible')
        ) {
            hideModal()
        }
    })

    // Return
    return {
        //returning functions so that they can be used outside of the IIFE
        add: add,
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
