
<div class="timeline">

    <!-- ── EXPERIENCE ── -->
    <div class="timeline-divider"><span>Experience</span></div>

    {% for item in site.data.experience %}
    <div class="timeline-item">
      <div class="timeline-header">
        <span class="timeline-icon">
          <i class="fas {% if item.icon %}{{ item.icon }}{% else %}fa-briefcase{% endif %}"></i>
        </span>
        <div class="timeline-header-text">
          <span class="timeline-date">{{ item.duration }}</span>
          <div class="timeline-role">{{ item.title }}</div>
          <div class="timeline-company">{{ item.company }}</div>
        </div>
      </div>
      {% if item.description %}
      <p class="timeline-desc">{{ item.description }}</p>
      {% endif %}
      {% if item.tags %}
      <div class="timeline-tags">
        {% for tag in item.tags %}
        <span class="timeline-tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
    {% endfor %}
</div>
    <!-- ── EDUCATION ── -->
    <div class="timeline-divider"><span>Education</span></div>

{% for item in site.data.education %}
<div class="timeline-item">                      <!-- opens card -->

  <div class="timeline-header">                  <!-- groups icon + text -->
    <span class="timeline-icon">
      {% if item.icon %}
        <i class="fas {{ item.icon }}"></i>
      {% else %}
        <i class="fas fa-graduation-cap"></i>    <!-- better default for education -->
      {% endif %}
    </span>
    <div class="timeline-header-text">
      <span class="timeline-duration">{{ item.year }}</span>
      <div class="timeline-role">{{ item.degree }}</div>
      <div class="timeline-company">{{ item.institution }}</div>
    </div>
  </div>

  {% if item.description %}
  <p class="timeline-desc">{{ item.location }}</p>
  {% endif %}

  {% if item.tags %}
  <div class="timeline-tags">
    {% for tag in item.tags %}
    <span class="timeline-tag">{{ tag }}</span>
    {% endfor %}
  </div>
  {% endif %}

</div>                                           <!-- closes card -->
{% endfor %}

## Publications

<ul>
  {% for publication in site.data.publications %}
    <a href="https://scholar.google.com.au/citations?hl=en&user=ZhWJUCcAAAAJ" target="_blank" aria-label="Google Scholar profile">
  <svg xmlns="http://www.w3.org/2000/svg" 
       viewBox="0 0 24 24" 
       width="24" height="24" 
       fill="currentColor">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5h3.75v8.25h3V9.5H12l9.75-4.5H24L12 0z"/>
  </svg>
</a>
  {% endfor %}
</ul>
