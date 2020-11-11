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
        // console.log(favorite);
        $("#favorite-title").text(favorite.title);
        $("#favorite-poster").attr("src", favorite.imageLinks.thumbnail);
        $("#favorite-rating").text(favorite.categories[0] + " (" + favorite.maturityRating + ")");
        $("#favorite-plot").text(favorite.description);
        $("#favorite-score").text(favorite.averageRating);
        $("#favorite-full-url").attr("href", favorite.canonicalVolumeLink);

        // console.log(favorite.canonicalVolumeLink);
        console.log(pickGenreFromBook(favorites));
        searchBooksByGenre("Drama");
    });
};


//https://www.googleapis.com/books/v1/volumes?q=+subject:Young_Adult

function pickGenreFromBook(obj){
    return obj.items[0].volumeInfo.categories[0];
}

function searchBooksByGenre(genre) {
    console.log("you have entered searchBookByGenre.  Genre is: " + genre)
    var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
    var allGenreArray = ['action','adventure','comedy','crime','drama','family','fantasy','history','horror','mystery','romance','science-fiction','thriller','war','western'];
    var bookGenreArray =['Fantasy','Fantasy','Fantasy','Fantasy','Drama','Fantasy','Fantasy','Fantasy','Fantasy','Fantasy','Romance','Fantasy','Fantasy','Fantasy','Fantasy'];
    let bookGenre = '';

    //convert passed genre to equivalent book genre
    for (var g=0; g<allGenreArray.length; g++) {
        if (allGenreArray[g] === genre || bookGenreArray[g] === genre) {
            //capture the index
            bookGenre = bookGenreArray[g];
            break;
        }
    }
    console.log("bookGenre is: " + bookGenre);
    var queryGenre="https://www.googleapis.com/books/v1/volumes?q=\"\%\"+subject:" + bookGenre + "&maxResults=" + 10 + "&key=" + apiKey;

    $.ajax({
        url: queryGenre,
        method: "GET"
    }).then(function(books){
        // console.log(books);
        //diplay chosen book
        
        let randIndex = Math.floor(Math.random() * 10);
        let book = books.items[randIndex].volumeInfo;
        // console.log(book);
        $("#book-title").text(book.title);
        $("#book-poster").attr("src", book.imageLinks.thumbnail);
        $("#book-rating").text(book.categories[0] + " (" + book.maturityRating + ")");
        $("#book-plot").text(book.description);
        $("#book-score").text(book.averageRating);
        $("#book-full-url").attr("href", book.canonicalVolumeLink);

        // console.log(book.canonicalVolumeLink);
    });
    
};

