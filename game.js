gamePattern = []; //CREATE AN ARRAY WHERE ALL THE RANDOM COLORS WILL BE STORED.

userClickedPattern = []; //CREATE AN ARRAY WHERE EVERY BUTTON PRESSED BY THE USER WILL BE STORED.

buttonColors = ["red","blue","green","yellow"]; //CREATE AN ARRAY THAT CONTAINS ALL THE COLORS.

var level = 0;


function nextSequence(){ 
    level++; // INCREASE LEVEL EVERY TIME THE FUNCTION IS CALLED.

    $("h1").text("LEVEL"+level); // CHANGE THE TITLE TO LEVEL.

    var rand_num;
    rand_num = (Math.random() * 4);
    rand_num = Math.floor(rand_num); //CREATE A NUMBER FROM 0-3
   

    randomChosenColor = buttonColors[rand_num] ; //PICK THE RANDOM COLOR FROM THE ARRAY.

    gamePattern.push(randomChosenColor); //ADD THE RAND COLOR TO THE ARRAY OF SEQUENCES.

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //FLASH THE SELECTED SQUARE.

    PlaySound(randomChosenColor);//SOUND OF THE BTN THAT HAVE BEEN RANDOMLY SELECTED.

    //console.log(gamePattern);

}

$(".btn").on("click",function() { //EVERY TIME WE CLICK ON A BTN,THE COLOR OF THE BTN WILL BE STORED IN AN ARRAY.

    var userChosenColor = $(this).attr("id"); //ISOLATE THE ID OF THE BTN.
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor); //PUSH THE ID OF THE BTN TO THE ARRAY.
    console.log(userClickedPattern);

    PlaySound(userChosenColor);//SOUND OF THE BTN THAT HAVE BEEN PRESSED.

    animatePress(userChosenColor);//ADD AN REMOVE THE PRESSED CLASS.

    checkAnswer(userClickedPattern.length - 1);//CALL CHECK ANSWER TAKING AS A PARAMETER THE INDEX OF THE USER CLICK ARRAY
    
})

function PlaySound(Color){

    var audio = new Audio ("sounds/"+Color+".mp3"); //MAKE ELEMNT AUDIO.
    audio.play(); //PLAY AUDIO ELEMENT.

}

function animatePress(currentColor){
  
 $("#"+currentColor).addClass("pressed");//ADD CLASS PRESSED.

 setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");//REMOVE CLASS PRESSED AFTER 1OO MILI.
}, 100);

}

$("body").one("click",nextSequence)//FIRST TIME THE USER PRESSES A BUTTON CALL NEXTSEQUENCE.

function checkAnswer(currentLevel){
    
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

             if (userClickedPattern.length === gamePattern.length) {//IF THE USER'S ARRAY LENGTH IS EQUAL TO GAME'S PATTERN ARRAY.
                
                setTimeout(nextSequence,1000); // CALL NEXT SEQUENCE TO CONTINIUE THE GAME.
                userClickedPattern = []; // EMPTY THE USER'S ARRAY TO START FROM THE BEGGINGING.

            }
             
        }else { // IF USER'S CHOICE IS WRONG.

            PlaySound("wrong");// PLAY THE WRONG SOUND.

            $("body").addClass("game-over"); // ADD CLASS GAME-OVER TO CHANGE THE BODY'S BACKGROUND COLOR.

            setTimeout(function(){$("body").removeClass("game-over");},500); // ADD CLASS GAME-OVER TO CHANGE THE BODY'S BACKGROUND COLOR.

            $("h1").text("GAME OVER"); //DISPLAY GAME OVER.

            Restart()//RESTART THE GAME BY CALLING THE RESTART FUNCTION.

        }
   
}

function Restart(){

    userClickedPattern = []; // EMPTY THE USER'S ARRAY. 
    gamePattern = []; // EMPTY THE GAME'S ARRAY.
    level = 0; // RESTART THE LEVEL.

    setTimeout(function(){window.location.reload(false);},1000); // REFRESH THE PAGE AFTER 1000 MILISECOND.
    
}
  
    





