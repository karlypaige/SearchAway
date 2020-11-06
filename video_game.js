// Call Video Game API
function videoGameCall() {
    var apiKey = '';
    var url = '';

    $.ajax({
        url: url,
        method: 'GET',
        error: function() {
            alert('video_game.js throwing an error');
        }
    }).then(function(response) {
        
    })
}