let pokemonRepository = (function () {
    let t = []
    function e(e) {
        'object' == typeof e && 'name' in e
            ? t.push(e)
            : console.log('pokemon can not be pushed to pokemonList')
    }
    function n(t) {
        let e = document.querySelector('.list-group'),
            n = document.createElement('li')
        n.classList.add('list-group-item')
        let o = document.createElement('button')
        ;(o.innerText = t.name),
            o.classList.add('btn', 'btn-primary', 'w-100'),
            o.setAttribute('data-target', '#exampleModal'),
            o.setAttribute('data-toggle', 'modal'),
            e.appendChild(n),
            n.appendChild(o),
            o.addEventListener('click', function () {
                a(t)
            })
    }
    function o() {
        return t
    }
    function i() {
        fetch(vm.options.apiUrl + vm.options.urlEndpoint)
            .then((t) => t.json())
            .then((t) => displayMessage(JSON.stringify(t)))
            .catch((t) => {
                var e
                e
                    ? ($('#error').text(e), $('#error').removeClass('d-none'))
                    : $('#error').addClass('d-none')
            })
    }
    function r(t) {
        return fetch(t.detailsUrl)
            .then(function (t) {
                return t.json()
            })
            .then(function (e) {
                ;(t.imageUrl = e.sprites.front_default),
                    (t.height = e.height),
                    (t.weight = e.weight),
                    (t.abilities = e.abilities),
                    (t.types = e.types)
            })
            .catch(function (t) {
                console.error(t)
            })
    }
    function a(t) {
        r(t)
            .then(() => {
                var e
                let n
                ;(e = t),
                    $('.modal-title').text(e.name),
                    $('.img-fluid').attr({ src: e.imageUrl, alt: e.name }),
                    $('.pokemonHeight').text(`Height: ${e.height}`),
                    $('.pokemonWeight').text(`Weight: ${e.weight}`),
                    (n = e.types.map((t) => t.type.name).join(', ')),
                    $('.pokemonTypes').text(`Types: ${n}`)
            })
            .catch((t) => {
                console.error(t)
            })
    }
    function l() {
        document.querySelector('ul').firstChild.remove()
    }
    return {
        add: e,
        addListItem: n,
        loadList: function t() {
            let n
            return (
                (n = document.createElement('div')).classList.add('text-light'),
                document.querySelector('ul').appendChild(n),
                fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
                    .then(function (t) {
                        return t.json()
                    })
                    .then(function (t) {
                        l(),
                            t.results.forEach(function (t) {
                                e({ name: t.name, detailsUrl: t.url })
                            })
                    })
                    .catch(function (t) {
                        l(), console.error(t)
                    })
            )
        },
        getAllPokemon: o,
        loadDetails: r,
        showDetails: a,
        addListItem: n,
    }
})()
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAllPokemon().forEach(function (t) {
        pokemonRepository.addListItem(t)
    })
})
