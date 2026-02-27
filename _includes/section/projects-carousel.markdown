<section id="projects" class="section" aria-labelledby="projects-title">
  <h2 class="section-title" id="projects-title">Featured Projects</h2>

  <div class="projects-carousel">
    <div class="projects-container">
      <div class="projects-track" role="list">

        {% for project in site.data.projects %}
        <div class="project-card" role="listitem">

          {% if project.image %}
          <img src="{{ project.image | relative_url }}"
               alt="{{ project.title }}"
               class="project-image"
               loading="lazy" />
          {% else %}
          <div class="project-image-placeholder">
            <i class="fas fa-project-diagram" aria-hidden="true"></i>
          </div>
          {% endif %}

          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            {% if project.subtitle %}
            <p class="project-subtitle">{{ project.subtitle }}</p>
            {% endif %}
            <p class="project-description">{{ project.description }}</p>

            <div class="project-meta">
              {% if project.category %}
              <span class="project-category">{{ project.category }}</span>
              {% endif %}
              {% if project.date %}
              <time class="project-date"
                    datetime="{{ project.date }}">
                {{ project.date | date: "%b %Y" }}
              </time>
              {% endif %}
            </div>

            {% if project.tags %}
            <div class="project-tags">
              {% for tag in project.tags limit:3 %}
              <span class="project-tag">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}

            <a href="{{ project.url }}"
               class="project-cta"
               aria-label="View details for {{ project.title }}">
              <span class="read-more">View Project Details</span>
              <i class="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

        </div>
        {% endfor %}

      </div>
    </div>

    <button class="carousel-btn carousel-btn-prev"
            aria-label="Previous project">
      <i class="fas fa-chevron-left" aria-hidden="true"></i>
    </button>
    <button class="carousel-btn carousel-btn-next"
            aria-label="Next project">
      <i class="fas fa-chevron-right" aria-hidden="true"></i>
    </button>

    <div class="carousel-dots" role="tablist"
         aria-label="Projects navigation">
      {% for project in site.data.projects %}
      <button class="carousel-dot"
              aria-label="Go to project {{ forloop.index }}"
              role="tab"></button>
      {% endfor %}
    </div>

  </div>

  <!-- link to full projects page -->
  <div class="projects-cta">
    <a href="/projects/" class="cta-button">
      View All Projects
      <i class="fas fa-arrow-right"></i>
    </a>
  </div>

</section>
