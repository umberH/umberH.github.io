<section id="projects" class="section" aria-labelledby="projects-title">
  <div class="section-header">
    <h2 class="section-title" id="projects-title">Featured Projects</h2>
    <a href="/projects/" class="view-all-link">View All Projects <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>

  <div class="projects-carousel">
    <div class="projects-container">
      <div class="projects-track" role="list">

        {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
        {% for project in sorted_projects %}
        <article class="project-card" role="listitem">
          <a href="{{ project.url }}" class="project-card-link" aria-label="View details for {{ project.title }}">
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

              {% if project.tags %}
              <div class="project-tags">
                {% for tag in project.tags limit:2 %}
                <span class="project-tag">{{ tag }}</span>
                {% endfor %}
                {% if project.tags.size > 2 %}
                <span class="project-tag">+{{ project.tags.size | minus: 2 }}</span>
                {% endif %}
              </div>
              {% endif %}

              <div class="project-cta">
                <span class="read-more">View Project Details</span>
                <i class="fas fa-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </a>
        </article>
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
      {% for project in sorted_projects %}
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
