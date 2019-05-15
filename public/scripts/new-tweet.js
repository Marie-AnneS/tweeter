$(function() {
  var $button = $(".new-tweet form textarea");
  console.log($button);

  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize());

    $.ajax({
      url: "/tweets",
      method: 'POST',
      data: $(this).serialize(),
      //type: "POST"
    }).done(response => {
      // Creating and adding all the posts to the page
      console.log(("CA MARCHE!"));
    });
  });
});
