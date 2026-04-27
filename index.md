---
layout: default
title: Home
permalink: /
---

<section class="hero">
  <div class="container">
    <h1>Hi, I'm Maia.</h1>
    <p>I'm a data scientist and researcher focused on data visualization, experiments, and applied machine learning. Explore my projects or download my resume.</p>
    <p><a class="btn" href="/projects/">See projects</a> <a class="btn ghost" href="/resume/">Resume</a></p>
  </div>
</section>

<section class="container">
  <h2>Featured Projects</h2>
  <div class="projects-grid">
    {% assign featured = site.projects | where: "featured", true %}
    {% for p in featured limit:3 %}
      <div class="project-card">
        {% if p.assets and p.assets.size > 0 %}
          {% assign link = p.assets[0] %}
        {% else %}
          {% assign link = p.url %}
        {% endif %}
        <a href="{{ link }}" target="_blank">{% if p.preview_image %}<img src="{{ p.preview_image }}" alt="{{ p.title }}">{% endif %}
        <h3>{{ p.title }}</h3>
        <p>{{ p.summary }}</p>
        <p class="project-meta">Tech: {% if p.tech %}{{ p.tech | join: ", " }}{% else %}&mdash;{% endif %}</p>
      </a>
      </div>
    {% endfor %}
  </div>
</section>
