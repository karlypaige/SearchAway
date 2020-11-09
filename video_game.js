// favoriteVideoGame($('#user-favorite').val());
// Searched title
function favoriteVideoGame(userFavorite, newSearch) {
    let title = userFavorite.trim().split(' ').join('+');

    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var gamesURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

    // Populate searched title info
    $.ajax({
        url: gamesURL,
        method: 'GET',
        error: function () {
            console.log('video_game.js favoriteVideoGame function returning error');
            return;
        }
    }).then(function (responseFav) {

        // Display info at top of page for searched title (favorite box)
        $('#favorite-title').text(responseFav.name);
        $('#favorite-poster').attr('src', responseFav.background_image).attr('alt', 'poster');
        $('#favorite-rating').append(responseFav.esrb_rating.name);
        $('#favorite-plot').text(responseFav.description_raw);
        $('#favorite-score').append(responseFav.rating);
        $('#favorite-full-url').attr('href', responseFav.website);

        // Takes 1 genre from this title and uses it to create recommendations
        // for books, anime, video game and movie
        if (newSearch) {
            pickGenreFromVideoGame(title);
        };
    })
}

// If a video game was searched, pick a genre from that title
function pickGenreFromVideoGame(title) {

    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var gamesURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

    $.ajax({
        url: gamesURL,
        method: "GET"
    }).then(function (responseGenre) {
        // Specific tags for this title (tags = genre)
        let videoGameGenre = responseGenre.tags;
        // Pick 1 genre from videoGameGenre array
        let pickAGenre = Math.floor(Math.random() * videoGameGenre.length);
        let genreChosen = videoGameGenre[pickAGenre].slug;
        console.log('Chosen genre: ' + genreChosen);
        var includeGenreSlugs = ['sci-fi', 'horror', 'funny', 'fantasy', 'gore', 'comedy', 'violent'];

        // Call recommended video game to results
        resultsVideoGame(genreChosen);

    });

};
// UNDER CONSTUCTION BEGIN //
// If a book, movie or anime was searched, pick a genre from that title 
// function pickGenreFromVideoGame(title) {

//     var apiKey = '2838144f3f40444caa2964cbb3316b1f';
//     var gamesURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

//     $.ajax({
//         url: gamesURL,
//         method: "GET"
//     }).then(function (responseGenre) {
//         // Specific tags for this title (tags = genre)
//         let videoGameGenre = responseGenre.tags;
//         // Pick 1 genre from videoGameGenre array
//         let pickAGenre = Math.floor(Math.random() * videoGameGenre.length);
//         let genreChosen = videoGameGenre[pickAGenre].slug;
//         console.log('Chosen genre: ' + genreChosen);
//         var includeGenreSlugs = ['sci-fi', 'horror', 'funny', 'fantasy', 'gore', 'comedy', 'violent'];

//         // Call recommended video game to results
//         resultsVideoGame(genreChosen);

//     });

// };
// UNDER CONSTUCTION END //

// Populates related video game title
function resultsVideoGame(genreChosen) {
    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    // Go to genre database
    var genreUrl = 'https://api.rawg.io/api/games?genre=' + genreChosen + '?key=' + apiKey;

    $.ajax({
        url: genreUrl,
        method: 'GET'
    }).then(function (response) {
        // Pick random title 
        let titles = response.results;
        let pickTitle = Math.floor(Math.random() * titles.length);

        // Populate recommened video game section with this title's info
        var title = response.results[pickTitle].slug;
        var apiKey = '2838144f3f40444caa2964cbb3316b1f';
        var titleURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;
        console.log('Recommended video game url'+titleURL);
        $.ajax({
            url: titleURL,
            method: 'GET'
        }).then(function (response) {
            $('#video-game-title').text(response.name);
            $('#video-game-poster').attr('src', response.background_image).attr('alt', 'poster');
            $('#video-game-rating').text('Rated: ' + response.esrb_rating.name);
            $('#video-game-plot').text(response.description_raw);
            $('#video-game-score').text('Score: ' + response.rating);
            $('#video-game-full-url').attr('href', response.website);
        })
    })
}