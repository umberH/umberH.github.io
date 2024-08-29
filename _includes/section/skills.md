<ul>
  {% for skill in site.data.skills %}
    <li><i class="{{ skill.icon }}"></i> {{ skill.name }}</li>
  {% endfor %}
</ul>
