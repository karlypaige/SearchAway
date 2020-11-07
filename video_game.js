favoriteVideoGame($('#user-favorite').val());
// Searched title
function favoriteVideoGame(userFavorite) {
    let title = userFavorite.trim().split(' ').join('+');

    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var id = 'grand-theft-auto-v'
    var gamesURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

    $.ajax({
        url: gamesURL,
        method: 'GET'
    }).then(function (responseFav) {
        console.log(responseFav);
        console.log(gamesURL);
        $('#favorite-title').text(responseFav.name);
        $('#favorite-poster').attr('src', responseFav.background_image).attr('alt', 'poster');
        $('#favorite-rating').append(responseFav.esrb_rating.name);
        $('#favorite-plot').text(responseFav.description_raw);
        $('#favorite-score').append(responseFav.rating);
        $('#favorite-full-url').attr('href', responseFav.website);
    })
}

videoGameRelated();

// Related title
function videoGameRelated() {
    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var id = 'grand-theft-auto-v'
    var gamesURL = 'https://api.rawg.io/api/games/' + id + '?key=' + apiKey;

    $.ajax({
        url: gamesURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(gamesURL);
        $('#video-game-title').text(response.name);
        $('#video-game-poster').attr('src', response.background_image).attr('alt', 'poster');
        $('#video-game-rating').append(response.esrb_rating.name);
        $('#video-game-plot').text(response.description_raw);
        $('#video-game-score').append(response.rating);
        $('#video-game-full-url').attr('href', response.website);
    })
}
