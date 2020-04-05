
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function(){
  if(!started){


    $("#level-title").text("level" +level);
    nextSequence();
    started = true;
  }
});


//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
      console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}


function nextSequence() {

  //. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

var randomNumber = Math.floor((Math.random() * 4))
var randomChosencolour = buttonColours[randomNumber];
gamePattern.push(randomChosencolour);
$("#"+randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio(+ name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
