$(document).ready(function() {
  $(".new-tweet form textarea").on("keydown", function(event) {
    //console.log(event)
    var maxLength = 140;
    //compte le nombre de caractere
    var length = $(this).val().length;
    //console.log($(this).val())

    var inverseLength = maxLength - length;
    //console.log(`decompte inverse : ${inverseLength}`)
    const color = inverseLength < 0 ? "red" : "#33545E";
    $(".counter").css("color", color);
    $(".counter").text(inverseLength);
  });
});
