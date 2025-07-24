---
layout: default
title: Blog - Ambreen Hanif
permalink: /blog/
---

<!-- Blog Header -->
<section class="blog-header">
  <div class="container">
    <h1 class="blog-title">My Blog</h1>
    <p class="blog-subtitle">Thoughts on Data Science, Machine Learning, and Technology</p>
  </div>
</section>

<!-- Blog Content -->
<main>
  <div class="container">
    <div class="blog-content">
      <!-- Featured Posts -->
      <section class="featured-posts">
        <h2 class="section-title">Featured Posts</h2>
        <div class="featured-grid">
          {% for post in site.posts limit:3 %}
          <article class="featured-post">
            <div class="post-image">
              <img src="{{ post.image | default: '/assets/images/blog-default.jpg' | relative_url }}" alt="{{ post.title }}" />
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
                {% if post.categories %}
                <span class="post-category">{{ post.categories | first }}</span>
                {% endif %}
              </div>
              <h3 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
              <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
              <a href="{{ post.url | relative_url }}" class="read-more">Read More →</a>
            </div>
          </article>
          {% endfor %}
        </div>
      </section>

      <!-- All Posts -->
      <section class="all-posts">
        <h2 class="section-title">All Posts</h2>
        <div class="posts-grid">
          {% for post in site.posts %}
          <article class="post-card">
            <div class="post-header">
              <div class="post-meta">
                <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
                {% if post.categories %}
                <span class="post-category">{{ post.categories | first }}</span>
                {% endif %}
              </div>
              <h3 class="post-title">
                <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
            </div>
            <div class="post-content">
              <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
              {% if post.tags %}
              <div class="post-tags">
                {% for tag in post.tags limit:3 %}
                <span class="post-tag">{{ tag }}</span>
                {% endfor %}
              </div>
              {% endif %}
            </div>
            <div class="post-footer">
              <a href="{{ post.url | relative_url }}" class="read-more">Read More →</a>
            </div>
          </article>
          {% endfor %}
        </div>
      </section>

      <!-- Categories -->
      <section class="blog-categories">
        <h2 class="section-title">Categories</h2>
        <div class="categories-grid">
          <a href="#machine-learning" class="category-card">
            <div class="category-icon">🤖</div>
            <h3>Machine Learning</h3>
            <p>AI algorithms and ML techniques</p>
          </a>
          <a href="#automl" class="category-card">
            <div class="category-icon">⚡</div>
            <h3>AutoML</h3>
            <p>Automated machine learning tools</p>
          </a>
          <a href="#xai" class="category-card">
            <div class="category-icon">🔍</div>
            <h3>Explainable AI</h3>
            <p>XAI techniques and methods</p>
          </a>
          <a href="#tutorials" class="category-card">
            <div class="category-icon">📚</div>
            <h3>Tutorials</h3>
            <p>Step-by-step guides</p>
          </a>
        </div>
      </section>
    </div>
  </div>
</main>
