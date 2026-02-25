
## Professional Experience

<div class="timeline">

  <!-- ─── Professional Experience ──────────────────────────── -->
  <p class="timeline-divider">Professional Experience</p>

  <!-- Role 1 — Most recent -->
  <div class="timeline-item">
    <span class="timeline-date">2020 — Present</span>
    <p class="timeline-role">Data Scientist</p>
    <p class="timeline-company">Prospa</p>
    <p class="timeline-desc">
      Developed machine learning models and data pipelines to drive business insights
      and operational efficiency. Built dashboards to monitor data and model drift
      patterns. Delivered explainability tooling for credit risk models.
    </p>
  </div>

  <!-- Role 2 -->
  <div class="timeline-item">
    <span class="timeline-date">2019 — 2020</span>
    <p class="timeline-role">Machine Learning Engineer</p>
    <p class="timeline-company">Cognitivo</p>
    <p class="timeline-desc">
      Developed an image-processing ML solution for road sign tracking and detection.
      Improved model performance through dataset curation and architecture optimisation.
    </p>
  </div>

  <!-- Add more roles here following the same pattern -->
  <!-- Copy a .timeline-item block and update the content -->

  <!-- ─── Education ─────────────────────────────────────────── -->
  <p class="timeline-divider">Education</p>

  <!-- Education 1 — Most recent -->
  <div class="timeline-item">
    <span class="timeline-date">2024</span>
    <p class="timeline-role">PhD in Computer Science</p>
    <p class="timeline-company">Macquarie University, Sydney</p>
    <p class="timeline-desc">
      Research focus on Explainable AI (XAI) and adaptive learning systems
      for educational technology. Developed graph-based ML methods for
      interpretable decision-making.
    </p>
  </div>

  <!-- Education 2 -->
  <div class="timeline-item">
    <span class="timeline-date">2021</span>
    <p class="timeline-role">Masters of Research</p>
    <p class="timeline-company">Macquarie University, Sydney</p>
    <p class="timeline-desc">
      Research in machine learning and artificial intelligence with a focus
      on explainability and transparency in AI systems.
    </p>
  </div>

</div>

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

## Education
<ul>
  {% for education in site.data.education %}
    <li>
      <i class="{{ education.icon }}"></i>
      <strong>{{ education.degree }}</strong>, {{ education.institution }} ({{ education.year }}) - {{ education.location }}
    </li>
  {% endfor %}
</ul>

## Publications

<ul>
  {% for publication in site.data.publications %}
    <li>
      <i class="{{ publication.icon }}"></i>
      <strong>{{ publication.title }}</strong>, {{ publication.journal }} ({{ publication.year }})
    </li>
  {% endfor %}
</ul>
