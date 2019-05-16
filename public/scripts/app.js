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
  const $pcont = $("<p>")
    .text(tweet.content.text)
    .addClass("content-tweet");
  const $headerSide = $("<aside>").text(tweet.user.handle);
  const $footer = $("<footer>").text(new Date(tweet.created_at));

  $div.append($img, $pName);
  $header.append($div, $headerSide);
  $tweet.append($header, $pcont, $footer);
  return $tweet;
}
//@@@ REFACTO TOUTE A SECTION RENDER ET LOADTWEETS
function renderNewTweet(tweet) {
  var $tweet = createTweetElement(tweet);
  $("#tweets-container").prepend($tweet);
}

function renderTweets(data) {
  for (const tweet of data) {
    var $tweet = createTweetElement(tweet);
    //console.log(tweet.user.name);
    $("#tweets-container").append($tweet);
  }
}
const loadTweets = onlyLast => {
  if (onlyLast) {
    console.log(onlyLast);
    $.ajax("/tweets", { method: "GET" }).then(function(theTweets) {
      renderTweets(theTweets.reverse());
    });
  } else {
    $.ajax("/tweets", { method: "GET" }).then(function(theTweets) {
      renderNewTweet(theTweets.pop());
    });
  }
};

// ??? difference entre expressive et autre
function errorMessage(text) {
  if (text === "text=") {
    return " YO y'a rien";
  } else if (text.length > 140) {
    return "140 et plus";
  } else {
    return true;
  }
}

//@@@ facto with
const alertValidation = text => {
  if (text === "text=") {


    alert(" YO y'a rien");
    return false;
  } else if (text.length > 140) {
    alert(" 140 et plus");
    return false;
  } else {
    return true;
  }
};

$(function() {
  $("form").on("submit", function(event) {
    event.preventDefault();
    let contentTweet = $(this).serialize(); //@@@ changer pour le length de textarea
    if (alertValidation(contentTweet)) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(response => {
        // Creating and adding all the posts to the page
        console.log("CA MARCHE!"); //@@@ remove
        loadTweets(false);
      });
    }
    $("#error").append(errorMessage(contentTweet));
    
    //location.reload(); //reload @@@ voir si c'est le bon truc
  });
});

//@@@ voir comment mettre fans une fonction
/* function buttonToggle() {
  $("#btnCompose").click(function() {
    $("section .new-tweet").toggle();
  });
} */

$(document).ready(() => {
  loadTweets(true);
  $("button").click(function(e) {
    $("section").slideToggle(500, "linear");
    preventDefault(e);
    $(".new-tweet form textarea").focus();
  });
});
