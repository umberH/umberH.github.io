---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Home Page
author: Ambreen Hanif
skills:
  - Machine Learning
  - Natural Language Processing
  - Data Analysis
  - Software Development
  - Project Management
professional_experience:
  - title: Data Scientist
    company: Prospa
    duration: 2020 - present
    Description: I worked on developing insights and explanations, machine learning models, and data pipelines to drive business insights and operational efficiency. I have developed dashboards to monitor the data and model drift patterns. 
  - title: Machine Learning Engineer
    company: Cognitivo 
    duration: 2019 - 2020
    description: Developed Image processing-based ML solution for road sign tracking and improving the model performance. 
education:
  - degree: Ph.D. in Computer Science
    institution: Macquarie University
    year: 2024
  - degree: Masters of Research
    institution: Macquarie University
    year: 2021
---

# Welcome to My Personal Website

Hello! I'm **{{ page.author }}**, a seasoned professional with extensive experience in technology and data-driven fields. I specialize in a range of technical and analytical skills, including:

{% for skill in page.skills %}
- {{ skill }}
{% endfor %}

## Professional Experience

I have a strong background in various roles that span multiple disciplines:

{% for job in page.professional_experience %}
### {{ job.title }} at {{ job.company }}
*{{ job.duration }}*  
{{ job.description }}

{% endfor %}

## My educational background includes:

{% for edu in page.education %}
- **{{ edu.degree }}**, {{ edu.institution }} ({{ edu.year }})
{% endfor %}

## Projects

Here are some of my recent projects:

- **[Project 1](#)**: Brief description of Project 1.
- **[Project 2](#)**: Brief description of Project 2.
- **[Project 3](#)**: Brief description of Project 3.

## My Approach

I believe in the power of innovation and data to solve complex problems. I continually seek to expand my knowledge and stay up-to-date with technological advancements.

Feel free to connect with me to discuss potential collaborations or explore shared interests!

## Contact

Feel free to contact me via email at [mylastname(dot)firstname@gmail(dot)com] or follow me on [GitHub](https://github.com/umberh).

---

Thank you for visiting my website!




<!-- 
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
</script> -->
