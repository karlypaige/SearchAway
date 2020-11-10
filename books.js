var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";


function favoriteBook(userFavorite) {
    var title=userFavorite.trim();  
    var queryURL="https://www.googleapis.com/books/v1/volumes?q="+ title + "&maxResults=" + 1 + "&key=" + apiKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(favorites){
        // console.log(favorites);
        //diplay chosen favorite
        
        let favorite = favorites.items[0].volumeInfo
        console.log(favorite);
        $("#favorite-title").text(favorite.title);
        $("#favorite-poster").attr("src", favorite.imageLinks.thumbnail);
        $("#favorite-rating").text(favorite.categories[0] + " (" + favorite.maturityRating + ")");
        $("#favorite-plot").text(favorite.description);
        $("#favorite-score").text(favorite.averageRating);
        $("#favorite-full-url").attr("href", favorite.canonicalVolumeLink);

        // console.log(favorite.canonicalVolumeLink);

        searchBooksByGenre("Juvenile-Fiction");
    });
};

//https://www.googleapis.com/books/v1/volumes?q=+subject:Young_Adult

function searchBooksByGenre(genre) {
    var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
    var queryGenre="https://www.googleapis.com/books/v1/volumes?q=\"\%\"+subject:" + genre + "&maxResults=" + 1;// + "&key=" + apiKey;


    $.ajax({
        url: queryGenre,
        method: "GET"
    }).then(function(books){
        console.log(books);
        //diplay chosen book
        
        let book = books.items[0].volumeInfo
        console.log(book);
        $("#book-title").text(book.title);
        $("#book-poster").attr("src", book.imageLinks.thumbnail);
        $("#book-rating").text(book.categories[0] + " (" + book.maturityRating + ")");
        $("#book-plot").text(book.description);
        $("#book-score").text(book.averageRating);
        $("#book-full-url").attr("href", book.canonicalVolumeLink);

        console.log(book.canonicalVolumeLink);
    });
    
};

