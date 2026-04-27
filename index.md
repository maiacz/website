---
layout: default
title: Home
permalink: /
---

<section class="hero hero-animated">
  <div class="container hero-inner">
    <div class="hero-text">
      <h1 class="intro">Hi, I'm <span class="name">Maia Czerwonka</span> <span class="wave">👋</span></h1>
      <p class="lead">I'm a University of Washington Statistics and Psychology major studying individual differences in information processing and conflict perception.</p>
      <p class="lead-sm">Data viz • Experimental design • Applied statistics</p>
      <p class="hero-cta"><a class="btn" href="/projects/">See projects</a> <a class="btn ghost" href="/resume/">Resume</a></p>
    </div>
    <div class="hero-decor" aria-hidden="true">
      <div class="sparkles">
        <span class="spark" style="--i:0"></span>
        <span class="spark" style="--i:1"></span>
        <span class="spark" style="--i:2"></span>
        <span class="spark" style="--i:3"></span>
        <span class="spark" style="--i:4"></span>
      </div>
    </div>
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
