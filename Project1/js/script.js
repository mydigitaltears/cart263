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
  startInterval = setInterval(backgroundFlash, 100);
}

function incrementCount() {
  count ++;
  counter.text(`Step ${count} out of ${maxCount}`);
}

function backgroundFlash() {
  let r = Math.random()*255;
  let g = Math.random()*255;
  let b = Math.random()*255;
  body.css("background-color", `rgb(${r},${g},${b})`)
}

function startButtonPressed() {
  clearInterval(startInterval);
  body.css("background-color", `lightblue`)
  start.css("display", "none");
  firstForm.css("display", "block");
  counter.css("display", "block");
  incrementCount();
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

function firstFormButtonPressed() {
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  if(firstName === "" || lastName === ""){
    alert("Please enter your informations!")
  }
  else {
    incrementCount();
    firstForm.css("display", "none");
    ad.css("display", "block");
    countdown.css("display", "block");
    countdown.text(`${adCount} / ${adDuration}`)
    p1.text(`Welcome ${firstName} ${lastName}!`)
    p2.text(`Thank you for your patience, this won't be long!`)
    $( "#ad1" ).dialog({
      dialogClass: "no-close",
      modal: "true",
      buttons: [
        {
          text: "OK",
          click: function() {
            $( this ).dialog( "close" );
            vid[0].play();
            setTimeout(newForm, 10000);
            countdownInterval = setInterval(adCountDown, 1000);
          }
        }
      ]
    });
  }
}

function newForm() {
  incrementCount();
  vid[0].pause();
  clearInterval(countdownInterval);
  countdown.css("display", "none");
  ad.css("display", "none");
  informations.css("display", "none");
  secondForm.css("display", "block");
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

function secondFormButtonPressed() {
  incrementCount();
  secondForm.css("display", "none");
  favoriteFood = $("input:checked").val();
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
  travelAd.css("display", "block");
}

function libanese() {
  console.log("libanese");
  $(".travelAd h1").text(`${firstName}, Lebanon awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2667,w_4000,x_0,y_0/c_limit,dpr_3.0,f_auto,fl_lossy,q_80,w_500/shutterstock_600019766_yjcu5f.jpg")');
  $(".travelAd").css("background-color", "background-color: rgba(20,140,255,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px orange");
}

function italian() {
  console.log("italian");
  $(".travelAd h1").text(`${firstName}, Italy awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("https://indietravelpodcast.com/wp-content/uploads/2016/04/Dollarphotoclub_italy-1920x1280.jpg")');
  $(".travelAd").css("background-color", "background-color: rgba(0,200,80,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px red");
}

function indian() {
  console.log("indian");
  $(".travelAd h1").text(`${firstName}, India awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg")');
  $(".travelAd").css("background-color", "background-color: rgba(200,140,255,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px orange");
}

function mexican() {
  console.log("mexican");
  $(".travelAd h1").text(`${firstName}, Mexico awaits you!`);
  $(".travelAd p").text("Click here for more informations");
  body.css("background-image",'url("https://cdn.britannica.com/60/92960-050-327CF926/pyramid-Mayan-Chichen-Itza-Mex.jpg")');
  $(".travelAd").css("background-color", "background-color: rgba(255,100,40,0.8)");
  $(".travelAd").css("text-shadow", "2px 2px green");
}

function travelButtonPressed() {
  location.reload();
}

function adCountDown() {
  adCount ++;
  countdown.text(`${adCount} / ${adDuration}`)
}
