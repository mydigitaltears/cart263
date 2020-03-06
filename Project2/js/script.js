"use strict";

/********************************************************************

Title of Project
Xavier Touikan

*********************************************************************/

// Mean texts
let creepyTexts = [
  "You should not exist",
  "Your parents are going to abbandon you",
  "I will eat you alive",
  "You look like shit",
  "You have no friends",
  "Nobody likes you",
  "You're disgusting"
];

// Variety of languages for the responsive voices
let languages = [
  "UK English Female",
  "UK English Male",
  "US English Male",
  "French Female",
  "French Male",
  "Italian Female",
]

// DOM variables
let body;
// Youtube player and container
let youtube;
let youtubeC;
// Turn off player and container
let off;
let offC;
// Turn on player and container
let on;
let onC
// Creepy baby image and container
let baby;
let babyC;
// Start button
let start;
// Tv container
let tvC;
// Power button
let button;
// Kid image and container
let kid;
let kidC;
// Tears gif
let tears;
// Crying sound
let crying;

// Other variables
let cryCount = 0;
let power = false;
// Random interval for creepy interventions
let myT;

$(document).ready(setup);

// Youtube player (code mostly taken online)
let player;
// ChuChuTV livestream used as a tv channel
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 560,
        height: 315,
        videoId: 'MzMHDXK_cTw',
        playerVars: {
            controls: 0,
            color: 'white'
        },
        events: {
            onReady: initialize
        }
    });
}
// Initialize the player while muted and hidden
function initialize(){
  player.playVideo();
  player.mute();
  player.setVolume(25);
}

// Setup()
function setup() {
  // Initialize annyang
  if (annyang) {
    // Use a click event to start so we don't run into trouble for audio
    $(document).on('click', annyangInit);
  }
  // Associating the DOM elements to variables
  body = $("body");
  youtube = $("#youtube");
  youtubeC = $(".youtubeC");
  off = $("#off");
  offC = $(".offC");
  on = $("#on");
  onC = $(".onC");
  baby = $("#baby");
  babyC = $(".babyC");
  start = $("#start");
  tvC = $(".tvC");
  button = $("#button");
  kid = $("#kid");
  kidC = $(".kidC");
  tears = $("#tears");
  // I don't know why sound was not working with Jquery selection
  crying = document.getElementById("crying");
  // Hiding some elements
  babyC.css("display","none")
  onC.css("display","none");
  offC.css("display","none");
  youtubeC.css("display","none");
  kidC.css("display","none");
  // Hiding elements that will use jquery effects
  baby.hide("slide");
  tears.hide("clip");
}

// anyangInit()
function annyangInit() {
  // Initializing annyang commands
  // We have: yes, turn it on, turn it off
  let yes = {'yes': yesFunction};
  let off = {'turn it off': offFunction};
  let on = {'turn it on': yesFunction};
  annyang.addCommands(yes);
  annyang.addCommands(off);
  annyang.addCommands(on);
  annyang.start();
}

// askTV: Called after pressing the start button
function askTV() {
  // Voice ask if user wants to watch TV
  responsiveVoice.speak(
    "Hey sweetie, would you like to watch some tv?",
    "US English Female"
  );
  // Displaying the tv and hiding the start button
  start.css("display","none");
  tvC.css("display","block");
  button.css("display","block");
  kidC.css("display","block");
}

// yesFunction(): Called called when the user says "yes" or "turn it on"
function yesFunction() {
  // if the tv is off, turns it on
  if(power==false){
    responsiveVoice.speak(
      "Okay! Let me turn it on for you.",
      "US English Female",
      {onend: function(){
        tvPower();
      }}
    );
  }
  // do nothing if the tv is already on
  else if(power==true){
    responsiveVoice.speak(
      "The tv is already on!",
      "US English Female"
    );
  }
}
// offFunction(): Called when the user says "turn it off"
function offFunction(){
  // if the tv is on, turns it off
  if(power==true){
    responsiveVoice.speak(
      "Okay! Let me turn it off.",
      "US English Female",
      {onend: function(){
        tvPower();
      }}
    );
  }
  // do nothing if the tv is already off
  else if(power==false){
    responsiveVoice.speak(
      "The tv is already off.",
      "US English Female"
    );
  }
}

// tvPower(): Function that turns the TV on and off
function tvPower() {
  // if the tv is on, turns it off
  if(power == true){
    // hiding and showing some elements
    offC.css("display","block");
    youtubeC.css("display","none");
    babyC.css("display","none")
    // muting the youtube iframe
    player.mute();
    // plays the transition video
    off[0].play();
    // clears the random interval for the creepy baby
    clearTimeout(myT);
    // sets the power boolean to false
    power = false;
    // change the power button color
    button.css("background-color","red");
    // hide baby tears
    tears.hide("clip");
  }
  // if the tv is off, turns it on
  else if(power == false) {
    // shows and plays the video transition
    onC.css("display","block");
    on[0].play();
    // starts displaying and unmuting the youtube iframe after the transition video
    // (Could have used an onend function for this!)
    setTimeout(function() {
      youtubeC.css("display","block");
      onC.css("display","none");
      player.unMute();
    }, 1100)
    // hiding the video transition
    offC.css("display","none");
    // sets the power boolean to true
    power = true;
    // loop function for the random creepy baby intervals
    loop();
    // change the power button color
    button.css("background-color","#00ff2a");
  }
}

// loop(): Function that sets random intervals for the creepy baby interventions
function loop() {
    // random + a minimum of 7 seconds
    var rand = Math.floor(Math.random() * 5000) + 7000;
    // only sets a new timeout is the tv is on
    if(power == true){
      myT = setTimeout(function() {
        if(power == true) {
          creep();
          loop();
        }
      }, rand);
    }
}

// creep(): Function that shows the creepy baby and says mean things
function creep() {
  // only works if the tv is on
  if(power==true) {

    // options for the responsive voice
    let options = {
      // random pitch
      pitch: Math.random(),
      // Multiple effects at the end
      onend: function(){
        // sets back the youtube volume to 25
        player.setVolume(25)
        // if the creepy baby is visible
        if(baby.is(":visible")==true){
          // hide it
          baby.hide("slide");
          // hide the tears one second later
          setTimeout(function(){
            tears.hide("clip");
          }, 1000);
        }
      }
    };
    // lowers the volume to 5 while the responsive voice talks
    player.setVolume(5);
    // selects one random creepy text from the list and a random voice
    let text = creepyTexts[Math.floor(Math.random() * creepyTexts.length)];
    let language = languages[Math.floor(Math.random() * languages.length)];
    // responsive voice speaks the random text with the random langauge and the options
    responsiveVoice.speak(text,language,options);
    // displaying the creepy baby
    babyC.css("display","block");
    // if the baby is not visible
    if(baby.is(":visible")==false){
      // show it
      baby.show("slide");
      // show the tears 700 ms later
      setTimeout(function(){
        tears.show("clip");
        // play the crying sound
        crying.play();
        // increment the crying count
        cryCount ++;
        // turns off the tv when the cryCount = 3
        if(cryCount > 2){
          // timeout used so it doesn't overlaps with the last responsive voice
          setTimeout(function(){
            // thats enough!
            responsiveVoice.speak(
              "Ok that's enough.",
              "US English Female",
              // turns off the tv onend
              {onend: function(){
                tvPower();
              }}
            );
            // sets cryCount back to 0
            cryCount = 0;
          }, 1500); // Delay before the "parent" intervention
        }
      }, 700); // Delay before the tears and crying shows up
    }
  }
}
