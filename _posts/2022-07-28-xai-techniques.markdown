---
layout: post
sublayout: post.html
title:  "XAI Tools and Techniques discussed in the Literature till 2023"
date:   2022-07-28 09:48:37 +1000
categories: XAI Techniques
datatable: true
---

In this post, I am providing a summary of XAI-based techniques. this post will cover the XAI-based techniques for the different stages of the machine learning pipeline.

The XAI techniques are generally divided into post- and ante-hoc approaches, with the global and local explanation options. Where global explains the overall model whereas local talks about the particular instances of the model.

<div class="datatable-begin"></div>


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
  {% tablerow pair in row %}
      {{ pair[1] }}
    {% endtablerow %}
    {% endfor %}
