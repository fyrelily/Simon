
// Create a pattern

// While loop to keep game going?
var gamePattern = [];
var simonSays = ""
var userClickPattern = [];

var level = 0;
var started = false;

//Debug: Click to check pattern index and keypress to clear array 

// $(document).on("click", patternGenerator)

$(document).on("keypress", function (){
    $("h2").remove();
    if (!started){
        $("#level-title").text("Level " + level);
        patternGenerator();
        started = true;
        
}
});

$(".btn").click(function(event){
    
    var playerColorChoice = event.target.id;
    userClickPattern.push(playerColorChoice);
    playPlayersColor(playerColorChoice);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickPattern.length-1);

});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

      console.log("success");
      console.log(userClickPattern.length === gamePattern.length);

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            patternGenerator();
        }, 1000);

      }

    } else {
      var audio = new Audio ("./sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      $("#level-title").text("Game Over");
      setTimeout(function () {
        $("body").removeClass("game-over");
        }, 300);
      console.log("wrong");
      started = false;
      gamePattern = [];
      level = 0;
      $("h1").append("<h2 id='restart-title'>Press Any Key to Play Again.</h2>")

    }

}

function playPlayersColor(input){
    
    switch (input) {

    case "green":
        // console.log(patternArray[index]);
        var audio = new Audio("./sounds/green.mp3")
        audio.play();
        buttonFlash("#green");            
        break;

    case "red":
        var audio = new Audio("./sounds/red.mp3")
        audio.play();
        buttonFlash("#red");
    
    break;

    case "yellow":
        var audio = new Audio("./sounds/yellow.mp3")
        audio.play();
        buttonFlash("#yellow");
    break;

    case "blue":
        var audio = new Audio("./sounds/blue.mp3")
        audio.play();
        buttonFlash("#blue");
    break;

    default:
        break;
}
}
function patternGenerator() {
    
    userClickPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomPattern = Math.floor(Math.random()*4);
        
    if (randomPattern === 0) {
        simonSays =  "green";
    } 
    else if (randomPattern === 1) {
        simonSays = "red";
    }
    else if (randomPattern === 2) {
        simonSays = "yellow";
    } 
    else{
        simonSays = "blue";
    }

     repeatPattern (simonSays);

}

//Repeats Simons pattern with a delay
function repeatPattern (savedPattern) {
    gamePattern.push(savedPattern);
    for (i=0; i < gamePattern.length; i++){
        delay(i);
    }
    function delay(i){
        setTimeout(() => {replayPattern(i)
            
        },700*i);
    }
    console.log(gamePattern);
}

// Plays Simon Pattern and adds a delay
function replayPattern(index){
    playPattern(index);
}


function playPattern(input){

    switch (gamePattern[input]) {
    
        case "green":
            // console.log(patternArray[index]);
            var audio = new Audio("./sounds/green.mp3")
            audio.play();
            buttonFlash("#green");            
            
            break;

        case "red":
            var audio = new Audio("./sounds/red.mp3")
            audio.play();
            buttonFlash("#red");
        
        break;

        case "yellow":
            var audio = new Audio("./sounds/yellow.mp3")
            audio.play();
            buttonFlash("#yellow");
        break;

        case "blue":
            var audio = new Audio("./sounds/blue.mp3")
            audio.play();
            buttonFlash("#blue");
        break;

        default:
            break;
    }
}


// adds and removes the button flash
function buttonFlash(buttonID) {
    $(buttonID).addClass("pressed");
    
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    },300);
    
}
