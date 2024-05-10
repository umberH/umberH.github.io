---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Home Page
---

Welcome to my Jekyll site on Github Pages!
<div class="container">
        <div class="row no-gutters slider-text js-fullheight justify-content-center align-items-center" style="height: 911px;">
          <div class="col-lg-8 col-md-6 ftco-animate d-flex align-items-center fadeInUp ftco-animated">
          	<div class="text text-center">
          		<span class="subheading">Hey! I am</span>
		  				<h1>Ambreen Hanif</h1>
			  				<h2>I'm a 
								  <span class="txt-rotate" data-period="500" data-rotate="[ "Computer Engineer.","Data Scientist.", "AI Researcher.", "Eager Learner." ]">

								</h2>
							</div>
            </div>
          </div>
        </div>
	<div id="rotateText">Loading...</div>
		<script>
document.addEventListener('DOMContentLoaded', function() {
  var phrases = [ "Computer Engineer.","Data Scientist.", "AI Researcher.", "Eager Learner." ];
  var index = 0;
  var rotateText = document.getElementById('rotateText');

  function rotate() {
    rotateText.innerHTML = phrases[index];
    index = (index + 1) % phrases.length; // Loop back to the first phrase
    setTimeout(rotate, 2000); // Change every 2 seconds
  }

  rotate(); // Start rotating text
});
</script>
