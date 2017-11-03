$(document).ready(function() {

// hide optional messages upon load
$("#noEntryMessage").hide();
$("#invalidSearchMessage").hide();
$("#loader").hide();

$("#wikiSearchButton").click(function() {

    // fade out any content currently on page before loading new content
    $("#searchResultContainer").hide();

    // start loader animation
    $("#loader").show();

    // assign input value to variable
    var searchTerm = $("#wikiInput").val();

    // if the search is valid envoke AJAX HTTP call to wiki API using input value as search
    if (searchTerm) {
        $("#noEntryMessage").hide();
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&origin=*&page=" + searchTerm,
            success: function(data) {

                // if the search isn't a valid word/phrase display the invalid search message
                if (data.error) {
                    $("#loader").hide();
                    $("#invalidSearchMessage").show();
                }

                // JSON returned object
                var markup = data.parse.text["*"];

                // title
                var title = data.parse.displaytitle;

                // Setting JSON in a div
                var paragraph = $("<div></div>").html(markup);
                // var paragraph = $("<div></div>").append(JSON.stringify(markup)); <-- new thing I'm trying

                //removing unwanted content from return object
                paragraph.find("a").each(function() {$(this).replaceWith($(this).html());});
                paragraph.find("sup").remove();
                paragraph.find("ol").remove();
                paragraph.find("img").remove();
                paragraph.find("table").remove();
                paragraph.find("audio").remove();
                if (paragraph.find("div").hasClass("hatnote")) {paragraph.find("div").remove();}

                // render to HTML
                $("#searchTitle").html(title);
                $("#searchParagraph").html(paragraph);

                // hide and show proper content
                $("#searchResultContainer").fadeIn();
                $("#loader").hide();
                $("#invalidSearchMessage").hide();
            }
        });
     } else {
         // if search term is not valid hide and show proper content
        $("#noEntryMessage").show();
        $("#invalidSearchMessage").hide();
        $("#loader").hide();
    }
});

// Random wikipedia entry in a new window
$("#wikiRandomButton").click(function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
});

});  // end script
