//For the main search page (button + local storage)
var userFavorite;
var media;

function searchFavorite(event) {
    event.preventDefault();


    userFavorite = $('#user-favorite').val();
    console.log(userFavorite);
    
    media = $('fieldset input:checked').val();
    console.log(media);

    switch (media) {
        case 'movie':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteMovie(userFavorite);
            break;
        case 'book':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            //function for book favorite
            break;
        case 'video-game':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            //function for video-game favorite
            break; 
        case 'anime':
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
            favoriteAnime(userFavorite);
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

};


//If "Go Back to the search page" is clicked
$('#go-back').click(goBackToSearch);