/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
/* const data = [
  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  }
];
 */

function renderTweets(data) {
  for (const tweet of data) {
    var $tweet = createTweetElement(tweet);
    //console.log(tweet.user.name);
    $("#tweets-container").append($tweet);
  }
}

function loadTweets() {
  $.ajax("/tweets", { method: "GET" }).then(function(theTweets) {
    console.log(renderTweets(theTweets.reverse()));
  });
}

function createTweetElement(tweet) {
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
//@@@ voir comment mettre fans une fonction
/* function buttonToggle() {
  $("#btnCompose").click(function() {
    $("section .new-tweet").toggle();
  });
} */

$(document).ready(() => {
  $("button").click(function(e){
    $("section").slideToggle(500, "linear");
    preventDefault(e);
    $(".new-tweet form textarea").focus();
  });
  loadTweets();
});
