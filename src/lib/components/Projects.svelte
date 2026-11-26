<script>
  import { projects, vinyls } from '../data.js';
  import ProjectVisual from './ProjectVisual.svelte';
  import Vinyl from './Vinyl.svelte';
</script>

<section class="section column" id="work">
  <Vinyl record={vinyls.nirvana} peek="right" style="--top: 44px; --right: 84px; --tilt: -6deg" />
  <h2 class="section-title">things i've built</h2>
  <p class="section-note">
    Three projects, mostly where web development meets machine learning. The drawings are sketches
    of how each one works.
  </p>

  <ul class="grid">
    {#each projects as project, i (project.id)}
      <li class="project paper">
        <span class="tape" style="rotate: {i % 2 ? 3 : -3}deg; left: {i % 2 ? 62 : 38}%"></span>
        <ProjectVisual kind={project.visual} />

        <div class="body">
          <h3>{project.title}</h3>
          <p class="kind">
            {project.kind}{#if project.date}<span class="date">, {project.date}</span>{/if}
          </p>
          <p class="text">{project.description}</p>

          <ul class="tags" aria-label="Built with">
            {#each project.tags as tag (tag)}
              <li class="tag">{tag}</li>
            {/each}
          </ul>

          {#if project.links.length}
            <ul class="links">
              {#each project.links as link (link.href)}
                <li><a href={link.href} target="_blank" rel="noopener">{link.label}</a></li>
              {/each}
            </ul>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 44px 32px;
  }

  .project {
    display: flex;
    flex-direction: column;
    padding: 12px 12px 20px;
    transition:
      rotate 0.25s ease,
      translate 0.25s ease;
  }
  .project:nth-child(4n + 1) {
    rotate: -0.7deg;
  }
  .project:nth-child(4n + 2) {
    rotate: 0.6deg;
  }
  .project:nth-child(4n + 3) {
    rotate: 0.5deg;
  }
  .project:nth-child(4n + 4) {
    rotate: -0.5deg;
  }
  .project:hover,
  .project:focus-within {
    rotate: 0deg;
    translate: 0 -4px;
  }

  .body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 16px 8px 0;
  }

  h3 {
    font-family: var(--hand);
    font-weight: 400;
    font-size: 34px;
    line-height: 1.05;
  }

  .kind {
    font-weight: 700;
    margin-top: 4px;
  }
  .date {
    font-weight: 400;
    color: var(--ink-dim);
  }

  .text {
    margin-top: 10px;
    font-size: 15px;
    line-height: 1.6;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 16px;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 22px;
    margin-top: auto;
    padding-top: 18px;
  }
  .links a {
    font-weight: 700;
    text-decoration-color: var(--red);
    text-decoration-thickness: 2px;
  }
  .links a:hover {
    background: var(--hi);
  }

  @media (max-width: 760px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
