<script>
  // The contact block and the footer with the achievement tracker.
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { profile, vinyls } from '../data.js';
  import Vinyl from './Vinyl.svelte';
  import { achievements, list, unlock } from '../achievements.svelte.js';

  let footer = $state();

  // Discord has no public profile link, so the button shows the handle and
  // copies it, then a small pop-up above the button says what happened.
  let popup = $state('');
  let copyTimer;

  async function copyDiscord() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(profile.discord);
      ok = true;
    } catch (e) {
      // some browsers block the clipboard API; copy from a hidden field instead
      const field = document.createElement('textarea');
      field.value = profile.discord;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        ok = document.execCommand('copy');
      } catch (err) {
        ok = false;
      }
      field.remove();
    }

    popup = ok ? 'Copied to clipboard' : "Couldn't copy, select it by hand";
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (popup = ''), 2200);
  }

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

<section class="section column contact" id="contact">
  <Vinyl record={vinyls.nectar} peek="left" style="--top: 52px; --right: 16px; --tilt: 5deg" />
  <h2 class="section-title">say hello</h2>
  <p class="lead">
    I'm open to new roles and interesting problems, especially ones about making a product feel
    good and building the system behind it. Email is the quickest way to reach me.
  </p>

  <a class="email" href="mailto:{profile.email}">{profile.email}</a>

  <ul class="links">
    <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
    <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
    <li class="discord">
      <button type="button" onclick={copyDiscord} title="Copy Discord handle">
        Discord: {profile.discord}
      </button>
      <span class="popup-slot" role="status" aria-live="polite">
        {#if popup}
          <span class="popup" in:fly={{ y: -8, duration: 160 }} out:fly={{ y: -8, duration: 140 }}>
            {popup}
          </span>
        {/if}
      </span>
    </li>
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
  .links a,
  .links button {
    display: block;
    padding: 5px 16px 4px;
    border: 1px solid var(--mat-rule);
    border-radius: 999px;
    background: none;
    text-decoration: none;
    line-height: inherit;
    cursor: pointer;
  }
  .links a:hover,
  .links button:hover {
    background: var(--hi);
    border-color: var(--hi);
    color: #1d1b16;
  }

  /* the "copied" pop-up sits just below the Discord button */
  .discord {
    position: relative;
  }
  .popup-slot {
    position: absolute;
    left: 50%;
    top: calc(100% + 10px);
    translate: -50% 0;
    pointer-events: none;
  }
  .popup {
    display: block;
    padding: 5px 14px 4px;
    border: 1px solid rgba(255, 216, 74, 0.5);
    border-radius: 999px;
    background: #12110f;
    color: #efe7d3;
    font-size: 14px;
    white-space: nowrap;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
  }
  .popup::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 100%;
    width: 9px;
    height: 9px;
    margin: 0 0 -5px -5px;
    rotate: 45deg;
    background: #12110f;
    border-left: 1px solid rgba(255, 216, 74, 0.5);
    border-top: 1px solid rgba(255, 216, 74, 0.5);
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
</style>
