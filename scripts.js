$(document).ready(function() {

$("#noEntryMessage").hide();

$("#loader").hide();

$("#wikiSearchButton").click(function() {

    // fade out any content currently on page before loading new content
    $("#searchResultContainer").hide();

    $("#loader").show();

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

                // title
                var title = data.parse.displaytitle;

                // Setting JSON in a div
                var paragraph = $("<div></div>").html(markup);

                //removing unwanted content from return object
                paragraph.find("a").each(function() {
                    $(this).replaceWith($(this).html());
                });

                paragraph.find("sup").remove();

                paragraph.find("ol").remove();

                paragraph.find("img").remove();

                paragraph.find("table").remove();

                paragraph.find("audio").remove();

                if (paragraph.find("div").hasClass("hatnote")) {
                    paragraph.find("div").remove();
                }

                // render to HTML
                $("#searchTitle").html(title);
                $("#searchParagraph").html(paragraph);

                $("#searchResultContainer").fadeIn();
                $("#loader").hide();
            }
        });
     } else {
        $("#noEntryMessage").show();
        $("#loader").hide();
    }
});

// Random wikipedia entry in a new window
$("#wikiRandomButton").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
});

});  // end script
