---
layout: default
title: Home
permalink: /
---

<section class="hero">
  <div class="container">
    <h1>Hi, I'm Maia.</h1>
    <p>I'm a software engineer and researcher building open-source projects and data visualizations. Explore my projects or download my resume.</p>
    <p><a class="btn" href="/projects/">See projects</a> <a class="btn ghost" href="/resume/">Resume</a></p>
  </div>
</section>

<section class="container">
  <h2>Featured Projects</h2>
  <div class="projects-grid">
    {% raw %}{% for p in site.projects limit:3 %}{% endraw %}
      <div class="project-card">
        <a href="{{ p.url }}">{% raw %}{% if p.preview_image %}{% endraw %}<img src="{{ p.preview_image }}" alt="{{ p.title }}">{% raw %}{% endif %}{% endraw %}
        <h3>{{ p.title }}</h3>
        <p>{{ p.summary }}</p>
        <p class="project-meta">Tech: {% raw %}{% for t in p.tech %}{{ t }}{% endraw %}{% raw %}{% unless forloop.last %}, {% endunless %}{% endraw %}{% raw %}{% endfor %}{% endraw %}</p>
      </a>
      </div>
    {% raw %}{% endfor %}{% endraw %}
  </div>
</section>
