---
layout: default
title: Ambreen Hanif - Data Scientist & ML Engineer
author: Ambreen Hanif
---

<!-- Hero Section -->

<section class="hero-section" role="banner" aria-labelledby="hero-title">
  <div class="hero-content hero-content--left">

    <p class="hero-eyebrow">
      <span class="eyebrow-static">Sydney —</span>
      <span class="typing-text-role"></span><span class="typing-cursor-role">|</span>
    </p>
    <h1 class="hero-title" id="hero-title">
      Making<br>data<em> think.</em>
    </h1>

    <p class="hero-description">
      PhD in Computer Science. I build machine learning systems that move 
      from raw, messy data to decisions that hold up — in production, 
      under pressure, at scale.
    </p>

    <div class="hero-buttons">
      <a href="https://cal.com/ambreen-hanif-qas6oz/30min"
         target="_blank"
         class="cta-button"
         aria-label="Book a call with Ambreen (opens in new window)">
        Book a call
      </a>
      <a href="#about" class="cta-button cta-button-secondary">
        See my work
      </a>
    </div>
    

  </div>
 
</section>
 <div class="skills-ticker" aria-hidden="true">
  <div class="skills-ticker-track">

    {% comment %} Set 1 {% endcomment %}
    {% for group in site.data.skills %}
      {% for skill in group.skills %}
        <span class="skills-ticker-item">
          <i class="fas {{ skill.icon }}"></i> {{ skill.name }}
        </span>
        <span class="skills-ticker-separator">●</span>
      {% endfor %}
    {% endfor %}

    {% comment %} Set 2 — duplicate for seamless loop {% endcomment %}
    {% for group in site.data.skills %}
      {% for skill in group.skills %}
        <span class="skills-ticker-item">
          <i class="fas {{ skill.icon }}"></i> {{ skill.name }}
        </span>
        <span class="skills-ticker-separator">●</span>
      {% endfor %}
    {% endfor %}

  </div>
</div>
<!-- Main Content -->
<main>
  <div class="container">
    
    <!-- About Section -->
    <section id="about" class="section">
      <div class="about-section">
        <div class="about-content">
          <div class="about-text">
            <h2>About Me</h2>
                     <p> Most machine learning work looks clean in a notebook
          and breaks in production. I spent a PhD figuring out
          why — and the last four years at Prospa making sure
          it doesn't.</p>
          
          <p>I'm a Data Scientist and ML Engineer based in Sydney.
          I build models that go into production, pipelines that
          don't fall apart when real data shows up, and dashboards
          that catch drift before anyone else notices.</p>
          
          <p>Generative AI is where my head is right now —
          specifically what happens when LLMs meet messy,
          real-world business data.</p>
          
          <p>I also write about this work. Not the polished version —
          the actual version.</p>
          </div>
          <div class="about-image">
            <img src="{{ '/assets/images/dp.webp' | relative_url }}" alt="Ambreen Hanif" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    {% include section/projects-carousel.markdown %}  

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
        <a href="https://cal.com/ambreen-hanif-qas6oz/30min" target="_blank" class="footer-cta-button" aria-label="Book a call with Ambreen (opens in new window)">
          <i class="fas fa-calendar-alt" aria-hidden="true"></i>
          Book a Call
        </a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2026 Ambreen Hanif. All rights reserved.</p>
    </div>
  </div>
</footer>


