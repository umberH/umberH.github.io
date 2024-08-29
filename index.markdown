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
  {% include section/about.markdown %}
</div>

## My Educational Background

<div id="education">
  {% include section/education.md %}
</div>

## Professional Experience

<div id="experience">
  {% include section/experience.markdwon %}
</div>

## Projects
Here are some of my recent projects:
<div id="project">
  {% include section/projects.md %}
</div>




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


<!-- Link the JavaScript file -->
<script src="{{ '/assets/js/rotateText.js' | relative_url }}"></script>
<script src="{{ '/assets/js/circularProgress.js' | relative_url }}"></script>
<script src="{{ '/assets/js/typing.js' | relative_url }}"></script>
