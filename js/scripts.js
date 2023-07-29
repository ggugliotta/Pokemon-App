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
        let button = document.createElement('button')
        button.innerText = pokemon.name
        button.classList.add('btn', 'btn-primary', 'w-100')
        button.setAttribute('data-target', '#modal-container')
        button.setAttribute('data-toggle', 'modal')
    }

    function getAllPokemon() {
        return pokemonList
    }

    showLoadingMessage()

    function loadList() {
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
                        height: item.height,
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

    function loadDetails(item) {
        //load data on individual pokemon
        let detailUrl = pokemon.detailsUrl
        return fetch(item.detailsUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (details) {
                //add the details to the item
                pokemonName = details.name
                pokemonImageUrl = details.sprites.front_default
                pokemonHeight = details.height
                pokemonWeight = details.weight
                pokemonAbilities = details.abilities
                pokemonTypes = details.types
            })
            .catch(function (e) {
                console.error(e)
            })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
            .then(() => {
                showModal(pokemonName)
                return pokemon
            })
            .catch(() => {})
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

    function showModal() {
        let modalBody = $('.modal-body')
        let modalTitle = $('.modal-title')
        let modalHeader = $('.modal-header')
        roll = $('.modal-dialog', 'document')
        arialabelledby = $('.modal-title')

        // Clear all existing modal content
        modalTitle.empty()
        modalBody.empty()

        modal.classList.add('modal')

        // Add the new modal content
        let closeButtonElement = $(btn - primary)
        closeButtonElement.classList.add('modal-close')
        closeButtonElement.innerText = 'Close'
        closeButtonElement.addEventListener('click', hideModal)

        //creating element for name in modal content
        let nameElement = $('<h1>' + pokemonName + '</h1>')

        // //creating img in modal content
        let imageElementFront = $('<img class = "modal-img" style="width:50%">')
        imageElementFront.attr('src', pokemonImageUrl)
        let imageElementBack = $('<img class="modal-img" style="width:50%">')
        imageElementBack.attr('src', pokemonImageUrl)

        // //creating element for height in modal content
        let heightElement = $('<p>' + 'height : ' + pokemonHeight + '</p>')

        // //creating element for weight in modal content
        let weightElement = $('<p>' + 'weight : ' + pokemonWeight + '</p>')

        // //creating element for type in modal content
        let typesElement = $('<p>' + 'types : ' + pokemonTypes + '</p>')

        // //creating element for abilities in modal content
        let abilitiesElement = $(
            '<p>' + 'abilities : ' + pokemonAbilities + '</p>'
        )

        modalTitle.append(nameElement)
        modalBody.append(imageElementFront)
        modalBody.append(imageElementBack)
        modalBody.append(heightElement)
        modalBody.append(weightElement)
        modalBody.append(typesElement)
        modalBody.append(abilitiesElement)
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
