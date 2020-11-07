


function favoriteBook(userFavorite) {
var title=userFavorite.trim().split(' ').join('+');
var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
var queryURL="https://www.googleapis.com/books/v1/volumes?q="+ title + "&maxResults=" + 1 + "&key=" + apiKey;


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(books){
    console.log(books);
});

};