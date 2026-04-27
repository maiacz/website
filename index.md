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
    {% for p in site.projects limit:3 %}
      <div class="project-card">
        <a href="{{ p.url }}">{% if p.preview_image %}<img src="{{ p.preview_image }}" alt="{{ p.title }}">{% endif %}
        <h3>{{ p.title }}</h3>
        <p>{{ p.summary }}</p>
        <p class="project-meta">Tech: {% for t in p.tech %}{{ t }}{% unless forloop.last %}, {% endunless %}{% endfor %}</p>
      </a>
      </div>
    {% endfor %}
  </div>
</section>
