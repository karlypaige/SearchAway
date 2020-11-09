


function favoriteBook(userFavorite) {
    var title=userFavorite.trim();
    var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
    var queryURL="https://www.googleapis.com/books/v1/volumes?q="+ title + "&maxResults=" + 1 + "&key=" + apiKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(books){
        console.log(books);
        //diplay chosen book
        
        let book = books.items[0].volumeInfo
        console.log(book);
        $("#favorite-title").text(book.title);
        $("#favorite-poster").attr("src", book.imageLinks.thumbnail);
        $("#favorite-rating").text(book.categories[0] + " (" + book.maturityRating + ")");
        $("#favorite-plot").text(book.description);
        $("#favorite-full-url").attr("href", book.canonicalVolumeLink);

        console.log(book.canonicalVolumeLink);
    });


};

