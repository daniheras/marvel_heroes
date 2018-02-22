const privateKey = "";
const publicKey = "";
const content = document.getElementById('content');

const getConnection = (search) => {
    var ts = Date.now();
    var hash = MD5(ts + privateKey + publicKey);
    var URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&nameStartsWith=${search}`;

    app.heroes = [];
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                app.heroes.push(e);
            });
        })
}

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hulk',
        heroes: [],
        imagen: 'img/MarvelLogo.svg'
    },
    methods: {
        //This function executes the fetch to return the data from the api.
        search: function () {
            delay(function () {
                getConnection(app.message);
            }, 1000)
        },

        //This function returns the api provided image, if is not image returns a default image.
        getImage: function (heroe) {
            return (heroe.thumbnail.path.indexOf('image_not_available') > 0) ? './img/MarvelLogo.svg' : `${heroe.thumbnail.path}/portrait_uncanny.${heroe.thumbnail.extension}`;
        }
    }
})

getConnection(app.message);
