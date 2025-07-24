---
layout: default
title: Ambreen Hanif - Data Scientist & ML Engineer
author: Ambreen Hanif
---

<!-- Hero Section -->
<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">Hi, I'm Ambreen Hanif</h1>
    <p class="hero-subtitle">Data Scientist & Machine Learning Engineer</p>
    <p class="hero-description">Passionate about leveraging data and AI to solve complex problems. Specializing in machine learning, data analysis, and software development.</p>
    <div class="hero-buttons">
      <a href="#about" class="cta-button">Learn More About Me</a>
      <a href="https://calendly.com/your-calendly-link" target="_blank" class="cta-button cta-button-secondary">Book a Call</a>
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
            <img src="{{ '/assets/images/dp.png' | relative_url }}" alt="Ambreen Hanif" />
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-section">
        <div class="skills-carousel">
          <button class="carousel-btn carousel-btn-prev" id="skills-prev">
            <i class="fas fa-chevron-left"></i>
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
          
          <button class="carousel-btn carousel-btn-next" id="skills-next">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div class="carousel-dots" id="skills-dots"></div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-section">
        <div class="projects-grid">
          {% for project in site.data.projects %}
          <div class="project-card">
            <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" class="project-image" />
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
                             <div class="project-tags">
                 {% for tag in project.tags %}
                 <span class="project-tag">{{ tag }}</span>
                 {% endfor %}
               </div>
            </div>
          </div>
          {% endfor %}
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
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-main">
      <div class="footer-section">
        <h3 class="footer-title">Ambreen Hanif</h3>
        <p class="footer-description">Data Scientist & Machine Learning Engineer passionate about leveraging AI to solve complex problems.</p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Quick Links</h4>
        <div class="footer-links">
          <a href="#about" class="footer-link">About</a>
          <a href="#skills" class="footer-link">Skills</a>
          <a href="#projects" class="footer-link">Projects</a>
          <a href="#resume" class="footer-link">Resume</a>
        </div>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Get In Touch</h4>
        <div class="footer-contact-icons">
          <a href="mailto:hanif.ambreen@gmail.com" class="footer-icon-link" title="Email">
            <i class="fas fa-envelope"></i>
          </a>
          <a href="https://linkedin.com/in/ambreen16" class="footer-icon-link" target="_blank" title="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/umberH" class="footer-icon-link" target="_blank" title="GitHub">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <a href="https://calendly.com/your-calendly-link" target="_blank" class="footer-cta-button">
          <i class="fas fa-calendar-alt"></i>
          Book a Call
        </a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Ambreen Hanif. All rights reserved.</p>
    </div>
  </div>
</footer>


