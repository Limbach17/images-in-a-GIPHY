$(document).ready(function (){

    console.log("Hello");

var icons = ["Roberto Clemente", "Phil Kessel", "Evgeni Malkin", "Andrew McCutchen", "Sidney Crosby", 
"Terry Bradshaw"];

console.log(icons);

var apiKey = "NySd2ZK2AQaiPWTEqajkzALSJHuhg9Ml";

function renderButtons(){

for (var i = 0; i < icons.length; i++) {

var iconButton = $("<button>");
iconButton.addClass("icon");
iconButton.attr("data-name", icons[i]);
iconButton.text(icons[i]);

$("#buttons-display").append(iconButton);
}
}

renderButtons();

$("#add-icon").click(function(event){
event.preventDefault();
var newIcon = $("#icon-input").val().trim();
console.log(newIcon);
icons.push(newIcon);
console.log(icons);


var newButton = $("<button>");
newButton.addClass("icon");
newButton.attr("data-name", newIcon);
newButton.text(newIcon);

$("#buttons-display").append(newButton);

});



$(document).on("click", ".icon", function gifInfo () {

$("#display").empty();

var search = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

$.ajax({
url: queryURL,
method: "GET",
}).then(function(response){
    var results = response.data;

    for (var r = 0; r < results.length; r++) {
        console.log(results);

        var gifDiv = $("<div>");

        var gifBox = $("<img>");
        gifBox.addClass("gif");
        gifBox.attr("src", results[r].images.original_still.url);
        gifBox.attr("data-animate", results[r].images.original.url);
        gifBox.attr("data-still", results[r].images.original_still.url);
        gifBox.attr("data-state", "still");
        
        var ratingLabel = $("<p>");
        ratingLabel.text("Rated: " + results[r].rating.toUpperCase());

        gifDiv.append(gifBox);
        gifDiv.append(ratingLabel);

        $("#display").append(gifDiv);
    }
})
})

$(document).on("click", ".gif", function(){
var state = $(this).attr("data-state");

if (state === "still") {
$(this).attr("src", $(this).attr("data-animate"));
$(this).attr("data-state", "animate");
}

else {
$(this).attr("src", $(this).attr("data-still"));
$(this).attr("data-state", "still");

}
})

});