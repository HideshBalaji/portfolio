<script>
  import { offScreen } from '../data.js';
</script>

<section class="section column" id="off-screen">
  <h2 class="section-title">off screen</h2>
  <p class="section-note">The parts of the CV that have nothing to do with code.</p>

  <ul class="row">
    {#each offScreen as item, i (item.title)}
      <li class="snap paper">
        <span class="tape" style="rotate: {[-6, 4, -3][i % 3]}deg"></span>

        <div class="picture" aria-hidden="true">
          <svg viewBox="0 0 120 80">
            {#if item.icon === 'reel'}
              <circle class="stroke" cx="60" cy="40" r="28" />
              <circle class="fill" cx="60" cy="40" r="4" />
              {#each [0, 60, 120, 180, 240, 300] as a (a)}
                <circle class="fill" cx="60" cy="23" r="6.5" transform="rotate({a} 60 40)" />
              {/each}
              <path class="stroke" d="M60 68 C 84 70, 98 66, 112 72" />
            {:else if item.icon === 'ball'}
              <rect class="stroke" x="8" y="10" width="104" height="60" />
              <line class="stroke" x1="60" y1="10" x2="60" y2="70" />
              <circle class="stroke" cx="60" cy="40" r="12" />
              <rect class="stroke" x="8" y="26" width="14" height="28" />
              <rect class="stroke" x="98" y="26" width="14" height="28" />
              <circle class="fill" cx="60" cy="40" r="3.2" />
            {:else}
              <circle class="red" cx="60" cy="76" r="44" />
              <rect class="fill" x="56" y="20" width="8" height="18" rx="4" />
              <path class="stroke" d="M50 32 a10 10 0 0 0 20 0 M60 42 V52 M52 52 H68" />
            {/if}
          </svg>
        </div>

        <h3>{item.title}</h3>
        <p class="role">{item.role}<span>, {item.when}</span></p>
        <p class="text">{item.text}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  .row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    align-items: start;
  }

  .snap {
    padding: 11px 11px 18px;
  }
  .snap:nth-child(1) {
    rotate: -1.6deg;
  }
  .snap:nth-child(2) {
    rotate: 1.1deg;
    margin-top: 16px;
  }
  .snap:nth-child(3) {
    rotate: -0.7deg;
  }

  .picture {
    background: var(--screen);
    padding: 16px 20px;
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .stroke {
    fill: none;
    stroke: var(--screen-ink);
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .fill {
    fill: var(--hi);
  }
  .red {
    fill: var(--red);
  }

  h3 {
    margin-top: 12px;
    padding-inline: 4px;
    font-family: var(--hand);
    font-weight: 400;
    font-size: 28px;
    line-height: 1.1;
  }
  .role {
    padding-inline: 4px;
    font-weight: 700;
    font-size: 14.5px;
    margin-top: 4px;
  }
  .role span {
    font-weight: 400;
    color: var(--ink-dim);
  }
  .text {
    padding-inline: 4px;
    margin-top: 8px;
    font-size: 14.5px;
    line-height: 1.55;
  }

  @media (max-width: 820px) {
    .row {
      grid-template-columns: 1fr;
      max-width: 360px;
      gap: 34px;
    }
    .snap:nth-child(2) {
      margin-top: 0;
    }
  }
</style>
