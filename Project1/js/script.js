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

// form input variables
let firstName;
let lastName;
let favoriteFood;

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
}

function startButtonPressed() {
  //alert('Please fill out this form!');
  start.css("display", "none");
  firstForm.css("display", "block");
}

function firstFormButtonPressed() {
  //alert('Please watch this ad!');
  firstForm.css("display", "none");
  ad.css("display", "block");
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  p1.text(`Welcome ${firstName} ${lastName}!`)
  p2.text(`Thank you for your patience, this won't be long!`)
  vid[0].play();
  setTimeout(newForm, 1000);
}

function newForm() {
  //alert('Please fill out this form!');
  console.log("yo");
  vid[0].pause();
  ad.css("display", "none");
  informations.css("display", "none");
  secondForm.css("display", "block");
}

function secondFormButtonPressed() {
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
}

function italian() {
  console.log("italian");
  $(".travelAd h1").text(`${firstName}, Italy awaits you!`);
  $(".travelAd p").text("Click here for more informations");
}

function indian() {
  console.log("indian");
  $(".travelAd h1").text(`${firstName}, India awaits you!`);
  $(".travelAd p").text("Click here for more informations");
}

function mexican() {
  console.log("mexican");
  $(".travelAd h1").text(`${firstName}, Mexico awaits you!`);
  $(".travelAd p").text("Click here for more informations");
}

function travelButtonPressed() {
  location.reload();
}
