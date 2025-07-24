---
layout: default
title: Projects - Ambreen Hanif
description: Explore my portfolio of data science and machine learning projects, from AI-powered applications to research initiatives.
---

<!-- Projects Header -->
<header class="projects-header">
  <div class="container">
    <h1 class="projects-title">My Projects</h1>
    <p class="projects-subtitle">A collection of data science and machine learning projects showcasing my expertise in AI, analytics, and software development.</p>
    
    <!-- Project Filters -->
    <div class="project-filters">
      <div class="filter-group">
        <label for="category-filter" class="filter-label">Category:</label>
        <select id="category-filter" class="filter-select">
          <option value="">All Categories</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="AutoML">AutoML</option>
          <option value="Data Analysis">Data Analysis</option>
          <option value="Web Development">Web Development</option>
          <option value="Research">Research</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="tech-filter" class="filter-label">Technology:</label>
        <select id="tech-filter" class="filter-select">
          <option value="">All Technologies</option>
          <option value="Python">Python</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="React">React</option>
          <option value="AWS">AWS</option>
          <option value="Docker">Docker</option>
        </select>
      </div>
      
      <div class="search-group">
        <label for="project-search" class="filter-label">Search:</label>
        <input type="text" id="project-search" class="search-input" placeholder="Search projects...">
      </div>
    </div>
  </div>
</header>

<!-- Projects Grid -->
<main class="projects-main">
  <div class="container">
    <div class="projects-grid" id="projects-grid">
      {% for project in site.projects %}
      <article class="project-card" data-category="{{ project.category }}" data-technologies="{{ project.technologies | join: ',' }}">
        <a href="{{ project.url }}" class="project-link" aria-label="View details for {{ project.title }}">
          {% if project.image %}
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" class="project-image" loading="lazy" />
          {% else %}
          <div class="project-image-placeholder">
            <i class="fas fa-project-diagram" aria-hidden="true"></i>
          </div>
          {% endif %}
          
          <div class="project-content">
            <div class="project-meta">
              {% if project.category %}
              <span class="project-category">{{ project.category }}</span>
              {% endif %}
              {% if project.date %}
              <time class="project-date" datetime="{{ project.date | date_to_xmlschema }}">
                {{ project.date | date: "%b %Y" }}
              </time>
              {% endif %}
            </div>
            
            <h2 class="project-title">{{ project.title }}</h2>
            
            {% if project.subtitle %}
            <p class="project-subtitle">{{ project.subtitle }}</p>
            {% endif %}
            
            <p class="project-description">{{ project.description }}</p>
            
            {% if project.technologies %}
            <div class="project-technologies">
              {% for tech in project.technologies limit:4 %}
              <span class="tech-tag">{{ tech }}</span>
              {% endfor %}
              {% if project.technologies.size > 4 %}
              <span class="tech-tag">+{{ project.technologies.size | minus: 4 }} more</span>
              {% endif %}
            </div>
            {% endif %}
            
            {% if project.tags %}
            <div class="project-tags">
              {% for tag in project.tags limit:3 %}
              <span class="project-tag">{{ tag }}</span>
              {% endfor %}
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
    
    <!-- No Results Message -->
    <div id="no-results" class="no-results" style="display: none;">
      <div class="no-results-content">
        <i class="fas fa-search" aria-hidden="true"></i>
        <h3>No projects found</h3>
        <p>Try adjusting your filters or search terms to find what you're looking for.</p>
        <button id="clear-filters" class="cta-button">Clear All Filters</button>
      </div>
    </div>
  </div>
</main>

<script>
// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const categoryFilter = document.getElementById('category-filter');
  const techFilter = document.getElementById('tech-filter');
  const searchInput = document.getElementById('project-search');
  const projectsGrid = document.getElementById('projects-grid');
  const noResults = document.getElementById('no-results');
  const clearFiltersBtn = document.getElementById('clear-filters');
  
  const projectCards = document.querySelectorAll('.project-card');
  
  function filterProjects() {
    const category = categoryFilter.value.toLowerCase();
    const technology = techFilter.value.toLowerCase();
    const searchTerm = searchInput.value.toLowerCase();
    
    let visibleCount = 0;
    
    projectCards.forEach(card => {
      const cardCategory = card.dataset.category?.toLowerCase() || '';
      const cardTechnologies = card.dataset.technologies?.toLowerCase() || '';
      const cardTitle = card.querySelector('.project-title').textContent.toLowerCase();
      const cardDescription = card.querySelector('.project-description').textContent.toLowerCase();
      
      const matchesCategory = !category || cardCategory.includes(category);
      const matchesTechnology = !technology || cardTechnologies.includes(technology);
      const matchesSearch = !searchTerm || 
        cardTitle.includes(searchTerm) || 
        cardDescription.includes(searchTerm);
      
      if (matchesCategory && matchesTechnology && matchesSearch) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      projectsGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      projectsGrid.style.display = 'grid';
    }
  }
  
  // Event listeners
  categoryFilter.addEventListener('change', filterProjects);
  techFilter.addEventListener('change', filterProjects);
  searchInput.addEventListener('input', filterProjects);
  
  clearFiltersBtn.addEventListener('click', function() {
    categoryFilter.value = '';
    techFilter.value = '';
    searchInput.value = '';
    filterProjects();
  });
});
</script> 