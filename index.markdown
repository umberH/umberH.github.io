---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Home Page
author: Ambreen Hanif
---

<!-- Rotating Text Container -->
<div class="rotating-text">
  <span id="dynamic-text">Hi, I am a </span>
  <span id="rotating-words"></span>
</div>

# Welcome to My Personal Website

Hello! I'm **{{ page.author }}**, a seasoned professional with extensive experience in technology and data-driven fields. I specialize in a range of technical and analytical skills, including:

<ul>
  {% for skill in site.data.skills %}
    <li><i class="{{ skill.icon }}"></i> {{ skill.name }}</li>
  {% endfor %}
</ul>

## Professional Experience

I have a strong background in various roles that span multiple disciplines:

<ul>
  {% for experience in site.data.experience %}
    <li>
      <i class="{{ experience.icon }}"></i>
      <strong>{{ experience.title }}</strong> at {{ experience.company }}, {{ experience.location }} ({{ experience.duration }})
      <br>
      <i>{{ experience.description }}</i>
    </li>
  {% endfor %}
</ul>

## My Educational background

<ul>
  {% for education in site.data.education %}
    <li>
      <i class="{{ education.icon }}"></i>
      <strong>{{ education.degree }}</strong>, {{ education.institution }} ({{ education.year }}) - {{ education.location }}
    </li>
  {% endfor %}
</ul>
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



<!-- Link the JavaScript file -->
<script src="{{ '/assets/js/scripts.js' | relative_url }}"></script>
