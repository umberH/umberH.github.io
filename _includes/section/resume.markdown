## Professional Experience
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

## Skills
<ul>
  {% for skill in site.data.skills %}
    <li><i class="{{ skill.icon }}"></i> {{ skill.name }}</li>
  {% endfor %}
</ul>
