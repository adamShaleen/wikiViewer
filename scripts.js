$(document).ready(function() {

$("#noEntryMessage").hide();

$("#wikiSearchButton").click(function() {

    // fade out any content currently on page before loading new content
    $("#searchResultContainer").hide();

    // assign input value to variable
    var searchTerm = $("#wikiInput").val();

    if (searchTerm) {
        $("#noEntryMessage").hide();
        $("#moreSpecificMessage").hide();
        $.ajax({
            type: "GET",
            // setting the origin to * seems to get around the cors issue
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&origin=*&page=" + searchTerm,
            success: function(data) {

                // JSON returned object
                var markup = data.parse.text["*"];

                // Setting JSON in a div
                var paragraph = $("<div></div>").html(markup);

                //removing unwanted content from return object
                paragraph.find("a").each(function() {
                    $(this).replaceWith($(this).html());
                });
                // paragraph.find("sup").remove();
                // paragraph.find("ol").remove();
                // paragraph.find("div").remove();
                // paragraph.find("table").remove();

                // title
                var title = data.parse.displaytitle;

                // render to HTML
                $("#searchTitle").html(title);
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
