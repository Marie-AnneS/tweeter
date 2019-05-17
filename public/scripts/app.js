/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//  create html tag with JQuery
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
  const $footer = $("<footer>").html("<script>moment('01/12/2016', 'DD/MM/YYYY', true).format()</script>"); //new Date(tweet.created_at).getDate()
  const $divIcon = $("<div>").html('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');
  
  $footer.append($divIcon);
  $div.append($img, $pName);
  $header.append($div, $headerSide);
  $tweet.append($header, $pcont, $footer);
  return $tweet;
}

function renderTweets(data) {
  for (const tweet of data) {
    var $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
}

const loadTweets = () => {
  $.ajax("/tweets", { method: "GET" }).then(function(theTweets) {
    renderTweets(theTweets);
  });
};

function errorMessage(nb) {
  if (nb === 0) {
    return " ❎ the tweet area is empty";
  } else if (nb > 140) {  
    return " 🚫 exceeds the 140 character limit";
  } else {
    return false;
  }
}

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
    if (!errorMessage(lengthTweet)) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      }).done(response => {
        // Creating and adding all the posts to the page
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
  });
});
