
Here are some of my recent projects:

Welcome to my projects page! Here you will find a collection of some of the projects I've worked on, each with a brief description and an image.

<div class="projects-gallery">
  {% for project in site.data.projects %}
  <div class="project-item">
    <img src="{{ project.image | relative_url }}" alt="{{ project.title }} Image" class="project-image">
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
  </div>
  {% endfor %}
</div>
