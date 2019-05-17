$(document).ready(function() {
  $(".new-tweet form textarea").on("keydown", function(event) {
    var maxLength = 139;
    var length = $(this).val().length;
    var inverseLength = maxLength - length;
    /* Swicht color in Jquery */
    const color = inverseLength < 0 ? "red" : "#33545E";
    $(".counter").css("color", color);
    $(".counter").text(inverseLength);
  });
});
