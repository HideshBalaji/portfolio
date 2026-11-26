<script>
  // Education and certification run as end credits, then the contact block.
  import { onMount } from 'svelte';
  import { profile, credits, vinyls } from '../data.js';
  import Vinyl from './Vinyl.svelte';
  import { achievements, list, unlock } from '../achievements.svelte.js';

  let footer = $state();

  onMount(() => {
    // reaching the footer counts as finishing the page
    const end = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) unlock('credits');
      },
      { threshold: 0.6 },
    );
    end.observe(footer);
    return () => end.disconnect();
  });
</script>

<section class="section column credits" aria-labelledby="credits-title">
  <h2 class="section-title" id="credits-title">credits</h2>
  <dl>
    {#each credits as credit (credit.label)}
      <div>
        <dt>{credit.label}</dt>
        <dd>{credit.value}<span>{credit.when}</span></dd>
      </div>
    {/each}
  </dl>
</section>

<section class="section column contact" id="contact">
  <Vinyl record={vinyls.nectar} peek="left" style="--top: 52px; --right: 16px; --tilt: 5deg" />
  <h2 class="section-title">say hello</h2>
  <p class="lead">
    I'm open to new roles and interesting problems, especially ones that mix product engineering
    with machine learning. Email is the quickest way to reach me.
  </p>

  <a class="email" href="mailto:{profile.email}">{profile.email}</a>

  <ul class="links">
    <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
    <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
  </ul>
</section>

<footer class="column" bind:this={footer}>
  <div class="trophies">
    <p class="count">
      Achievements: {achievements.found.length} of {list.length}
    </p>
    <ul>
      {#each list as item (item.id)}
        {@const found = achievements.found.includes(item.id)}
        <li class:found>
          {#if found}
            {item.name}
          {:else}
            <span class="visually-hidden">Locked:</span> {item.hint}
          {/if}
        </li>
      {/each}
    </ul>
  </div>

  <div class="end">
    <p class="fin">fin.</p>
    <p class="small">
      {profile.fullName}, 2026. Built with Svelte. <a href="#top">Back to top</a>
    </p>
  </div>
</footer>

<style>
  /* ── end credits ── */
  .credits {
    text-align: center;
  }
  .credits .section-title {
    margin-bottom: 26px;
  }
  dl {
    display: grid;
    gap: 14px;
  }
  dl div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 26px;
    align-items: baseline;
  }
  dt {
    text-align: right;
    color: var(--mat-dim);
  }
  dd {
    text-align: left;
    font-weight: 700;
  }
  dd span {
    display: block;
    font-weight: 400;
    color: var(--mat-dim);
    font-size: 14.5px;
  }

  /* ── contact ── */
  .contact {
    padding-bottom: 40px;
  }
  .lead {
    max-width: 56ch;
    margin-bottom: 26px;
  }
  .email {
    display: inline-block;
    font-family: var(--hand);
    font-size: clamp(27px, 5.6vw, 54px);
    line-height: 1.1;
    text-decoration-color: var(--red);
    text-decoration-thickness: 3px;
    text-underline-offset: 7px;
    overflow-wrap: anywhere;
  }
  .email:hover {
    color: var(--hi);
  }
  :global([data-theme='light']) .email:hover {
    color: var(--red);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }
  .links a {
    display: block;
    padding: 5px 16px 4px;
    border: 1px solid var(--mat-rule);
    border-radius: 999px;
    text-decoration: none;
  }
  .links a:hover {
    background: var(--hi);
    border-color: var(--hi);
    color: #1d1b16;
  }

  footer {
    padding-block: 28px 44px;
    margin-top: 36px;
    border-top: 1px dashed var(--mat-rule);
  }

  /* achievement tracker: found ones are filled in, locked ones show a hint */
  .trophies {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 18px;
    margin-bottom: 30px;
  }
  .count {
    font-weight: 700;
  }
  .trophies ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .trophies li {
    padding: 2px 12px 1px;
    border: 1px dashed var(--mat-rule);
    border-radius: 999px;
    font-size: 14px;
    color: var(--mat-dim);
  }
  .trophies li.found {
    border: 1px solid var(--hi);
    background: var(--hi);
    color: #1d1b16;
    font-weight: 700;
  }

  .end {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px 24px;
  }
  .fin {
    font-family: var(--hand);
    font-size: 40px;
    line-height: 1;
  }
  .small {
    font-size: 14px;
    color: var(--mat-dim);
  }

  @media (max-width: 640px) {
    .credits {
      text-align: left;
    }
    dl div {
      grid-template-columns: 1fr;
      gap: 0;
    }
    dt {
      text-align: left;
    }
  }
</style>
