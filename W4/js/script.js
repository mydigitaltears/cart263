"use strict";

let $animal;
let $fly;
let buzzSFX = new Audio("https://raw.githubusercontent.com/pippinbarr/cart263-2020/master/activities/jqueryui/eat-up/assets/sounds/buzz.mp3");
let crunchSFX = new Audio("https://raw.githubusercontent.com/pippinbarr/cart263-2020/master/activities/jqueryui/eat-up/assets/sounds/crunch.wav");

$(document).ready(setup);

function setup() {
  // This code will run when the document is ready!
  $animal = $("#animal");
  $fly = $("#fly");
  $fly.draggable({
    start: function () {
    buzzSFX.play();
    },
    stop: function () {
      buzzSFX.pause();
    }
  });
  $animal.droppable({
    drop: onDrop
  });
  buzzSFX.loop = true;
}

function onDrop(event, ui) {
  ui.draggable.remove();
  $animal.attr("src", "https://raw.githubusercontent.com/pippinbarr/cart263-2020/master/activities/jqueryui/eat-up/assets/images/chewing.gif");
  crunchSFX.loop = true;
  crunchSFX.play();
}
