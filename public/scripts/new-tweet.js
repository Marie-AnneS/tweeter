

//@@@ facto with 
const alertValidation = text => {
  if (text === "text=") {
    alert(" YO y'a rien");
    return false
  } else if (text.length > 140) {
    alert(" 140 et plus");
    return false
  } else {
    return true
  }
};

$(function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    let contentTweet = $(this).serialize();
    if (alertValidation(contentTweet)) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(response => {
        // Creating and adding all the posts to the page
        console.log("CA MARCHE!"); //@@@ remove
      });
    }
    location.reload(); //reload @@@ voir si c'est le bon truc
  });
});
