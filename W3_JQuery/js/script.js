"use strict";
const REVEAL_PROBABILITY = 0.05;
const INTERVAL_DURATION = 500;
let $spans

$(document).ready(setup);

function setup() {
  $spans = $('span');
  setInterval(update, INTERVAL_DURATION)
  $spans.on("click", spanClicked);
}

function update() {
  $spans.each(updateSpan);
}

function updateSpan() {
  let r = Math.random();
  if (r < REVEAL_PROBABILITY) {
    $(this).removeClass('redacted').addClass('revealed');
  }
}

function spanClicked() {
  $(this).removeClass('revealed').addClass('redacted');
}
