//Variables for user's pick
let userFavorite; 
let media;
let newSearch;

//Variables for storing a saved result
let savedMovieResult = '';
let saveBookResult = '';
let saveVideoGameResult = '';
let saveAnimeResult = '';
let newSavedButton;
let checkUserFavorite;


//This will run when the user enters in values into the form and clicks on "Find me recommendations"
function searchFavorite(event) {

    event.preventDefault();

    //Stores user's title and media type from text input and radio buttons
    userFavorite = $('#user-favorite').val();
    media = $('fieldset input:checked').val();
    //Confirms to search for a new result
    newSearch = true;
    //To use for local storage (saveResult function)
    checkUserFavorite = userFavorite;
    
    //Call function to display data into the favorite box
    displayFavoriteBox(media,userFavorite,newSearch);
};


//This will run to display data into the Favorite box based on the media type.  Search section will display:none, and display:none will be taken off
function displayFavoriteBox(mediatype,favorite,newSearchTrue){
    switch (mediatype) {
        case 'movie':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteMovie(favorite,newSearchTrue);
            break;
        case 'book':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteBook(favorite,newSearchTrue);
            break;
        case 'video-game':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteVideoGame(favorite,newSearchTrue);
            break; 
        case 'anime':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteAnime(favorite,newSearchTrue);
            break; 
        default:
            //For testing purposes
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            //Add error message later
    };
};


//This will run when the "Go back" button is clicked from the results portion
function goBackToSearch(event) {
    event.preventDefault();

    //Reset values of form
    $('#user-favorite').val('');
    $('fieldset input:checked').prop('checked', false);

    //Display search section
    $('.search-section').removeClass('hidden');
    $('.results-section').addClass('hidden');

    //Reset save button
    $('#save-result').prop('disabled', false);
    $('#save-result').attr('disabled', false);

    //Remove error message, if displayed
    $('#title-error').addClass('hidden');

    //Display new saved results
    displaySavedButtons();
};


//This will run from the 4 media js files.  This will bring in each search result title for all 4 media forms to use if the user saves the results.
function results(mediatype, title){
    switch (mediatype){
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
            console.log("Nothing saved.")
    };
};


//This will run if the user clicks to save the result.  This will save to local storage and generate a button on the search section.
function saveResult() {
    //Variables
    let addI = 1; //For button ID

    //This prevents a user from clicking the save button multiple times
    if($('#save-result').prop('disabled')){
        return;
    };
    
    //If the button ID already exists, then add a number to the button
    if($('#' + checkUserFavorite).length){
        checkUserFavorite += `-${addI}`;
        addI++;
    };

    
    //Create a new button and add classes, ID, and text
    newSavedButton = $('<button>');
    newSavedButton.addClass('button saved-result')
    newSavedButton.attr('id', checkUserFavorite);
    newSavedButton.html(checkUserFavorite);
    //Prepend the new button to the saved
    $('#saved-buttons').prepend(newSavedButton);


    //Local Storage
    //Add the results as an object 
    let addSavedButton = {button: checkUserFavorite, title: userFavorite, media: media, movie: savedMovieResult}; //, book: savedBookResult, videoGame: savedVideoGameResult, anime: savedAnimeResult
    
    //Get current local storage
    savedHistory = JSON.parse(localStorage.getItem("allSavedTitles"));
    //If nothing in currently local storage, add the first item
    if(!savedHistory){
        savedHistory = [];
        savedHistory[0] = addSavedButton;
    } else {
        savedHistory.push(addSavedButton);
    };

    //Put objects into local storage
    localStorage.setItem("allSavedTitles",JSON.stringify(savedHistory));

    //Disable save button after clicked once
    $('#save-result').prop('disabled', true);
    $('#save-result').attr('disabled', true);
};


//This will display the saved buttons; it will display when page loads, and will re-display whenever a new search button is added
function displaySavedButtons(){
    //Empties the saved searches section
    $('#saved-buttons').empty();
    
    //Disable save button so duplicate button doesn't generate
    $('#save-result').prop('disabled', true);
    $('#save-result').attr('disabled', true);

    //Get objects from local storage
    let savedHistory = JSON.parse(localStorage.getItem("allSavedTitles"));
    //if nothing in localStorage, then keep saved searches hidden
    if(!savedHistory){
        $('.saved-history').addClass('hidden');
        return;
    } else {
    //Display all objects in Local Storage as buttons
        $('.saved-history').removeClass('hidden');
        for(i = 0; i < savedHistory.length; i++){
            newSavedButton = $('<button>');
            newSavedButton.addClass('button saved-result')
            let savedButtonName = savedHistory[i].button;
            newSavedButton.attr('id', savedButtonName)
            newSavedButton.html(savedButtonName);
            //Prepends to html:
            $('#saved-buttons').prepend(newSavedButton);
        }
    };
};


//This will run once one of the saved-result buttons are clicked.  It will pull the title results that were saved, and display them in the results section
function displaySavedResult(event) {

    //Variables for saved results
    let savedTitle, savedMedia, savedMovie, savedBook, savedVideoGame, savedAnime;

    //If a button was not clicked
    if($(event.target).attr('class') !== 'button saved-result'){
        return;
    };

    //If a button is clicked, store the ID of that button
    let savedButtonClicked = '';
    savedButtonClicked = event.target.id;

    //Pull items from local storage
    let savedHistory = JSON.parse(localStorage.getItem("allSavedTitles"));
    //Run through the objects and locate the specific object needed based on the ID
    for(i = 0; i < savedHistory.length; i++){
        if(savedHistory[i].button === savedButtonClicked){
            //For Favorite Title and Media type
            savedTitle = savedHistory[i].title;
            savedMedia = savedHistory[i].media;
            //For media results needing to display
            savedMovie = savedHistory[i].movie;
            //savedBook = savedHistory[i].book;
            //savedVideoGame = savedHistory[i].videoGame;
            //savedAnime = savedHistory[i].anime;
        };
    };

    //Results section
    //So new results are not generated
    newSearch = false;
    //For favorite-section
    displayFavoriteBox(savedMedia,savedTitle);
    //For results-section
    displaySavedMovieResult(savedMovie);
    //displaySavedBookResult(savedBook);
    //displaySavedVideoGameResult(savedVideoGame);
    //displaySavedAnimeResult(savedAnime);
};

//Run when page opens to display any buttons based on what is saved in local storage
displaySavedButtons();

//If "Find me recommendations" is clicked
$('#search').click(searchFavorite);

//If "Go Back to the search page" is clicked
$('#go-back').click(goBackToSearch);

//If "Save this result" is clicked
$('#save-result').click(saveResult);

//If a saved-title button is clicked:
$('#saved-buttons').click(displaySavedResult);
