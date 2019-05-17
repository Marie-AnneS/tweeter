/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {
  /* Article */
  let $tweet = $("<article>").addClass("tweet");
  const $header = $("<header>");
  const $div = $("<div>");
  const $img = $("<img />")
    .attr("src", tweet.user.avatars.small)
    .attr("alt", `profile picture of ${tweet.user.name}`);
  const $pName = $("<p>")
    .text(tweet.user.name)
    .addClass("name");
  const $pcont = $("<p>")  /* @@@ voir pou rle body */
    .text(tweet.content.text)
    .addClass("content-tweet");
  const $headerSide = $("<aside>").text(tweet.user.handle);
  const $footer = $("<footer>").text(new Date(tweet.created_at));

  $div.append($img, $pName);
  $header.append($div, $headerSide);
  $tweet.append($header, $pcont, $footer);
  return $tweet;
}

/* @@@ oublier de mettre les flag */

//@@@ REFACTO TOUTE A SECTION RENDER ET LOADTWEETS

function renderTweets(data) {
  for (const tweet of data) {
    var $tweet = createTweetElement(tweet);
    //console.log(tweet.user.name);
    $("#tweets-container").prepend($tweet);
  }
}

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then(function(theTweets) {
    renderTweets(theTweets);
  });
};

// ??? difference entre expressive et autre
function errorMessage(nb) {
  if (nb === 0) {
    return " ❎ the tweet area is empty";
  } else if (nb > 140) {  
    return " 🚫 exceeds the 140 character limit";
  } else {
    return false;
  }
}

//@@@ facto with
/* const alertValidation = nb => {
  if (nb === 0) {
    //alert(" YO y'a rien");
    return false;
  } else if (nb > 140) {
    alert(" 140 et plus");
    return false;
  } else {
    return true;
  } 
};*/
//!!!function pour appelle ajax

//@@@ voir comment mettre fans une fonction
/* function buttonToggle() {
  $("#btnCompose").click(function() {
    $("section .new-tweet").toggle();
  });
} */

$(document).ready(() => {
  loadTweets();
  //btn compose
  $("button").click(function(e) {
    $("section").slideToggle(500, "linear");
    e.preventDefault();
    $(".new-tweet form textarea").focus();
  });

  //Input
  $("form").on("submit", function(event) {
    $("#error").empty();
    $("section").removeClass("error");
    event.preventDefault();
    let lengthTweet = $(".new-tweet form textarea").val().length;
    console.log(lengthTweet);
    if (!errorMessage(lengthTweet)) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(response => {
        // Creating and adding all the posts to the page
        console.log(response); //@@@ remove
        renderTweets([response]);
        $(".new-tweet form textarea").val('');
      });
    } else {
      $("#error").append(errorMessage(lengthTweet));
      $("section").addClass("error");
      $(".new-tweet form textarea").focus(function(){
        $("#error").empty();
        $("section").removeClass("error");

      });
    }
    //location.reload(); //reload @@@ voir si c'est le bon truc
  });
});
