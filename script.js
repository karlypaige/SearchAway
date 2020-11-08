//For the main search page (button + local storage)
var userFavorite;
var media;

//Local storage testing
var savedMovieResult = '';
var saveBookResult = '';
var saveVideoGameResult = '';
var saveAnimeResult = '';
var newSavedButton, savedButtonName;
var checkUserFavorite;
var addI = 1;

function searchFavorite(event) {
    event.preventDefault();


    userFavorite = $('#user-favorite').val();
    //For local storage later
    checkUserFavorite = userFavorite;
    
    media = $('fieldset input:checked').val();


    displayFavoriteBox(media,userFavorite);

};

function displayFavoriteBox(media,favorite){
    switch (media) {
        case 'movie':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteMovie(favorite);
            break;
        case 'book':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteBook(favorite);
            break;
        case 'video-game':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteVideoGame(favorite);
            break; 
        case 'anime':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteAnime(favorite);
            break; 
        default:
            //For testing purposes
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            //Add error message later
    }

};

//If "Find me recommendations" is clicked
$('#search').click(searchFavorite);


function goBackToSearch(event) {
    event.preventDefault();

    //Reset values
    $('#user-favorite').val('');
    $('fieldset input:checked').prop('checked', false);

    //Display search
    $('.search-section').removeClass('hidden');
    $('.results-section').addClass('hidden');

    //reset save button
    $('#save-result').prop('disabled', false);
    $('#save-result').attr('disabled', false);

    //Display new saved results
    displaySavedButtons();
};


//If "Go Back to the search page" is clicked
$('#go-back').click(goBackToSearch);


//Results came back
function results(media, title){
    switch (media){
        case 'movie':
            savedMovieResult = title;
            break;
        case 'book':
            savedBookResult = title;
            break;
        case 'video-game':
            savedVideoGameResult = title;
            break;
        case 'anime':
            savedAnimeResult = title;
            break;            
        default:
            console.log("nothing saved.")
    };
}


function saveResult(event) {

    if($('#save-result').prop('disabled')){
        return;
    };
    
    //If ID exists, update name for button
    if($('#' + checkUserFavorite).length){
        checkUserFavorite += `-${addI}`;
        addI++;
    };

    
    //Create a new button and add classes and name
    newSavedButton = $('<button>');
    newSavedButton.addClass('button saved-result')
    newSavedButton.attr('id', checkUserFavorite);
    newSavedButton.html(checkUserFavorite);
    //Add new button to the site
    $('#saved-buttons').prepend(newSavedButton);

    //add results to local storage
    let addSavedButton = {button: checkUserFavorite, title: userFavorite, media: media, movie: savedMovieResult}; //, book: savedBookResult, videoGame: savedVideoGameResult, anime: savedAnimeResult

    savedHistory = JSON.parse(localStorage.getItem("allSavedTitles"));
    //If nothing in local storage
    if(!savedHistory){
        savedHistory = [];
        savedHistory[0] = addSavedButton;
    } else {
        savedHistory.push(addSavedButton);
    };

    localStorage.setItem("allSavedTitles",JSON.stringify(savedHistory));

    //disable save results after clicked once
    $('#save-result').prop('disabled', true);
    $('#save-result').attr('disabled', true);
}

function displaySavedButtons(){
    $('#saved-buttons').empty();
    
    let savedHistory = JSON.parse(localStorage.getItem("allSavedTitles"));
    //if nothing in localStorage
    if(!savedHistory){
        return;
    } else {
    //display all buttons
        for(i = 0; i < savedHistory.length; i++){
            newSavedButton = $('<button>');
            newSavedButton.addClass('button saved-result')
            savedButtonName = savedHistory[i].button;
            newSavedButton.attr('id', savedButtonName)
            newSavedButton.html(savedButtonName);
            //Prepends to html:
            $('#saved-buttons').prepend(newSavedButton);
        }
    }


};

displaySavedButtons();

//If "Save this result" is clicked
$('#save-result').click(saveResult);


function displaySavedResult(event) {

    //variables for saved results
    let savedTitle, savedMedia, savedMovie, savedBook, savedVideoGame, savedAnime;


    //must be a button
    if($(event.target).attr('class') !== 'button saved-result'){
        return;
    };

    //if button is clicked, save ID
    let savedButtonClicked = '';
    savedButtonClicked = event.target.id;
    console.log(savedButtonClicked);

    //Pull items from local storage
    let savedHistory = JSON.parse(localStorage.getItem("allSavedTitles"));

    for(i = 0; i < savedHistory.length; i++){
        if(savedHistory[i].button === savedButtonClicked){
            savedTitle = savedHistory[i].title;
            savedMedia = savedHistory[i].media;
            savedMovie = savedHistory[i].movie;
            //savedBook = savedHistory[i].book;
            //savedVideoGame = savedHistory[i].videoGame;
            //savedAnime = savedHistory[i].anime;
        };
    };


    //Call functions based on variables
    //Favorite
    displayFavoriteBox(savedMedia,savedTitle);

    //Add functions for the other results
    displaySavedMovieResult();
    //displaySavedBookResult();
    //displaySavedVideoGameResult();
    //displaySavedAnimeResult();

};

//If a saved title button is clicked:
$('#saved-buttons').click(displaySavedResult);

//getItems from local storage
//media will say which shows in favorite
//rest will be for results
//calls each media api to display results


