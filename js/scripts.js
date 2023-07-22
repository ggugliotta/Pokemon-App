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
        showLoadingMessage()
    }

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

    function getAllPokemon() {
        //return pokemonList
        return pokemonList
    }

    function loadDetails(item) {
        //load data on individual pokemon
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
        //pokemon modal display
        loadDetails(pokemon).then(function () {
            let body = document.querySelector('body')
            $(body).addClass('modal-open')

            console.log(pokemon)

            modalContainer.innerHTML = ''

            let modal = document.createElement('div')
            modal.classList.add('modal')

            let closeButtonElement = document.createElement('button')
            closeButtonElement.classList.add('modal-close')
            closeButtonElement.innerText = 'Close'
            closeButtonElement.addEventListener('click', hideModal)

            let titleElement = document.createElement('h1')
            titleElement.innerText = '${pokemon.name}'

            let spriteElement = document.createElement('img')
            spriteElement.src = pokemon.imageUrl

            let contentElement = document.createElement('p')
            if (pokemon.length > 1) {
                ;(contentElement.innerText = Height), $(Height(pokemon.height))
            } else {
                contentElement.innerText = pokemon.height
            }
        })

        modalContent.appendChild(closeButtonElement)
        modalContent.appendChild(titleElement)
        modalContent.appendChild(spriteElement)
        modalContent.appendChild(contentElement)
        modalDialog.appendChild(modalContent)
        modalContainer.appendChild(modalDialog)

        modalContainer.classList.add('is-visible')
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible')
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal()
    })

    function addListItem(pokemon) {
        // used to add pokemon to unordered list in HTML
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

    window.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            modalContainer.classList.contains('is-visible')
        ) {
            hideModal()
        }
    })

    modalContainer.addEventListener('click', (e) => {
        let target = e.target
        if (target === modalContainer) {
            hideModal()
        }
    })

    // Return
    return {
        //returning functions so that they can be used outside of the IIFE
        getALL: getAll,
        add: add,
        loadList: loadList,
        getAllPokemon: getAllPokemon,
        loadDetails: loadDetails,
        showDetails: showDetails,
        hideDetails: hideDetails,
        showModal: showModal,
    }

    pokemonRepository.loadList().then(function () {
        pokemonRepository.getAllPokemon.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon)
        })
    })
})()
