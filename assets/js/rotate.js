document.addEventListener('DOMContentLoaded', function() {
    var phrases = ["First phrase", "Second phrase", "Third phrase"];
    var index = 0;
    var rotateText = document.getElementById('rotateText');
 
    function rotate() {
      rotateText.innerHTML = phrases[index];
      index = (index + 1) % phrases.length;
      setTimeout(rotate, 2000);
    }
 
    rotate();
 });