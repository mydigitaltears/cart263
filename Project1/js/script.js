"use strict";

/********************************************************************

Project 1 (neverending ads)
Xavier Touikan

*********************************************************************/

$(document).ready(setup);

// html elements
let vid;
let start;
let firstForm;
let secondForm;
let ad;
let informations;
let p1;
let p2;
let travelAd;
let counter;
let body;
let countdown;
let audioError;

// form input variables
let firstName;
let lastName;
let favoriteFood;

//intervals
let startInterval;
let countdownInterval;

//other variables;
let count = 0;
let maxCount = 5;
let adCount = 0;
const adDuration = 10;

function setup() {
  // Associating all of my variables
  vid = $("#myVideo");
  vid.attr("src","./assets/videos/ad.mp4");
  start = $(".start");
  firstForm = $(".firstForm");
  secondForm = $(".secondForm");
  ad = $(".ad")
  informations = $(".informations");
  p1 = $("#p1");
  p2 = $("#p2");
  travelAd = $(".travelAd");
  counter = $(".counter");
  body = $("body");
  countdown = $(".countdown");
  audioError = $("#errorAudio");
  // interval to make a flashy random color background
  startInterval = setInterval(backgroundFlash, 100);
}

// random color background
function backgroundFlash() {
  let r = Math.random()*255;
  let g = Math.random()*255;
  let b = Math.random()*255;
  body.css("background-color", `rgb(${r},${g},${b})`)
}

// increment the step count on top
function incrementCount() {
  count ++;
  counter.text(`Step ${count} out of ${maxCount}`);
}

// increment the ad countdown
function adCountDown() {
  adCount ++;
  countdown.text(`${adCount} / ${adDuration}`)
}

// function called the first button is pressed
function startButtonPressed() {
  // clear the flashy background interval
  clearInterval(startInterval);
  // sets the background to the vaporwave picture
  body.css("background-image",'url("./assets/images/vapor.jpg")');
  // hide the div from the start
  start.css("display", "none");
  // show the first form and the counter
  firstForm.css("display", "block");
  counter.css("display", "block");
  incrementCount();
  // modal dialog box
  $( "#form1" ).dialog({
    dialogClass: "no-close",
    modal: "true",
    buttons: [
      {
        text: "OK",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
    ]
  });
}

// function called when the first form is submited
function firstFormButtonPressed() {
  // record the first and last name values
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  // check if they are empty
  if(firstName === "" || lastName === ""){
    alert("Please enter your informations!")
  }
  // if both values are not empty go to the next step
  else {
    incrementCount();
    // hide the first form
    firstForm.css("display", "none");
    // show the video ad and the countdown at the bottom
    ad.css("display", "block");
    countdown.css("display", "block");
    countdown.text(`${adCount} / ${adDuration}`);
    p1.text(`Welcome ${firstName} ${lastName}!`);
    p2.text(`Thank you for your patience, this won't be long!`);
    // modal dialog box
    $( "#ad1" ).dialog({
      dialogClass: "no-close",
      modal: "true",
      buttons: [
        {
          text: "OK",
          click: function() {
            // only starts playing the video when ok is clicked
            $( this ).dialog( "close" );
            vid[0].play();
            // go to the next step after 10 seconds
            setTimeout(newForm, 10000);
            // countdown to track time
            countdownInterval = setInterval(adCountDown, 1000);
          }
        }
      ]
    });
  }
}

// function called after the video ad is watched
function newForm() {
  incrementCount();
  // pause the video and clear the countdown interval
  vid[0].pause();
  clearInterval(countdownInterval);
  // hide the ad and the countdown and show the second form
  countdown.css("display", "none");
  ad.css("display", "none");
  informations.css("display", "none");
  secondForm.css("display", "block");
  // now the background image is glitched
  body.css("background-image",'url("./assets/images/vaporG.png")');
  // modal dialog box
  $( "#form2" ).dialog({
    dialogClass: "no-close",
    modal: "true",
    buttons: [
      {
        text: "OK",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
    ]
  });
}

// function called when the second form is submited
function secondFormButtonPressed() {
  incrementCount();
  // hide the second form
  secondForm.css("display", "none");
  // record the answer of the form
  favoriteFood = $("input:checked").val();
  // call a specific function depending on the answer
  if(favoriteFood === "libanese") {
    libanese();
  }
  else if(favoriteFood === "italian") {
    italian();
  }
  else if(favoriteFood === "indian") {
    indian();
  }
  else if(favoriteFood === "mexican") {
    mexican();
  }
  // show the next step
  travelAd.css("display", "block");
}

// The next functions are the same but the country name and the background change
function libanese() {
  $(".travelAd h1").text(`${firstName}, Lebanon awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("./assets/images/lebanon.png")');
  $(".travelAd").css("background-color", "background-color: rgba(20,140,255,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px orange");
}

function italian() {
  $(".travelAd h1").text(`${firstName}, Italy awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("./assets/images/italy.png")');
  $(".travelAd").css("background-color", "background-color: rgba(0,200,80,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px red");
}

function indian() {
  $(".travelAd h1").text(`${firstName}, India awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("./assets/images/india.png")');
  $(".travelAd").css("background-color", "background-color: rgba(200,140,255,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px orange");
}

function mexican() {
  $(".travelAd h1").text(`${firstName}, Mexico awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("./assets/images/mexico.png")');
  $(".travelAd").css("background-color", "background-color: rgba(255,100,40,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px green");
}

// page crashes and refresh when last button is pressed
function travelButtonPressed() {
  // hide the travel ad + top counter
  travelAd.css("display", "none");
  counter.css("display", "none");
  // background turns into a blue screen
  body.css("background-image", 'url("https://media.giphy.com/media/Q61LJj43H48z1FIK4X/giphy.gif")');
  // set interval for error sound
  setInterval(errorSound, 100);
  // refreshes after 4 seconds
  setTimeout(function(){location.reload(); }, 4000)
}

// error sounds
function errorSound() {
  audioError[0].play();
  // cloneNode in order to play the sound twice at the same time
  audioError[0].cloneNode(true).play();
}
