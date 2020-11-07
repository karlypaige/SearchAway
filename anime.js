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

        $.ajax({
            url: "https://api.jikan.moe/v3/anime/"+responseFav.results[0].mal_id,
            method: "GET",
        }).then(function(response) {

            //Add to Favorite Box
            // console.log(responseFav);

            //Title
            favTitle = response.title;
            $('#favorite-title').html(favTitle);

            //Poster
            favPosterURL = response.image_url;
            $('#favorite-poster').attr('src', favPosterURL);

            //Rated
            favRating = response.rating;
            $('#favorite-rating').html(`Rated: ${favRating}`);

            //Plot
            favPlot = response.synopsis;
            $('#favorite-plot').html(favPlot);

            //Score
            favScore = response.score;
            $('#favorite-score').html(`MyAnimeList Rating: ${favScore}`);

            //Outbound URL
            favURL = response.url;
            $('#favorite-full-url').attr("href", favURL);            

            //Genre
            favGenre = response.genres;
            console.log(favGenre);
            });

        
    });
};
