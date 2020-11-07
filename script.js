//For the main search page (button + local storage)
var userFavorite;
var media;

function searchFavorite(event) {
    event.preventDefault();


    userFavorite = $('#favorite-title').val();
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
            //function for anime favorite
            break; 
        default:
            //For testing purposes
            $('.search-section').addClass('hidden');
            $('.results-section').removeClass('hidden');
    }

};

$('#search').click(searchFavorite);