$(document).ready(function() {

$.ajax({
    type: "GET",
    url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=taco",
    success: function(data) {
        var result = data.parse.text["*"];
        console.log(data.parse.text["*"]);
        $("#searchResult").html(result);
    }
});






});  // end script
