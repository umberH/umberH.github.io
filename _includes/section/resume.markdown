
## Professional Experience

  <div class="timeline">

    <!-- ── EXPERIENCE ── -->
    <div class="timeline-divider">
      <span>Experience</span>
    </div>

    <div class="timeline-item">
      <span class="timeline-date">2020 — Present</span>
      <div class="timeline-role">Data Scientist</div>
      <div class="timeline-company">Prospa, Sydney</div>
      <p class="timeline-desc">
        Developed ML models, data pipelines and explainability tools 
        to drive business insights. Built dashboards to monitor data 
        and model drift patterns in production.
      </p>
      <div class="timeline-tags">
        <span class="timeline-tag">Python</span>
        <span class="timeline-tag">MLOps</span>
        <span class="timeline-tag">Data Pipelines</span>
      </div>
    </div>

    <div class="timeline-item">
      <span class="timeline-date">2019 — 2020</span>
      <div class="timeline-role">Machine Learning Engineer</div>
      <div class="timeline-company">Cognitivo</div>
      <p class="timeline-desc">
        Developed image processing ML solutions for road sign tracking 
        and improved model performance for computer vision pipelines.
      </p>
      <div class="timeline-tags">
        <span class="timeline-tag">Computer Vision</span>
        <span class="timeline-tag">PyTorch</span>
      </div>
    </div>

    <!-- ── EDUCATION ── -->
    <div class="timeline-divider">
      <span>Education</span>
    </div>

    <div class="timeline-item">
      <span class="timeline-date">2024</span>
      <div class="timeline-role">PhD, Computer Science</div>
      <div class="timeline-company">Macquarie University · Sydney</div>
      <p class="timeline-desc">
        Research focused on machine learning and AI systems.
      </p>
      <div class="timeline-tags">
        <span class="timeline-tag">Machine Learning</span>
        <span class="timeline-tag">Research</span>
      </div>
    </div>

    <div class="timeline-item">
      <span class="timeline-date">2021</span>
      <div class="timeline-role">Masters of Research</div>
      <div class="timeline-company">Macquarie University · Sydney</div>
      <p class="timeline-desc">
        Advanced research in computer science and applied AI.
      </p>
      <div class="timeline-tags">
        <span class="timeline-tag">AI</span>
        <span class="timeline-tag">Research</span>
      </div>
    </div>

 </div>

## Publications

<ul>
  {% for publication in site.data.publications %}
    <li>
      <i class="{{ publication.icon }}"></i>
      <strong>{{ publication.title }}</strong>, {{ publication.journal }} ({{ publication.year }})
    </li>
  {% endfor %}
</ul>
