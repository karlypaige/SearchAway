var searchQuery
var queryAnimeID
// let allGenreArray = ['action','adventure','comedy','crime','drama','family','fantasy','history','horror','mystery','romance','science-fiction','thriller','war','western'];

function favoriteAnime(userFavorite) {
    var searchQuery = userFavorite.trim();
    var url = "https://api.jikan.moe/v3/search/anime?q=" + searchQuery;
    let favTitle, favPosterURL, favPlot, favRating, favScore, favURL, favGenre;


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
        queryAnimeID = responseFav.results[0].mal_id;
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
            let animeGenreArray = [];
            for (var i=0; i<response.genres.length; i++){
                let selectedGenre = response.genres[i].mal_id;
                animeGenreArray.push(selectedGenre);
            }
            // console.log(animeGenreArray);

            pickGenreFromAnime(animeGenreArray);
        });       
    });
};


function pickGenreFromAnime(animeGenreArray) {

    let animeGenres = animeGenreArray;
    let pickAGenre = Math.floor(Math.random() * animeGenres.length);
    let genreChosen = animeGenres[pickAGenre];
    var genreConvert
    console.log ("genreChosen"+genreChosen)
    switch (genreChosen){
        case 1:
            console.log("Action was Chosen")
            genreConvert = 0;
            break;
        case 2:
            genreConvert = 1;
            break;
        case 3:
            pickGenreFromAnime(animeGenres);
            break;
        case 4:
            genreConvert = 2;
            break;
        case 5:
            pickGenreFromAnime(animeGenres);
            break;
        case 6:
            genreConvert = 6;
            break;
        case 7:
            genreConvert = 9;
            break;
        case 8:
            genreConvert = 4;
            break;
        case 9:
            pickGenreFromAnime(animeGenres);
            break;
        case 10:
            genreConvert = 6;
            break;
        case 11:
            pickGenreFromAnime(animeGenres);
            break;
        case 12:
            pickGenreFromAnime(animeGenres);
            break;
        case 13:
            genreConvert = 7;
            break;
        case 14:
            genreConvert = 8;
            break;
        case 15:
            genreConvert = 5;
            break;
        case 16:
            genreConvert = 6;
            break;
        case 17:
            pickGenreFromAnime(animeGenres);
            break;
        case 18:
            genreConvert = 11;
            break;
        case 19:
            pickGenreFromAnime(animeGenres);
            break;
        case 20:
            genreConvert = 2;
            break;
        case 21:
            pickGenreFromAnime(animeGenres);
            break;
        case 22:
            genreConvert = 10;
            break;
        case 23:
            pickGenreFromAnime(animeGenres);
            break;
        case 24:
            genreConvert = 11;
            break;
        case 25:
            genreConvert = 10;
            break;
        case 26:
            genreConvert = 10;
            break;
        case 27:
            pickGenreFromAnime(animeGenres);
            break;
        case 28:
            genreConvert = 10;
            break;
        case 29:
            genreConvert = 11;
            break;
        case 30:
            pickGenreFromAnime(animeGenres);
            break;
        case 31:
            pickGenreFromAnime(animeGenres);
            break;
        case 32:
            genreConvert = 6;
            break;
        case 33:
            pickGenreFromAnime(animeGenres);
            break;
        case 34:
            pickGenreFromAnime(animeGenres);
            break;
        case 35:
            pickGenreFromAnime(animeGenres);
            break;
        case 36:
            pickGenreFromAnime(animeGenres);
            break;
        case 37:
            genreConvert = 6;
            break;
        case 38:
            genreConvert = 13;
            break;
        case 39:
            genreConvert = 3;
            break;
        case 40:
            genreConvert = 8;
            break;
        case 41:
            genreConvert = 12;
            break;
        case 42:
            pickGenreFromAnime(animeGenres);
            break;
        case 43:
            pickGenreFromAnime(animeGenres);
            break;
    };
    console.log ("switch first"+genreConvert)            
    genreConvertID(genreConvert);
};

function genreConvertID(genreConvert){
    if (genreConvert !== NaN){
        var genreID
        switch (genreConvert){
            case 0:
                genreID = 1;
                break;
            case 1:
                genreID = 2;
                break;
            case 2:
                genreID = 4;
                break;
            case 3:
                genreID = 39;
                break;
            case 4:
                genreID = 8;
                break;
            case 5:
                genreID = 15;
                break;
            case 6:
                genreID = 10;
                break;
            case 7:
                genreID = 13;
                break;
            case 8:
                genreID = 14;
                break;
            case 9:
                genreID = 7;
                break;
            case 10:
                genreID = 22;
                break;
            case 11:
                genreID = 24;
                break;
            case 12:
                genreID = 41;
                break;
            case 13:
                genreID = 38;
                break;
            case 14:
                genreID = 21;
                break;
        };
    animeResult(genreID);
    };
};



function animeResult(genreID){        
    $.ajax({
        url: "https://api.jikan.moe/v3/search/anime?genre="+genreID+"&order_by=score&limit=20",
        method: "GET",
    }).then(function(resultResponse) {
        if(resultResponse === "False"){
            console.log("error");
        };
        let randomNumber = Math.floor(Math.random() * Math.floor(20));
        if (resultResponse.results[randomNumber].mal_id===queryAnimeID){
            randomNumber = Math.floor(Math.random() * Math.floor(20));
        }
        $.ajax({
            url: "https://api.jikan.moe/v3/anime/"+resultResponse.results[randomNumber].mal_id,
            method: "GET",
        }).then(function(response) {
            fillAnimeSlot(response);
        });
    });
};

function fillAnimeSlot(response){
    //Title
    animeTitle = response.title;
    $('#anime-title').html(animeTitle);

    //Poster
    animePosterURL = response.image_url;
    $('#anime-poster').attr('src',animePosterURL);

    //Rated
    animeRating = response.rating;
    $('#anime-rating').html(`Rated: ${animeRating}`);

    //Plot
    animePlot = response.synopsis;
    $('#anime-plot').html(animePlot);

    //Score
    animeScore = response.score;
    $('#anime-score').html(`MyAnimeListRating: ${animeScore}`);

    //Outbound URL
    animeURL = response.url;
    $('#anime-full-url').attr("href", animeURL);
}