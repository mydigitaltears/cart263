"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

$(document).ready(setup);


function setup() {
  $.getJSON("data/data.json")
    .done(dataLoaded)
    .fail(dataError)
}

function dataLoaded(data) {
  let randomCondiment = getRandomElement(data.condiments);
  let randomRoom = getRandomElement(data.rooms);
  let randomCat = getRandomElement(data.cats);
  let randomGame = getRandomElement(data.games);
  let randomGenre = getRandomElement(data.genres);

  let verb = "is";
  if(randomCondiment.charAt(randomCondiment.length - 1) == "s"){
    verb = "are";
  }

  let aRoom = "a";
  if (
      randomRoom.charAt(randomRoom[1]) == "a" ||
      randomRoom.charAt(randomRoom[1]) == "e" ||
      randomRoom.charAt(randomRoom[1]) == "i" ||
      randomRoom.charAt(randomRoom[1]) == "o" ||
      randomRoom.charAt(randomRoom[1]) == "u" ||
      randomRoom.charAt(randomRoom[1]) == "y" ||
      randomRoom.charAt(randomRoom[1]) == "A" ||
      randomRoom.charAt(randomRoom[1]) == "E" ||
      randomRoom.charAt(randomRoom[1]) == "I" ||
      randomRoom.charAt(randomRoom[1]) == "O" ||
      randomRoom.charAt(randomRoom[1]) == "U" ||
      randomRoom.charAt(randomRoom[1]) == "Y"
    )
  {
    aRoom = "an";
  }

  let aCat = "a";
  if (
      randomCat.charAt(randomCat[1]) == "a" ||
      randomCat.charAt(randomCat[1]) == "e" ||
      randomCat.charAt(randomCat[1]) == "i" ||
      randomCat.charAt(randomCat[1]) == "o" ||
      randomCat.charAt(randomCat[1]) == "u" ||
      randomCat.charAt(randomCat[1]) == "y" ||
      randomCat.charAt(randomCat[1]) == "A" ||
      randomCat.charAt(randomCat[1]) == "E" ||
      randomCat.charAt(randomCat[1]) == "I" ||
      randomCat.charAt(randomCat[1]) == "O" ||
      randomCat.charAt(randomCat[1]) == "U" ||
      randomCat.charAt(randomCat[1]) == "Y"
    )
  {
    aCat = "an";
  }

  let randomDescription = `${randomCondiment} ${verb} like ${aCat} ${randomCat} in ${aRoom} ${randomRoom} playing ${randomGame} while listening to some ${randomGenre}.`;
  $("body").append(`<p>${randomDescription}</p>`)
}

function dataError(request, textStatus, error) {
  console.log(error);
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

function reset() {
  $("p").remove();
  setup();
}
