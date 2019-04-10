$(document).ready(function (){

    $("audio#cabana")[0].play();
        

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

    $(document).on("click", "#add-icon", function(event){
        event.preventDefault();

        $("audio#cranium")[0].play();

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

        $("audio#yoi-club")[0].play();

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

                var gifDiv = $("<div class='gif-large'>");

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

            
            for (var s = 0; s < results.length; s++) {
                console.log(results);

                var gifSmallDiv = $("<div class='gif-small'>");

                var gifBoxSmall = $("<img>");
                gifBoxSmall.addClass("gif");
                gifBoxSmall.attr("src", results[s].images.fixed_width_small_still.url);
                gifBoxSmall.attr("data-animate", results[s].images.fixed_width_small.url);
                gifBoxSmall.attr("data-still", results[s].images.fixed_width_small_still.url);
                gifBoxSmall.attr("data-state", "still");
                
                var ratingLabel = $("<p>");
                ratingLabel.text("Rated: " + results[s].rating.toUpperCase());

                gifDivSmall.append(gifBoxSmall);
                gifDivSmall.append(ratingLabel);

                $("#display").append(gifSmallDiv);
            }
        })
    })

    $(document).on("click", ".gif", function(){

        $("audio#double-yoi")[0].play();

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