---
layout: post
title:  "XAI Tools and Techniques discussed in the Literature till 2023"
date:   2022-07-28 09:48:37 +1000
categories: XAI Techniques
datatable: true
---

In this post, I am providing a summary of XAI-based techniques. this post will cover the XAI based techniques for the differnt stages of the machine learning pipeline.

As the XAI techniques are generally divided into post- and ante-hoc approaches, with the global and local explanation options. Where global explains the voerall model whereas local talks about the particular instances of the model.

<table>
  <thead>
    <tr>
      <th>Named Entity</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    {% for entity in page.named_entities %}
      <tr>
        <td>{{ entity.entity }}</td>
        <td>{{ entity.type }}</td>
      </tr>
    <tr>
        <td>{{ entity.entity }}</td>
        <td>{{ entity.type }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
<div class="datatable-begin"></div>

<ul>
{% for member in site.data.xai %}
  <li>
    {{xai.technique}}
      {{ xai.year}}
    </a>
  </li>
{% endfor %}
</ul>
<table class="display">
  {% for row in site.data.xai %}
    {% if forloop.first %}
    <thead>
    <tr>
      {% for pair in row %}
        <th>{{ pair[0] }}</th>
      {% endfor %}
    </tr>
    </thead>
    {% endif %}
    {% endfor %}
