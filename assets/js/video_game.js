$(document).foundation();

// Searched title from main page
var maturityFlag = false;
function favoriteVideoGame(userFavorite, newSearch) {
    // Trims title into workable slug
    let title = userFavorite.trim().split(' ').join('-').replace(':', '');

    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var gamesURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

    // Populate searched title info
    $.ajax({
        url: gamesURL,
        method: 'GET',
        error: function () {
            console.log('favoriteVideoGame function returning error');
            return;
        }
    }).then(function (response) {
        $('#video-game-spinner').hide();

        // Display info at top of page for searched title (favorite box)
        // Title
        $('#favorite-title').text(response.name);

        // Poster
        $('#favorite-poster').attr('src', response.background_image).attr('alt', 'poster');

        // ESRB rating
        if (response.esrb_rating !== null) {
            $('#favorite-rating').text('Rated: ' + response.esrb_rating.name);
        } else {
            $('#favorite-rating').text('Rated: unrated');
        }

        // Description
        if (response.description_raw !== null) {
            $('#favorite-plot').text(response.description_raw);
        } else {
            $('#favorite-plot').text('No plot available');
        }

        // Score
        if (response.rating !== null) {
            $('#favorite-score').text('Score: ' + response.rating + '/5');
        } else {
            $('#favorite-plot').text('No score available');
        }

        // URL
        if (response.website !== null) {
            $('#favorite-full-url').attr('href', response.website);
        } else {
            $('#favorite-full-url').text('No url available');
        }

        // Takes 1 genre from this title and uses it to create recommendations for books, anime, video game and movie
        if (newSearch) {
            genreChooser(title);
        };
    })
}

// Chooses a genre from the searched video game
function genreChooser(title) {

    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var gamesURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

    // Search title for genres and tags
    $.ajax({
        url: gamesURL,
        method: "GET",
        error: function () {
            console.log('genreChooser function returning error');
            return;
        }
    }).then(function (responseGenre) {

        // If title is rated mature flag it
        if (responseGenre.esrb_rating.slug == "mature") {
            maturityFlag = true;
        }

        // Genres of this title
        let videoGameGenres = [];
        for (i = 0; i < responseGenre.genres.length; i++) {
            videoGameGenres.push(responseGenre.genres[i].slug);
        }

        // Tags of this title
        let videoGameTags = [];
        for (i = 0; i < responseGenre.tags.length; i++) {
            videoGameTags.push(responseGenre.tags[i].slug);
        }

        // Merges both genre and tag arrays into one array
        let merged = $.merge(videoGameGenres, videoGameTags);

        // Master genre array for all media types
        let allGenreArray = ['action', 'adventure', 'comedy', 'crime', 'drama', 'family', 'fantasy', 'history', 'horror', 'mystery', 'romance', 'science-fiction', 'thriller', 'war', 'western'];

        // Chooses genres from title that are shared with allGenreArray
        let accepted = [];
        for (i = 0; i < merged.length; i++) {
            var found = $.inArray(merged[i], allGenreArray);
            if (!(-1 == found)) {
                accepted.push(merged[i]);
            }
        }

        // Pick 1 genre for video game results
        let pickAGenre = Math.floor(Math.random() * videoGameGenres.length);
        let genreChosen = merged[pickAGenre];

        // Pick 1 genre to pass to other media
        let pickAGenre2 = Math.floor(Math.random() * accepted.length);
        let genrePassed = accepted[pickAGenre2];

        // Call recommended video game to results
        resultsVideoGame(genreChosen);
        movieFromOtherMedia(genrePassed);
        searchBooksByGenre(genrePassed);
        genreConvertID(genrePassed);
    });

};

// If a book, movie or anime was searched, pick a genre from that title 
function videoGameFromOther(genrePassedIn) {
    // Clears previous search results first
    clearRecommendedFields();
    // Call recommended video game to results
    resultsVideoGame(genrePassedIn);
}

// Populate recommened video game section with related video game title
function resultsVideoGame(genreChosen) {

    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var genreUrl = 'https://api.rawg.io/api/games?tags=' + genreChosen;

    // Generate list of all video games with that tag
    $.ajax({
        url: genreUrl,
        method: 'GET',
        error: function () {
            console.log('resultsVideoGame function returning error');
            return;
        }
    }).then(function (response) {

        // If tags aren't returning results it needs to search genres instead
        if (response.count == 0) {
            resultsVideoGameFromGenre(genreChosen);
        } else {
            // Pick random title from their list
            let titles = response.results;
            let pickTitle = Math.floor(Math.random() * titles.length);

            // Populate recommened video game section with this title's info
            var title = response.results[pickTitle].slug;
            var titleURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;

            $.ajax({
                url: titleURL,
                method: 'GET',
                error: function () {
                    console.log('resultsVideoGame sub function returning error');
                    return;
                }
            }).then(function (response) {
                console.log('this');
                // If mature box isn't checked, don't include mature, adult-only or unrated titles and find a new title
                if ($('#mature').prop('checked') === false) {
                    if (response.esrb_rating == null || response.esrb_rating.slug == 'mature' || response.esrb_rating.slug == 'adults-only') {
                        resultsVideoGame(genreChosen);
                    } else {
                        // Populate recommened title info to page
                        recommendationPopulator(response);
                    }
                } else {
                    // Populate recommened title info to page
                    recommendationPopulator(response);
                }
            })
        }
    })
}

// Populates related video game title from genre
function resultsVideoGameFromGenre(genreChosen) {
    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var genreUrl = 'https://api.rawg.io/api/games?genres=' + genreChosen;

    // Go to genre database
    $.ajax({
        url: genreUrl,
        method: 'GET',
        error: function () {
            console.log('resultsVideoGame function returning error');
            return;
        }
    }).then(function (response) {

        // If tags aren't returning results it needs to do the search over
        if (response.count == 0) {
            resultsVideoGameFromGenre(genreChosen);
        }

        // Pick random title 
        let titles = response.results;
        let pickTitle = Math.floor(Math.random() * titles.length);

        // Populate recommened video game section with this title's info
        var title = response.results[pickTitle].slug;

        var titleURL = 'https://api.rawg.io/api/games/' + title + '?key=' + apiKey;
        // console.log('Recommended video game url 2' + titleURL);
        $.ajax({
            url: titleURL,
            method: 'GET',
            error: function () {
                console.log('resultsVideoGame child function returning error');
                return;
            }
        }).then(function (response) {

            // If mature box isn't checked, don't include mature, adult-only or unrated titles and find a new title
            // If mature box isn't checked, don't include mature, adult-only or unrated titles and find a new title
            if ($('#mature').prop('checked') === false) {
                if (response.esrb_rating == null || response.esrb_rating.slug == 'mature' || response.esrb_rating.slug == 'adults-only') {
                    resultsVideoGame(genreChosen);
                } else {
                    // Populate recommened title info to page
                    recommendationPopulator(response);
                }
            } else {
                // Populate recommened title info to page
                recommendationPopulator(response);
            }
        })
    })
}

//This will display the video game result that was saved to a button from local storage
function displaySavedVideoGameResult(savedVideoGame) {
    // Trim title for webpage slug
    let videoGameResult = savedVideoGame.trim().split(' ').join('-').replace(':', '').replace("'", '');
    var apiKey = '2838144f3f40444caa2964cbb3316b1f';
    var recVideoGameURL = 'https://api.rawg.io/api/games/' + videoGameResult + '?key=' + apiKey;

    $.ajax({
        url: recVideoGameURL,
        method: "GET"
    }).then(function (response) {

        // Populate recommened title info to page
        recommendationPopulator(response);
    });
};

// Populate recommened title info to page
function recommendationPopulator(response) {
    $('#video-game-spinner').hide();

    // Title
    $('#video-game-title').text(response.name);

    // Poster
    $('#video-game-poster').attr('src', response.background_image).attr('alt', 'poster');

    // ESRB rating
    if (response.esrb_rating !== null) {
        $('#video-game-rating').text('Rated: ' + response.esrb_rating.name);
    } else {
        $('#video-game-rating').text('Rated: unrated');
    }

    // Description
    if (response.description_raw !== null) {
        $('#video-game-plot').text(response.description_raw);
    } else {
        $('#video-game-plot').text('No plot available');
    }

    // Score
    if (response.rating !== null) {
        $('#video-game-score').text('Score: ' + response.rating + '/5');
    } else {
        $('#video-game-score').text('No score available');
    }

    // URL
    if (response.website !== null) {
        $('#video-game-full-url').attr('href', response.website);
    } else {
        $('#video-game-full-url').text('No url available');
    }

    // Passed title for use in saved search button
    results("video-game", response.name);
}

// Clears populated fields at the start of a new search
function clearRecommendedFields() {
    $('#video-game-title').text('');
    $('#video-game-poster').attr('src', "").attr('alt', '');
    $('#video-game-rating').text('Searching...');
    $('#video-game-spinner').show();
    $('#video-game-plot').text('');
    $('#video-game-score').text('');
    $('#video-game-full-url').text('');
}


// ISSUES //
// if recommened is the same as searched find a new title


// Genre list


// var games2 = ['Sci-fi', 'Horror', 'Funny', 'Fantasy', 'Classic', 'Gore', 'Female Protagonist',
//  'Comedy', 'Survival', 'Exploration', 'Violent', 'Zombies', 'Space', 'Dark', 'Anime', 'War',
//   'Post-apocalyptic', 'Family Friendly', 'Mature', 'Cute', 'Mystery', 'Historical', 'Physics', 
//   'Memes', 'Futuristic', 'Aliens', 'Dark Fantasy', 'Military', 'Medieval', 'Cinematic', 'Realistic', 
// 'Cyberpunk', 'Crime', 'Magic', 'Dystopian', 'Colorful', 'Robots', 'Driving', 'Music', 'Detective', 
// 'Management', 'Assassin', 'Surreal', 'World War II', 'Blood', 'Relaxing', 'Drama', 'Economy', 
// 'Heist', 'Romance', 'Superhero', 'America', 'Alternate History', 'Education', 'Time Travel', 'Demons', 
// 'Dragons', 'Minimalist', 'Noir', 'Ninja', 'Cartoon', 'Gothic', 'Mechs', 'Flight', 'Tanks', 'Political', 
// 'Lovecraftian', 'Party', 'Satire', 'Supernatural', 'Conspiracy', 'Science', 'Hunting', 'Underwater', 
// 'Mythology', 'Pirates', 'Trading', 'Pirate', 'Beautiful', 'Thriller', 'Western', 'Dinosaurs', 'Epic', 
// 'Batman', 'Cold War', 'Parody', 'European', 'Football', 'Psychedelic', 'Diplomacy', 'LEGO', 'Soccer', 
// 'nature', 'race', 'Vampire', 'hero', 'Politics', 'Lara Croft', 'Monsters', 'Naval', 'Modern', 'Investigation', 
// 'Mars', 'Fishing', 'history', 'Martial Arts', 'Sniper', 'Police', 'cars', 'Programming', 'future', 'Horses', 
// 'World War I', 'Trains', 'Rome', 'Capitalism', 'Indie', 'Adventure', 'Strategy', 'Puzzle', 'Racing', 'Sports', 
// 'Family', 'Educational'];

// var games = ['Action', 'Adventure', 'Horror', 'Single-Player'];
// var movies = ['Disney', 'Family', 'Adventure', 'Kids'];
// var books = ['Adventure', 'Fantasy', 'Silly', 'Heartwarming'];
// var anime = ['Zombies', 'Horror', 'Apocolypse', 'Adventure'];

// arrayCompare(games, movies, books, anime);
// function arrayCompare(arr1, arr2, arr3, arr4) {
//     var merged1 = [];
//     var merged2 = [];
//     var merged3 = [];
//     for (i = 0; i < arr2.length; i++) {
//         var found = $.inArray(arr2[i], arr1);
//         if (!(-1 == found)) {
//             merged1.push(arr2[i]);
//         }
//     }
//     for (i = 0; i < arr3.length; i++) {
//         var found = $.inArray(arr3[i], arr4);
//         if (!(-1 == found)) {
//             merged2.push(arr3[i]);
//         }
//     }
//     for (i = 0; i < merged1.length; i++) {
//         var found = $.inArray(merged1[i], merged2);
//         if (!(-1 == found)) {
//             merged3.push(merged1[i]);
//             console.log(merged3);
//         }
//     }
// }



// Create a function that finds a game with a related genre or title
// function takes the title's url
// then it parses our the genres and tags into arrays
// then it calls a random game https://api.rawg.io/api/games/4459?key=2838144f3f40444caa2964cbb3316b1f
// then it then it creates arrays for those genres and tags
// then it compares the original title's arrays to the new title's arrays
// IF there's a match, it renders the recommendation to the page
// ELSE it searches for a new title

//or


