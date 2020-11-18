/*............................Variables.....................................*/

var buttonColor = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = true;

/*............................Functions.....................................*/

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(
    function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
          nextSequence();
        }, 1000);
    }
  }
  else{
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }
}

function startOver(){
  start = true;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

/*............................Commands.....................................*/

$("body").keydown(function(){
  if (start == true){
    nextSequence();
    $("#level-title").text("Level " + level);
    start = false;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
