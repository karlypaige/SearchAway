//global scope variables for access to all functions
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
    
//function searches and displays book title based on user input
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
        
        //If a new search, find a result (if not a new search, will want to display saved result from local storage- separate function)
        if(newSearch){
            pickGenreFromBook(favorites);
        };
    });
};

//convert book category to genre from allGenreArray and pass it to other media functions to display results
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

//convert passed genre to book category and call display function to display results
function searchBooksByGenre(genre) {
    
    var apiKey="AIzaSyBSs5kWswhDUiDMYdYxtnVKl8h-wbTTxRw";
    let bookGenre = '';

    //convert passed genre to book genre
    for (var pg=0; pg<allGenreArray.length; pg++) {
        if (genre === allGenreArray[pg]){
                var ind = Math.floor(Math.random() * bookGenreArray[pg].length);
                bookGenre = bookGenreArray[pg][ind];
        }
    }

    //to add variety - search for max allowed results (40) and randomly select a result to display
    var queryGenre="https://www.googleapis.com/books/v1/volumes?q=+subject:" + bookGenre + "&maxResults=" + 40 + "&key=" + apiKey;

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

        //call function and store results
        newBook = findAndUpdateBook();
        //pass results to display 
        bookResultSection(newBook);

    });
    
};

//call this function to display results of book search in results section
function bookResultSection(bookResult) {
    
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

//This will display the book result that was saved to a button from local storage
function displaySavedBookResult(savedBook){
    
    let recBookURL = "https://www.googleapis.com/books/v1/volumes?q="+ savedBook + "&maxResults=" + 1 + "&key=" + apiKey;

    $.ajax({
        url: recBookURL,
        method: "GET"
    }).then(function(responseResult) {
        //Call function to display the results
        bookResultSection(responseResult);
        
    });
};

