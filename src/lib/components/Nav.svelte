<script>
  import { onMount } from 'svelte';
  import { unlock } from '../achievements.svelte.js';

  const links = [
    { id: 'work', label: 'work' },
    { id: 'experience', label: 'experience' },
    { id: 'paper', label: 'paper' },
    { id: 'toolkit', label: 'toolkit' },
    { id: 'off-screen', label: 'off screen' },
    { id: 'contact', label: 'contact' },
  ];

  let time = $state('');
  let theme = $state('dark');
  let active = $state('');

  const clock = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // storage can be blocked; the toggle still works for this visit
    }
    unlock('lights');
  }

  onMount(() => {
    theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

    const tick = () => (time = clock.format(new Date()));
    tick();
    const timer = setInterval(tick, 15000);

    // highlight the link for whichever section sits in the middle of the screen
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active = entry.target.id;
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    }
    const hero = document.getElementById('top');
    const clear = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.scrollY < 200) active = '';
      },
      { threshold: 0 },
    );
    if (hero) clear.observe(hero);

    return () => {
      clearInterval(timer);
      spy.disconnect();
      clear.disconnect();
    };
  });
</script>

<header class="bar">
  <nav class="pill" aria-label="Sections">
    <a class="home" href="#top" aria-label="Back to top">hb</a>
    <ul>
      {#each links as link (link.id)}
        <li>
          <a href="#{link.id}" aria-current={active === link.id ? 'true' : undefined}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
    <span class="clock" title="Local time in Chennai">
      <span class="dot" aria-hidden="true"></span>
      {time} IST
    </span>
    <button
      class="lights"
      type="button"
      onclick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}
    >
      {theme === 'dark' ? 'lights on' : 'lights off'}
    </button>
  </nav>
</header>

<style>
  .bar {
    position: fixed;
    inset: 14px 0 auto 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    padding-inline: 12px;
    pointer-events: none;
  }

  .pill {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 18px;
    max-width: 100%;
    padding: 7px 8px 7px 18px;
    border: 1px solid var(--mat-rule);
    border-radius: 999px;
    background: color-mix(in srgb, var(--mat-deep) 86%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    font-size: 14px;
    line-height: 1.4;
  }

  .home {
    font-family: var(--hand);
    font-size: 24px;
    line-height: 1;
    text-decoration: none;
    color: var(--hi);
  }
  :global([data-theme='light']) .home {
    color: var(--red);
  }

  ul {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scrollbar-width: none;
    white-space: nowrap;
  }
  ul::-webkit-scrollbar {
    display: none;
  }

  ul a {
    display: block;
    padding-block: 3px;
    text-decoration: none;
    color: var(--mat-dim);
    border-bottom: 2px solid transparent;
  }
  ul a:hover {
    color: var(--mat-ink);
  }
  ul a[aria-current='true'] {
    color: var(--mat-ink);
    border-bottom-color: var(--red);
  }

  .clock {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding-left: 16px;
    border-left: 1px solid var(--mat-rule);
    color: var(--mat-dim);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4fd08a;
  }

  .lights {
    padding: 4px 14px 3px;
    border: 1px solid var(--mat-rule);
    border-radius: 999px;
    background: transparent;
    font-family: var(--hand);
    font-size: 19px;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
  }
  .lights:hover {
    background: var(--hi);
    border-color: var(--hi);
    color: #1d1b16;
  }

  @media (max-width: 860px) {
    .clock {
      display: none;
    }
  }
  @media (max-width: 560px) {
    .pill {
      gap: 12px;
      padding-left: 14px;
    }
    ul {
      gap: 13px;
    }
  }
</style>
