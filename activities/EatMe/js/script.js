/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $mouth;
let $fly;

$( document ).ready(function() {
    console.log( "ready!" );
    $mouth  = $('#mouth');
    $fly = $("#fly");
    $fly.draggable();
    $mouth.droppable({
      drop: function (event, ui){
        console.log("dropped");
        $fly.remove();
        setInterval(chew,100);
        ui.draggable.remove();
      }
    });
});

function chew() {
  console.log("chew");
  if($mouth.attr('src') === "/assets/images/mouth-open.png"){
    $mouth.attr('src', '/assets/images/mouth-closed.png');
  }
  else {$mouth.attr('src', '/assets/images/mouth-open.png')}
}
