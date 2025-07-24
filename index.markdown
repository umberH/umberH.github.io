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
    <a href="#about" class="cta-button">Learn More About Me</a>
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
        <div class="skills-grid">
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
        </div>
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

    <!-- Contact Section -->
    <section id="contact" class="section">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-section">
        <div class="contact-grid">
          <div class="contact-card">
            <div class="contact-icon">📧</div>
            <h3 class="contact-title">Email</h3>
            <a href="mailto:hanif.ambreen@gmail.com" class="contact-link">hanif.ambreen@gmail.com</a>
          </div>
          <div class="contact-card">
            <div class="contact-icon">💼</div>
            <h3 class="contact-title">LinkedIn</h3>
            <a href="https://linkedin.com/in/ambreen16" class="contact-link" target="_blank">Connect on LinkedIn</a>
          </div>
          <div class="contact-card">
            <div class="contact-icon">🐙</div>
            <h3 class="contact-title">GitHub</h3>
            <a href="https://github.com/umberH" class="contact-link" target="_blank">View My Work</a>
          </div>
          <div class="contact-card">
            <div class="contact-icon">📄</div>
            <h3 class="contact-title">Resume</h3>
            <a href="{{ '/assets/Ambreen_Hanif_CV_2022.pdf' | relative_url }}" class="contact-link" target="_blank">Download CV</a>
          </div>
        </div>
      </div>
    </section>

  </div>
</main>

<!-- Footer -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-links">
      <a href="#about" class="footer-link">About</a>
      <a href="#skills" class="footer-link">Skills</a>
      <a href="#projects" class="footer-link">Projects</a>
      <a href="#contact" class="footer-link">Contact</a>
    </div>
    <p>&copy; 2024 Ambreen Hanif. All rights reserved.</p>
  </div>
</footer>


