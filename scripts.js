$(document).ready(function() {

$("#noEntryMessage").hide();

$("#wikiSearchButton").click(function() {

    // fade out any content currently on page before loading new content
    $("#searchResultContainer").hide();

    // assign input value to variable
    var searchTerm = $("#wikiInput").val();

    if (searchTerm) {
        $("#noEntryMessage").hide();
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
    } else {
        $("#noEntryMessage").show();
    }
});

// Random wikipedia entry in a new window
$("#wikiRandomButton").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
});

});  // end script
