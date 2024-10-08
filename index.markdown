---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Home Page
author: Ambreen Hanif
---

<div class="impact-section">
  <div class="diamond-shape"></div>
  <!-- Additional content for the impact section -->
  <!-- Rotating Text Container -->
<div class="rotating-text">
  <span id="dynamic-text">Hey! I am a </span>
<!--   <span id="rotating-words"></span> -->
  <div class="typing-container">
  <span id="typed-text"></span>
  <span class="cursor">&nbsp;</span>
</div>
</div>
</div>

# About Me
<div id="about">
  {% capture about_content %}
  {% include section/about.markdown %}
  {% endcapture %}
  {{ about_content | markdownify }}

</div>


## Resume
<div id ="resume">
{% capture resume_content %}
  {% include section/resume.markdown %}
  {% endcapture %}
  {{ resume_content | markdownify }}

</div> 

## Projects

<div id="project">
  {% capture project_content %}
  {% include section/projects.markdown %}
  {% endcapture %}
  {{ project_content | markdownify }}
  
</div>




## My Approach

I believe in the power of innovation and data to solve complex problems. I continually seek to expand my knowledge and stay up-to-date with technological advancements.

Feel free to connect with me to discuss potential collaborations or explore shared interests!

## Contact

Feel free to contact me via email at [mylastname(dot)firstname@gmail(dot)com] or follow me on [GitHub](https://github.com/umberh).

<div id="contact">
  {% capture contact_content %}
  {% include section/contact.markdown %}
  {% endcapture %}
  {{ contact_content | markdownify }}
  
</div>
---

Thank you for visiting my website!


<!-- Link the JavaScript file -->
<script src="{{ '/assets/js/rotateText.js' | relative_url }}"></script>
<script src="{{ '/assets/js/circularProgress.js' | relative_url }}"></script>
<script src="{{ '/assets/js/typing.js' | relative_url }}"></script>
