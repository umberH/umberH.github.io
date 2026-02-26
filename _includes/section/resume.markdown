
<div class="timeline">

    <!-- ── EXPERIENCE ── -->
    <div class="timeline-divider"><span>Experience</span></div>

    {% for item in site.data.experience %}
    <div class="timeline-item">
      <span class="timeline-date">{{ item.date }}</span>
      <div class="timeline-role">{{ item.role }}</div>
      <div class="timeline-company">{{ item.company }}</div>
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

    <!-- ── EDUCATION ── -->
    <div class="timeline-divider"><span>Education</span></div>

    {% for item in site.data.education %}
    <div class="timeline-item">
      <span class="timeline-date">{{ item.duration }}</span>
      {% if item.icon %}
    <span class="timeline-icon"><i class="fas {{ item.icon }}"></i></span>
    {% else %}
    <span class="timeline-icon"><i class="fas fa-briefcase"></i></span>
    {% endif %}
  </div>
      <div class="timeline-role">{{ item.title }}</div>
      <div class="timeline-company">{{ item.company }}</div>
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

## Publications

<ul>
  {% for publication in site.data.publications %}
    <li>
      <i class="{{ publication.icon }}"></i>
      <strong>{{ publication.title }}</strong>, {{ publication.journal }} ({{ publication.year }})
    </li>
  {% endfor %}
</ul>
