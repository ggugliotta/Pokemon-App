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
                item.weight = details.weight
                item.attribute = details.attributes
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
        let modalBody = $('.modal-body')
        let modalTitle = $('.modal-title')
        let modalHeader = $('.modal-header')
        roll = $('.modal-dialog', 'document')
        arialabelledby = $('.modal-title')

        // Clear all existing modal content
        modalTitle.empty()
        modalBody.empty()
        //modalHeader.empty(); Why is this one commented out?

        modal.classList.add('modal')

        // Add the new modal content
        let closeButtonElement = $(btn - primary)
        closeButtonElement.classList.add('modal-close')
        closeButtonElement.innerText = 'Close'
        closeButtonElement.addEventListener('click', hideModal)

        //creating element for name in modal content
        let nameElement = $('<h1>' + pokemon.name + '</h1>')

        // //creating img in modal content
        let imageElementFront = $('<img class = "modal-img" style="width:50%">')
        imageElementFront.attr('src', pokemon.imageUrlFront)
        let imageElementBack = $('<img class="modal-img" style="width:50%">')
        imageElementBack.attr('src', pokemon.imageUrlBack)

        // //creating element for height in modal content
        let heightElement = $('<p>' + 'height : ' + item.height + '</p>')

        // //creating element for weight in modal content
        let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>')

        // //creating element for type in modal content
        let typesElement = $('<p>' + 'types : ' + item.types + '</p>')

        // //creating element for abilities in modal content
        let abilitiesElement = $(
            '<p>' + 'abilities : ' + item.abilities + '</p>'
        )
    }

    modalTitle.append(nameElement)
    modalBody.append(imageElementFront)
    modalBody.append(imageElementBack)
    modalBody.append(heightElement)
    modalBody.append(weightElement)
    modalBody.append(typesElement)
    modalBody.append(abilitiesElement)

    modal.classList.add('is-visible')

    modal.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target
        if (target === modal) {
            hideModal()
        }
    })

    function addListItem(pokemon) {
        // used to add pokemon to unordered list in HTML
        let pokemonList = document.querySelector('.pokemon-list')
        let listpokemon = document.createElement('li')
        listpokemon.classList.add('list-group-item', 'text-center', 'border-0')
        let button = document.createElement('button')
        button.innerText = pokemon.name
        button.classList.add('btn', 'btn-primary')
        button.setAttribute('data-target')
        button.setAttribute('data-toggle', 'modal')

        btn.addEventListener('click', function (event) {
            showDetails(pokemon)
        })
    }

    window.addEventListener('keydown', (e) => {
        let modal = document.querySelector('#modal')
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
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
