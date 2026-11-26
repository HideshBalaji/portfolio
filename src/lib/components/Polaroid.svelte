<script>
  // A taped polaroid that plays a film-leader countdown (3, 2, 1) on load,
  // then settles on a title card, or on a photo if one is set in data.js.
  // Clicking it runs the countdown again.
  import { onMount } from 'svelte';
  import { unlock } from '../achievements.svelte.js';

  let { photo = null, name = '', ondone = () => {} } = $props();

  const STEP = 750;
  let count = $state(3);
  let rolling = $state(false);
  let timer;

  function roll() {
    clearInterval(timer);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rolling = false;
      ondone();
      return;
    }
    count = 3;
    rolling = true;
    timer = setInterval(() => {
      if (count > 1) {
        count -= 1;
      } else {
        clearInterval(timer);
        rolling = false;
        ondone();
      }
    }, STEP);
  }

  function replay() {
    roll();
    unlock('directors-cut');
  }

  onMount(() => {
    roll();
    return () => clearInterval(timer);
  });
</script>

<button class="polaroid paper" type="button" onclick={replay} aria-label="Replay the countdown">
  <span class="tape" style="rotate: -5deg"></span>
  <span class="frame">
    {#if rolling}
      <span class="leader" style="--step: {STEP}ms">
        {#key count}
          <span class="sweep"></span>
        {/key}
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <circle cx="50" cy="50" r="38" />
          <circle cx="50" cy="50" r="31" />
        </svg>
        <span class="count">{count}</span>
      </span>
    {:else if photo}
      <img src={photo} alt="Portrait of {name}" />
    {:else}
      <span class="card">
        <span class="card-small">written and built by</span>
        <span class="card-big">hidesh<br />balaji</span>
      </span>
    {/if}
  </span>
  <span class="caption">hidesh, take 1</span>
</button>

<style>
  .polaroid {
    display: block;
    width: 200px;
    padding: 11px 11px 8px;
    border: 0;
    rotate: -3deg;
    cursor: pointer;
    transition: rotate 0.25s ease;
  }
  .polaroid:hover {
    rotate: -1deg;
  }

  .frame {
    position: relative;
    display: block;
    aspect-ratio: 1 / 1.08;
    overflow: hidden;
    background: var(--screen);
    color: var(--screen-ink);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── film leader ── */
  .leader {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: #cfc7b4;
    color: #1d1b16;
  }
  .leader svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .leader line,
  .leader circle {
    fill: none;
    stroke: #1d1b16;
    stroke-width: 1.2;
  }
  .sweep {
    position: absolute;
    inset: -30%;
    background: conic-gradient(from 0deg, rgba(29, 27, 22, 0.34) 0 100%);
    mask: conic-gradient(from 0deg, #000 var(--angle, 0deg), transparent 0);
    animation: sweep var(--step) linear forwards;
  }
  @property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  @keyframes sweep {
    to {
      --angle: 360deg;
    }
  }
  .count {
    position: relative;
    font-family: var(--type);
    font-weight: 700;
    font-size: 84px;
    line-height: 1;
  }

  /* ── title card ── */
  .card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-align: center;
    background:
      radial-gradient(circle at 50% 40%, rgba(255, 216, 74, 0.12), transparent 65%), var(--screen);
  }
  .card-small {
    font-size: 12px;
    color: #b9b19c;
  }
  .card-big {
    font-family: var(--hand);
    font-size: 40px;
    line-height: 0.95;
    color: var(--hi);
  }

  .caption {
    display: block;
    padding-top: 7px;
    font-family: var(--hand);
    font-size: 21px;
    line-height: 1.2;
    text-align: center;
    color: var(--ink);
  }
</style>
