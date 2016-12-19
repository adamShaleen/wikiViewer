$(document).ready(function() {

$("#wikiSearchButton").click(function() {

    // fade out any content currently on page before loading new content
    $("#searchResultContainer").hide();

    // assign input value to variable
    var searchTerm = $("#wikiInput").val();

    $.ajax({
        type: "GET",
        // setting the origin to * seems to get around the cors issue
        url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&origin=*&page=" + searchTerm,
        success: function(data) {

            // JSON returned object
            var markup = data.parse.text["*"];

            // Setting JSON in a div
            var display = $("<div></div>").html(markup);

            // removing links
            display.find("a").each(function() {
                $(this).replaceWith($(this).html());
            });

            // removing references
            display.find("sup").remove();

            // title
            var title = data.parse.displaytitle;

            // paragraph text
            var paragraph = display.find("p");

            // render to HTML
            $("#searchTitle").html(title);
            // $("#image").attr("src", image);
            $("#searchParagraph").html(paragraph);

            $("#searchResultContainer").fadeIn();

        }
    });

});

// Random wikipedia entry
$("#wikiRandomButton").click(function() {

    $.ajax({
        type: "GET",
        url: "",    // TODO
        success: function(data) {
            console.log(data);
        }
    });
});

});  // end script
