var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
var allGenreArray = ['action','adventure','comedy','crime','drama','family','fantasy','history','horror','mystery','romance','science-fiction','thriller','war','western'];
var bookGenreArray = [
/*action*/          ['Action'],
/*adventure*/       ['Adventure', 'Adventure and adventurers'],
/*comedy*/          ['Humor'],
/*crime*/           ['Crime'], 
/*drama*/           ['Drama','Law'],
/*family*/          ['Juvenile Fiction', 'Juvenile Nonfiction', 'Children\'s stories'],
/*fantasy*/         ['Young Adult Fiction'],
/*history*/         ['Biography & Autobiography', 'History', 'Social Science', 'Political Science', 'Courts', 'Philosophy'],
/*horror*/          ['Psychology'],
/*mystery*/         ['Mystery'],
/*romance*/         ['Fiction'],
/*science-fiction*/ ['Sciencefiction', 'Comic science fiction', 'Computers', 'Science'],
/*thriller*/        ['Assasins', 'Arson'],
/*war*/             ['Battles'],
/*western*/         ['Western']
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
        
        $("#favorite-title").text(favorite.title);
        $("#favorite-poster").attr("src", favorite.imageLinks.thumbnail);
        $("#favorite-rating").text(favorite.categories[0] + " (" + favorite.maturityRating + ")");
        $("#favorite-plot").text(favorite.description);
        $("#favorite-score").text("Average book rating: " + favorite.averageRating);
        $("#favorite-full-url").attr("href", favorite.canonicalVolumeLink);
        
        if(newSearch){
            pickGenreFromBook(favorites);
        };
    });
};


//https://www.googleapis.com/books/v1/volumes?q=+subject:Young_Adult

function pickGenreFromBook(obj){
    var bookGenre = obj.items[0].volumeInfo.categories[0];
    var passedGenre;

    //convert book Genre to allGenreArray
    for (var b=0; b<bookGenreArray.length; b++) {
        for (var sub=0; sub<bookGenreArray[b].length; sub++){
            if (bookGenreArray[b][sub] == bookGenre) {
                passedGenre = allGenreArray[b];
                // break;
            }
        }
        //if value not found select a drama
        if (!passedGenre) {
            passedGenre = "drama'";
        }
    }

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

    var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
    let bookGenre = '';

    var queryGenre="https://www.googleapis.com/books/v1/volumes?q=+subject:" + genre + "&maxResults=" + 40 + "&key=" + apiKey;

    $.ajax({
        url: queryGenre,
        method: "GET"
    }).then(function(books){
        //diplay chosen book

        function findAndUpdateBook() {
            let randIndex = Math.floor(Math.random() * 40);
            let book = books.items[randIndex].volumeInfo;
            
            //If mature box isn't selected, don't include rated "MATURE" (rerun function to genreate new index number)
            //search is iterative until "NOT_MATURE" rating is found
            if($('#mature').prop('checked') === false){
                if(book.maturityRating === "MATURE")
                findAndUpdateBook();
            };

            return book;
        }

        newBook = findAndUpdateBook();
        
        bookResultSection(newBook);

    });
    
};

function bookResultSection(bookResult) {
    console.log(bookResult);

    //Pass this title in case it needs to be saved to local storage
    results("book", bookResult.title);

    //display results
    $("#book-title").text(bookResult.title);
    $("#book-poster").attr("src", bookResult.imageLinks.thumbnail);
    $("#book-rating").text(bookResult.categories[0] + " (" + bookResult.maturityRating + ")");
    $("#book-plot").text(bookResult.description);
    $("#book-score").text("Average book rating: " + bookResult.averageRating);
    $("#book-full-url").attr("href", bookResult.canonicalVolumeLink);
}

//This will display the movie result that was saved to a button from local storage
function displaySavedBookResult(savedBook){
    console.log("SAVED BOOK IS: " + savedBook);
    let recBookURL = "https://www.googleapis.com/books/v1/volumes?q="+ savedBook + "&maxResults=" + 1 + "&key=" + apiKey;

    $.ajax({
        url: recBookURL,
        method: "GET"
    }).then(function(responseResult) {
        //Call function to display the results
        bookResultSection(responseResult);
        
    });
};

