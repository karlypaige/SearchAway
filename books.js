var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
var allGenreArray = ['action','adventure','comedy','crime','drama','family','fantasy','history','horror','mystery','romance','science-fiction','thriller','war','western'];
var bookGenreArray = [
['Action'],
['Adventure', 'Adventure and adventurers'],
['Humor'],
['Crime'], 
['Drama','Law'],
['Juvenile Fiction', 'Juvenile Nonfiction', 'Children\'s stories'],
['Young Adult Fiction'],
['Biography & Autobiography', 'History', 'Social Science', 'Political Science', 'Courts', 'Philosophy'],
['Psychology'],
['Mystery'],
['Fiction'],
['Sciencefiction', 'Comic science fiction', 'Computers', 'Science'],
['Assasins', 'Arson'],
['Battles'],
['Western']
];
    

function favoriteBook(userFavorite, newSearch) {

    var title=userFavorite.trim();  
    var queryURL="https://www.googleapis.com/books/v1/volumes?q="+ title + "&maxResults=" + 1 + "&key=" + apiKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(favorites){
    
        //diplay chosen favorite
        
        let favorite = favorites.items[0].volumeInfo
        // console.log(favorite);
        $("#favorite-title").text(favorite.title);
        $("#favorite-poster").attr("src", favorite.imageLinks.thumbnail);
        $("#favorite-rating").text(favorite.categories[0] + " (" + favorite.maturityRating + ")");
        $("#favorite-plot").text(favorite.description);
        $("#favorite-score").text("Average book rating: " + favorite.averageRating);
        $("#favorite-full-url").attr("href", favorite.canonicalVolumeLink);

        console.log(favorites);
        // console.log(favorite.canonicalVolumeLink);
        if(newSearch){
            pickGenreFromBook(favorites);
        };
    });
};


//https://www.googleapis.com/books/v1/volumes?q=+subject:Young_Adult

function pickGenreFromBook(obj){
    var bookGenre = obj.items[0].volumeInfo.categories[0];
    var passedGenre;
    console.log("bookGenre is: " + bookGenre);
    //convert book Genre to allGenreArray
    for (var b=0; b<bookGenreArray.length; b++) {
        console.log("---sorting through bookGenreArray: " + bookGenreArray[b]);
        //if value at index is single value
        if(bookGenreArray[b].length === 1){
            if (bookGenreArray[b] == bookGenre) {
                //capture the index
                passedGenre = allGenreArray[b];
                break;
            } 
            //if value at index is array
        } else if (bookGenreArray[b].length > 1){
            for (var sub=0; sub<bookGenreArray[b].length; sub++){
                console.log("-------sorting through sub Array: " + bookGenreArray[b][sub]);
                if (bookGenreArray[b][sub] == bookGenre) {
                    passedGenre = allGenreArray[b];
                    break;
                }
            }
            //if value not found select a drama
        } else {
            passedGenre = "drama'";
        }
        console.log("THE INTENDED VALUE IS: " + allGenreArray[b])
    }

    console.log("passedGenre is: " + passedGenre)
    //Pass genre to other medias
    //book
    searchBooksByGenre(passedGenre);
    //video games
    videoGameFromOther(passedGenre);
    //anime
    genreConvertID(passedGenre);
    //movie
    movieFromOtherMedia(passedGenre);

}

function searchBooksByGenre(genre) {
    console.log("searchBookByGenre Genre is: " + genre)
    var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
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
        $("#book-score").text("Average book rating: " + book.averageRating);
        $("#book-full-url").attr("href", book.canonicalVolumeLink);

        // console.log(book.canonicalVolumeLink);
    });
    
};

