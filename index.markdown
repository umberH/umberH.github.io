---
layout: default
title: Ambreen Hanif - Data Scientist & ML Engineer
author: Ambreen Hanif
---

<!-- Hero Section -->
<section class="hero-section" role="banner" aria-labelledby="hero-title">
  <div class="hero-content">
    <h1 class="hero-title" id="hero-title">Hi, I'm Ambreen Hanif</h1>
    <p class="hero-subtitle">Data Scientist & Machine Learning Engineer</p>
    <p class="hero-description">Passionate about leveraging data and AI to solve complex problems. Specializing in machine learning, data analysis, and software development.</p>
    <div class="hero-buttons">
      <a href="#about" class="cta-button">Learn More About Me</a>
      <a href="https://calendly.com/your-calendly-link" target="_blank" class="cta-button cta-button-secondary" aria-label="Book a call with Ambreen (opens in new window)">Book a Call</a>
    </div>
  </div>
</section>

<!-- Main Content -->
<main>
  <div class="container">
    
    <!-- About Section -->
    <section id="about" class="section">
      <div class="about-section">
        <div class="about-content">
          <div class="about-text">
            <h2>About Me</h2>
            <p>I'm a seasoned professional with extensive experience in technology and data-driven fields. I specialize in machine learning, data analysis, software development, and project management.</p>
            <p>With a passion for innovation and problem-solving, I continuously seek to expand my knowledge and stay up-to-date with the latest technological advancements in the field of artificial intelligence and data science.</p>
            <p>I believe in the power of data to transform businesses and create meaningful impact. My approach combines technical expertise with strategic thinking to deliver solutions that drive real value.</p>
          </div>
          <div class="about-image">
            <img src="{{ '/assets/images/dp.png' | relative_url }}" alt="Ambreen Hanif" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section" aria-labelledby="skills-title">
      <h2 class="section-title" id="skills-title">Skills & Expertise</h2>
      <div class="skills-section">
        <div class="skills-carousel" role="region" aria-label="Skills carousel">
          <button class="carousel-btn carousel-btn-prev" id="skills-prev" aria-label="Previous skills">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          
          <div class="skills-container">
            <div class="skills-track" id="skills-track">
              <div class="skill-card">
                <div class="skill-icon">🤖</div>
                <h3 class="skill-name">Machine Learning</h3>
                <p class="skill-description">Deep learning, neural networks, predictive modeling, and AI algorithm development</p>
              </div>
              <div class="skill-card">
                <div class="skill-icon">📊</div>
                <h3 class="skill-name">Data Analysis</h3>
                <p class="skill-description">Statistical analysis, data visualization, and insights extraction from complex datasets</p>
              </div>
              <div class="skill-card">
                <div class="skill-icon">💻</div>
                <h3 class="skill-name">Software Development</h3>
                <p class="skill-description">Full-stack development, API design, and scalable software solutions</p>
              </div>
              <div class="skill-card">
                <div class="skill-icon">📋</div>
                <h3 class="skill-name">Project Management</h3>
                <p class="skill-description">Agile methodologies, team leadership, and end-to-end project delivery</p>
              </div>
              <div class="skill-card">
                <div class="skill-icon">🔬</div>
                <h3 class="skill-name">Research & Development</h3>
                <p class="skill-description">Innovation, experimentation, and cutting-edge technology research</p>
              </div>
              <div class="skill-card">
                <div class="skill-icon">📈</div>
                <h3 class="skill-name">Business Intelligence</h3>
                <p class="skill-description">Data-driven insights, KPI tracking, and strategic decision support</p>
              </div>
            </div>
          </div>
          
          <button class="carousel-btn carousel-btn-next" id="skills-next" aria-label="Next skills">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
        
        <div class="carousel-dots" id="skills-dots" role="tablist" aria-label="Skills navigation"></div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section" aria-labelledby="projects-title">
      <h2 class="section-title" id="projects-title">Featured Projects</h2>
      <div class="projects-section">
        <div class="projects-grid" role="list">
          {% for project in site.projects limit:6 %}
          <div class="project-card">
            <a href="{{ project.url }}" class="project-link" aria-label="View details for {{ project.title }}">
              {% if project.image %}
              <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" class="project-image" loading="lazy" />
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
                  <time class="project-date" datetime="{{ project.date | date_to_xmlschema }}">
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
                <div class="project-cta">
                  <span class="read-more">View Project Details</span>
                  <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </div>
              </div>
            </a>
          </div>
          {% endfor %}
        </div>
        <div class="projects-cta">
          <a href="/projects/" class="cta-button">View All Projects</a>
        </div>
      </div>
    </section>

    <!-- Resume Section -->
    <section id="resume" class="section">
      <h2 class="section-title">Experience & Education</h2>
      <div class="resume-section">
        {% capture resume_content %}
        {% include section/resume.markdown %}
        {% endcapture %}
        {{ resume_content | markdownify }}
      </div>
    </section>



  </div>
</main>

<!-- Footer -->
<footer class="site-footer" role="contentinfo">
  <div class="footer-content">
    <div class="footer-main">
      <div class="footer-section">
        <h3 class="footer-title">Ambreen Hanif</h3>
        <p class="footer-description">Data Scientist & Machine Learning Engineer passionate about leveraging AI to solve complex problems.</p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Quick Links</h4>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="#about" class="footer-link">About</a>
          <a href="#skills" class="footer-link">Skills</a>
          <a href="#projects" class="footer-link">Projects</a>
          <a href="#resume" class="footer-link">Resume</a>
        </nav>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Get In Touch</h4>
        <div class="footer-contact-icons" role="list">
          <a href="mailto:hanif.ambreen@gmail.com" class="footer-icon-link" title="Email" aria-label="Send email to hanif.ambreen@gmail.com">
            <i class="fas fa-envelope" aria-hidden="true"></i>
          </a>
          <a href="https://linkedin.com/in/ambreen16" class="footer-icon-link" target="_blank" title="LinkedIn" aria-label="Visit Ambreen's LinkedIn profile (opens in new window)">
            <i class="fab fa-linkedin" aria-hidden="true"></i>
          </a>
          <a href="https://github.com/umberH" class="footer-icon-link" target="_blank" title="GitHub" aria-label="Visit Ambreen's GitHub profile (opens in new window)">
            <i class="fab fa-github" aria-hidden="true"></i>
          </a>
        </div>
        <a href="https://calendly.com/your-calendly-link" target="_blank" class="footer-cta-button" aria-label="Book a call with Ambreen (opens in new window)">
          <i class="fas fa-calendar-alt" aria-hidden="true"></i>
          Book a Call
        </a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Ambreen Hanif. All rights reserved.</p>
    </div>
  </div>
</footer>


