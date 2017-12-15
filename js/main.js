let app = {
    URL: "https://api.themoviedb.org/3/",
    INPUT: null,
    init: function () {
        //fetch the config info
        let preview = document.querySelector('#moviess');
        preview.classList.add('not');
        let recResults = document.querySelector('#recommend-results');
        recResults.innerHTML = ""
        recResults.classList.remove('active');
        app.INPUT = document.getElementById("search-input");
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById("search-button");
        btn.addEventListener("click", app.runSearch);
        //listen for enter or return
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <return> or <enter>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });

    },
    runSearch: function (ev) {
        let section = document.querySelector('#search-results .content');
        section.innerHTML = "";
        section.classList.remove('active');
        let recResults = document.querySelector('#recommend-results');
        recResults.innerHTML = ""
        recResults.classList.remove('active');
        ev.preventDefault();
        if (app.INPUT.value) {
            //if they actually typed something other than <enter>
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value; //+"&page=4";

            // `${app.URL}search/movie?api_key=${KEY}&query=${app.INPUT.value}`

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data.results);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    showMovies: function (movies) {
        //navigate to the search-results page...
        let marcus = document.querySelector('#marcus');
        marcus.classList.add('not');
        let preview = document.querySelector('#search-results .content');
        preview.classList.remove('not');
        let h3= document.querySelector('#instructions');
        h3.classList.add('not');
        let recResults = document.querySelector('#recommend-results');
        recResults.innerHTML = ""
        recResults.classList.remove('active');
        let baseImageUrl = "https://image.tmdb.org/t/p/"
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";
        section.classList.remove ('active');
        let please_search = document.querySelector('#please-search');
        please_search.classList.add('not');
        movies.forEach(function (movie) {
            let div = document.createElement('div');
            div.setAttribute("data-movie", movie.id);
            console.log(movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            div.textContent = movie.title;
            let img = document.createElement('img');
            img.setAttribute("poster-movie", movie.poster_path);
            img.setAttribute("alt", "movie poster");
            img.src = "".concat(baseImageUrl, 'w500/', movie.poster_path);
            div.appendChild(img);
            img.classList.add('poster');
            let p = document.createElement('p');
            p.classList.add('movie-desc');
            p.textContent = movie.overview;
            div.appendChild(p);
            let p3 = document.createElement('p');
            p3.setAttribute("id", "p3");
            p3.classList.add('movie-desc');
            p3.textContent = "Release Date: " + movie.release_date;
            div.appendChild(p3);
            let p2 = document.createElement('p');
            p2.setAttribute("id", "p2");
            p2.classList.add('movie-desc');
            p2.textContent = "Average rating: " + movie.vote_average + "/10";
            div.appendChild(p2);
            df.appendChild(div);
        })
        section.appendChild(df);
    },

    getRecommended: function (ev) {
        let movie_id = ev.currentTarget.getAttribute("data-movie");
        let recommend = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY;
        fetch(recommend)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showRecommended(data.results);
                })
                .catch(err => {
                    console.log(err);
                });
    },
    showRecommended: function (movies) {
        //navigate to the search-results page...
        let h3= document.querySelector('#instructions');
        h3.classList.add('not');
        let section = document.querySelector('#search-results .content');
        section.innerHTML = "";
        section.classList.remove('active');
        let recResults = document.querySelector('#recommend-results');
        recResults.innerHTML = ""
        recResults.classList.add('active');
        let baseImageUrl = "https://image.tmdb.org/t/p/"
        let df = document.createDocumentFragment();
        movies.forEach(function (movie) {
            let div = document.createElement('div');
            div.setAttribute("data-movie", movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            div.textContent = movie.title;
            let img = document.createElement('img');
            img.setAttribute("poster-movie", movie.poster_path);
            img.setAttribute("alt", "movie poster");
            img.src = "".concat(baseImageUrl, 'w500/', movie.poster_path);
            div.appendChild(img);
            img.classList.add('poster');
            let p = document.createElement('p');
            p.classList.add('movie-desc');
            p.textContent = movie.overview;
            div.appendChild(p);
            df.appendChild(div);
            let p3 = document.createElement('p');
            p3.setAttribute("id", "p3");
            p3.classList.add('movie-desc');
            p3.textContent = "Release Date: " + movie.release_date;
            div.appendChild(p3);
            let p2 = document.createElement('p');
            p2.setAttribute("id", "p2");
            p2.classList.add('movie-desc');
            p2.textContent = "Average rating: " + movie.vote_average + "/10";
            div.appendChild(p2);
        })
        recResults.appendChild(df);
    },

};

document.addEventListener("DOMContentLoaded", app.init);
//wait for DOMContent loaded
//fetch the configuration info for image locations and sizes
//focus on the text field
//listen for click on the search button
//listen for keypress and <enter> or <return>

//after the click / <enter> press run a fetch
//results come back from fetch
//show the movie results page
//loop through the results and build <div>s.

//make something in the div clickable
//get the id from the clickable element
//fetch the recommendation based on the movie id
