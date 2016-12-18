$(document).ready(function() {

$.ajax({
    type: "GET",
    // setting the origin to * seems to get around the cors issue
    url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&origin=*&page=taco",
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

        // parsing out everything but the paragraph text
        display = display.find("p");

    // render to HTML
    $("#searchResult").html(display);

    }
});






});  // end script
