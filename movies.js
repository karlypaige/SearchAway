//test title var
let searchValue = "Moana";
let title = searchValue.trim().split(' ').join('+');
let favTitle, favPosterURL, favPlot, favRating, favScore;
var favGenre;
let genreNum;



function favoriteMovie() {

    //API Key
    let movieURL = "http://www.omdbapi.com/?t=" + title + "&apikey=c88e35f9";

    $.ajax({
        url: movieURL,
        method: "GET",
        error: function() {
            //console.log("error");
            return;
        }
    }).then(function(responseFav) {

        //If not a valid movie title
        if(responseFav.Response === "False"){
            //console.log("error");
        };

        //Add to Favorite Box
        //console.log(responseFav);
        
        //Title
        favTitle = responseFav.Title;
        $('#favorite-title').html(favTitle);

        //Poster
        favPosterURL = responseFav.Poster;
        $('#favorite-poster').attr('src', favPosterURL);

        //Rated
        favRating = responseFav.Rated;
        $('#favorite-rating').html(`Rated: ${favRating}`);
        
        //Plot
        favPlot = responseFav.Plot;
        $('#favorite-plot').html(favPlot);

        resultsMovie();
    });

};


function resultsMovie() {
    

    //Locate genre types
    let getMovieGenreNumURL = 'https://api.themoviedb.org/3/search/movie?query=' + title + '&api_key=d8731638c74bc1c4039ad5e0a50c36af';

    $.ajax({
        url: getMovieGenreNumURL,
        method: "GET"
    }).then(function(responseGenre) {
        //console.log(responseGenre.results[0].genre_ids);
        let movieGenres = responseGenre.results[0].genre_ids;
        let pickAGenre = Math.floor(Math.random() * movieGenres.length);
        let genreChosen = movieGenres[pickAGenre];
        //console.log(genreChosen);

        //Find Movies with this same genre id
        let findMovieRecsURL = 'https://api.themoviedb.org/3/discover/movie?with_genres=' + genreChosen + '&api_key=d8731638c74bc1c4039ad5e0a50c36af'

        $.ajax({
            url: findMovieRecsURL,
            method: "GET"
        }).then(function(responseRecommend) {
            //console.log(responseRecommend);
            //console.log(this);
            findAndUpdateMovie()

            function findAndUpdateMovie() {

            let allMovies = responseRecommend.results;
            let pickAMovie = Math.floor(Math.random() * allMovies.length);
            //console.log(pickAMovie);
            let getRandomMovie = allMovies[pickAMovie].title;
            //console.log(getRandomMovie);

            let movieResult = getRandomMovie.trim().split(' ').join('+');

            let recMovieURL = "http://www.omdbapi.com/?t=" + movieResult + "&apikey=c88e35f9";
            
            //Then add movie to html
            $.ajax({
                    url: recMovieURL,
                    method: "GET"
                }).then(function(responseResult) {
                    //If not a valid movie title
                    if(responseResult.Response === "False"){
                        findAndUpdateMovie();
                    };

                    //Add to Favorite Box
                    //console.log(responseResult);
                    
                    //Title
                    newMovieTitle = responseResult.Title;
                    $('#movie-title').html(newMovieTitle);

                    //Poster
                    newMoviePosterURL = responseResult.Poster;
                    $('#movie-poster').attr('src', newMoviePosterURL);

                    //Rated
                    newMovieRating = responseResult.Rated;
                    $('#movie-rating').html(`Rated: ${newMovieRating}`);
                    
                    //Plot
                    newMoviePlot = responseResult.Plot;
                    $('#movie-plot').html(newMoviePlot);
                });
            };

        });

    });    

  

};

favoriteMovie();


//omdb is not case sensitive