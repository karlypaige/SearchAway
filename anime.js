var searchQuery

function favoriteAnime(userFavorite) {
    var searchQuery = userFavorite.trim();
    var url = "https://api.jikan.moe/v3/search/anime?q=" + searchQuery;
    let favTitle, favPosterURL, favPlot, favRating, favScore;


    $.ajax({
        url: url,
        method: "GET",
        error: function() {
            //console.log("error");
            return;
        }
    }).then(function(responseFav) {
        if(responseFav.Response === "False"){
            console.log("error");
        };

            //Add to Favorite Box
            // console.log(responseFav);

            //Title
            favTitle = responseFav.results[0].title;
            $('#favorite-title').html(favTitle);

            //Poster
            favPosterURL = responseFav.results[0].image_url;
            $('#favorite-poster').attr('src', favPosterURL);

            //Rated
            favRating = responseFav.results[0].rated;
            $('#favorite-rating').html(`Rated: ${favRating}`);

            //Plot
            favPlot = responseFav.results[0].synopsis;
            $('#favorite-plot').html(favPlot);

            //Score
            favScore = responseFav.results[0].score;
            $('#favorite-score').html(`MyAnimeList Rating: ${favScore}`);

            //Outbound URL
            favURL = responseFav.results[0].url;
            $('#favorite-full-url').attr("href", favURL);            

            //Genre
            favGenre = responseFav.results[0].image_url;
            console.log(favGenre);

    });
};
