---
layout: post
title:  "XAi techniques In Literature till 2022"
date:   2022-07-28 09:48:37 +1000
categories: XAI Techniques
---

In this post I am providing summary of XAI based techniques 

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
    {% endfor %}
  </tbody>
</table>
