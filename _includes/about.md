# About me 

I'm **{{ page.author }}**, a seasoned professional with extensive experience in technology and data-driven fields. I specialize in a range of technical and analytical skills, including:

<ul>
  {% for skill in site.data.skills %}
    <li><i class="{{ skill.icon }}"></i> {{ skill.name }}</li>
  {% endfor %}
</ul>
