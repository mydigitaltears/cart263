"use strict";

/********************************************************************

Title of Project
Xavier Touikan

Ideas:
  - Play as a bot seeking for optimal attention spam
  - Play as a parent who don't care about child
  - Play as child seeking dopamine
  - Play as youtube
  - Play as a content creator
  - Play as a bot designer
  - Litteraly monetize attention spam
  - Paid worker moderating content
  - Parent looking away
*********************************************************************/

let creepyTexts = [
  // "You should kill yourself",
  "You should not exist",
  "Your parents are going to abbandon you",
  "I will eat you alive",
  "You look like shit",
  "You have no friends",
  "Nobody likes you",
  "You're disgusting"
];

let languages = [
  "UK English Female",
  "UK English Male",
  "US English Male",
  "French Female",
  "French Male",
  "Italian Female",
]

let body;
let youtube;
let youtubeC;
let off;
let offC;
let on;
let onC
let baby;
let babyC;
let power = false;
let myT;
let start;
let tvC;
let button;
let kid;
let kidC;
let tears;

$(document).ready(setup);

let player;

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

function initialize(){
  player.playVideo();
  player.mute();
  player.setVolume(25);
}

function setup() {
  if (annyang) {
    // Use a click event to start so we don't run into trouble for audio
    $(document).on('click', starty);
  }

  body = $("body");
  youtube = $("#youtube");
  youtubeC = $(".youtubeC");
  youtubeC.css("display","none");
  off = $("#off");
  offC = $(".offC");
  offC.css("display","none");
  on = $("#on");
  onC = $(".onC");
  onC.css("display","none");
  baby = $("#baby");
  babyC = $(".babyC");
  baby.hide("slide");
  babyC.css("display","none")
  start = $("#start");
  tvC = $(".tvC");
  button = $("#button");
  kid = $("#kid");
  kidC = $(".kidC");
  kidC.css("display","none");
  tears = $("#tears");
  tears.hide();
}

function tvPower() {
  if(power == true){
    offC.css("display","block");
    youtubeC.css("display","none");
    babyC.css("display","none")
    player.mute();
    off[0].play();
    clearTimeout(myT);
    power = false;
    button.css("background-color","red");
  }
  else if(power == false) {
    onC.css("display","block");
    on[0].play();
    setTimeout(function() {
      youtubeC.css("display","block");
      onC.css("display","none");
      player.unMute();
    }, 1100)
    offC.css("display","none");
    power = true;
    loop();
    button.css("background-color","#00ff2a");
  }
}

function creep() {
  if(power==true) {
    let options = {
      pitch: Math.random(),
      rate: 1,
      volume: 1,
      onend: function(){
        player.setVolume(25)
        if(baby.is(":visible")==true){
          baby.hide("slide");
          setTimeout(function(){
            tears.hide("clip");
          }, 1000);
        }
      }
    };
    player.setVolume(5);
    let text = creepyTexts[Math.floor(Math.random() * creepyTexts.length)];
    let language = languages[Math.floor(Math.random() * languages.length)];
    responsiveVoice.speak(text,language,options);
    babyC.css("display","block");
    // baby.effect("shake");
    if(baby.is(":visible")==false){
      baby.show("slide");
      setTimeout(function(){
        tears.show("clip");
      }, 500);
    }
  }
}

function loop() {
    var rand = Math.floor(Math.random() * 5000) + 7000;
    console.log(rand);
    if(power == true){
      myT = setTimeout(function() {
        if(power == true) {
          creep();
          loop();
        }
      }, rand);
    }
}

function askTV() {
  responsiveVoice.speak(
    "Hey sweetie, would you like to watch some tv?",
    "US English Female"
  );
  start.css("display","none");
  tvC.css("display","block");
  button.css("display","block");
  kidC.css("display","block");
}

function starty() {
  console.log("start");
  let yes = {'yes': yesFunction};
  let off = {'turn it off': offFunction};
  let on = {'turn it on': yesFunction};
  annyang.addCommands(yes);
  annyang.addCommands(off);
  annyang.addCommands(on);
  annyang.start();
}

function yesFunction() {
  if(power==false){
    responsiveVoice.speak(
      "Okay! Let me turn it on for you.",
      "US English Female",
      {onend: function(){
        tvPower();
      }}
    );
  }
  else if(power==true){
    responsiveVoice.speak(
      "The tv is already on!",
      "US English Female"
    );
  }
}

function offFunction(){
  if(power==true){
    responsiveVoice.speak(
      "Okay! Let me turn it off.",
      "US English Female",
      {onend: function(){
        tvPower();
      }}
    );
  }
  else if(power==false){
    responsiveVoice.speak(
      "The tv is already off.",
      "US English Female"
    );
  }
}
