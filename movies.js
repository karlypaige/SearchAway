//Genre arrays
let movieGenreArray = [28,12,35,80,18,10751,14,36,27,10402,9648,10749,878,53,10752,37];



//This will run to display the movie in the favorite section
function favoriteMovie(userFavorite,newSearch) {
    //omdb is not case sensitive; just trim and replace spaces with pluses
    let title = userFavorite.trim().split(' ').join('+');

    //Variables for the contents
    let favTitle, favPosterURL, favPlot, favRating, favScore;

    //API Key for omdb
    let movieURL = 'https://www.omdbapi.com/?t=' + title + '&apikey=c88e35f9';

    //Call API for movie data (title, poster, plot, rating, score)
    $.ajax({
        url: movieURL,
        method: 'GET',
        error: function() {
            console.log("error with api call")
            return;
        }
    }).then(function(responseFav) {

        //If not a valid movie title, display the error message
        if(responseFav.Response === 'False'){
            $('.search-section').removeClass('hidden');
            $('.results-section').addClass('hidden');
            $('#title-error').removeClass('hidden');
            return;
        };

        //Add to Favorite section       
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
        //Score (movie score = imdbRating)
        favScore = responseFav.imdbRating;
        $('#favorite-score').html(`imdbRating: ${favScore}`);
        //URL
        favImdbURL = "https://www.imdb.com/title/" + responseFav.imdbID;
        $('#favorite-full-url').attr('href',favImdbURL);

        //If a new search, find a result (if not a new search, will want to display saved result from local storage- separate function)
        if(newSearch){
            pickGenreFromMovie(title);
        };
    });
};


//This is to pick a genre so that a new movie result can be selected into the movie result section
function pickGenreFromMovie(title) {
    
    //themoviedb API to pick a genre
    let getMovieGenreNumURL = 'https://api.themoviedb.org/3/search/movie?query=' + title + '&api_key=d8731638c74bc1c4039ad5e0a50c36af';

    $.ajax({
        url: getMovieGenreNumURL,
        method: "GET",
        error: function() {
            console.log("error with api call")
            return;
        }
    }).then(function(responseGenre) {

        //Take all genres from the movie, and pick one to use
        let movieGenres = responseGenre.results[0].genre_ids;
        findMovie(movieGenres);

        //Picks one genre to pass
        let pickAGenre = Math.floor(Math.random() * movieGenres.length);
        let genreChosen = movieGenreArray.indexOf(movieGenres[pickAGenre]);

        //If the genre is not in the 
        while(genreChosen === -1){
            pickAGenre = Math.floor(Math.random() * movieGenres.length);
            genreChosen = movieGenreArray.indexOf(movieGenres[pickAGenre]);
        };

        let genrePass = allGenreArray[genreChosen];


        //for loop if multiple
        //if statement
       

        //Pass genre to other medias
        //add books function (pass genre)
        //add videogames function (pass genre)
        //add anime function (pass genre)

    });    
};


//This will have a new movie generated to be displayed
function findMovie(genreChosen){
    //Find Movies with this same genre id
    let findMovieRecsURL = 'https://api.themoviedb.org/3/discover/movie?with_genres=' + genreChosen + '&api_key=d8731638c74bc1c4039ad5e0a50c36af'

    $.ajax({
         url: findMovieRecsURL,
         method: "GET"
    }).then(function(responseRecommend) {
        
         //This will call the following function to pick a movie from the results returned
        findAndUpdateMovie();

        function findAndUpdateMovie() {

            //Picks a movie result
            let allMovies = responseRecommend.results;
            let pickAMovie = Math.floor(Math.random() * allMovies.length);
            let getRandomMovie = allMovies[pickAMovie].title;

            //Uses the movie result to pull movie data from omdb
            let movieResult = getRandomMovie.trim().split(' ').join('+');
            let recMovieURL = "https://www.omdbapi.com/?t=" + movieResult + "&apikey=c88e35f9";
            
            $.ajax({
                    url: recMovieURL,
                    method: "GET"
            }).then(function(responseNew) {
                //If the movie title does not appear to be valid, pick a different movie result
                if(responseNew.Response === "False"){
                    findAndUpdateMovie();
                };

                //If mature box isn't checked, don't include rated R or TV-MA movies (find new movie otherwise)
                if($('#mature').prop('checked') === false){
                    if(responseNew.Rated === "R" || responseNew.Rated === "TV-MA")
                    findAndUpdateMovie();
                };

                //Calls function to display the result
                movieResultSection(responseNew);
            });
        };
    });
};


//This will finally display the data from the movie in the results section
function movieResultSection(response) {
    //Title
    let newMovieTitle = response.Title;
    $('#movie-title').html(newMovieTitle);
    
    //Pass this title in case it needs to be saved to local storage
    results("movie", newMovieTitle);

    //Poster
    let newMoviePosterURL = response.Poster;
    $('#movie-poster').attr('src', newMoviePosterURL);

    //Rated
    let newMovieRating = response.Rated;
    $('#movie-rating').html(`Rated: ${newMovieRating}`);
    
    //Plot
    let newMoviePlot = response.Plot;
    $('#movie-plot').html(newMoviePlot);

    //Score
    let newMovieScore = response.imdbRating;
    $('#movie-score').html(`imdbRating: ${newMovieScore}`);

    //URL
    newImdbURL = "https://www.imdb.com/title/" + response.imdbID;
    $('#movie-url').attr('href',newImdbURL);
};


//This will take the genre passed from one media so that a movie result may be displayed  
function movieFromOtherMedia(useGenre) {

    //Take the genre from the media that was passed
    let passedGenre = allGenreArray.indexOf(useGenre);

    //Compare that genre index to my movie genre index
    let newGenre = movieGenreArray[passedGenre];

    //Find movie
    findMovie(newGenre);
};


//This will display the movie result that was saved to a button from local storage
function displaySavedMovieResult(savedMovie){

    let movieResult = savedMovie.trim().split(' ').join('+');
    let recMovieURL = "https://www.omdbapi.com/?t=" + movieResult + "&apikey=c88e35f9";

    $.ajax({
        url: recMovieURL,
        method: "GET"
    }).then(function(responseResult) {
        //Call function to display the results
        movieResultSection(responseResult);
        
    });
};
