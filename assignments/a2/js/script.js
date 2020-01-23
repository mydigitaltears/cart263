"use strict";
const REVEAL_PROBABILITY = 0.05;
const INTERVAL_DURATION = 500;
let $spans;
let secretsFound = 0;
let secretsTotal;

$(document).ready(setup);

function setup() {
  $spans = $('span.redacted');
  setInterval(update, INTERVAL_DURATION)
  $spans.on("click", spanClicked);
  secretsTotal = $('span.secret').length;
  $('span.totalSecrets').text(secretsTotal);
  $('span.secret').on("mouseover", revealSecret);
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

function revealSecret() {
  console.log("yo");
  if (!$(this).hasClass('found')) {
    $(this).removeClass('secret').addClass('found');
    secretsFound ++;
    $('span.secretsFound').text(secretsFound);
    $(this).off("mouseover");
  }
}
