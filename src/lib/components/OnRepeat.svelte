<script>
  // Games as spines on two shelves, next to a photocopied gig-flyer scrap
  // with two cassettes on it. The tapes only spin; there is no audio.
  import { shelves, tapes } from '../data.js';
  import { unlock } from '../achievements.svelte.js';
  import Cassette from './Cassette.svelte';
</script>

<section class="section column" id="on-repeat">
  <h2 class="section-title">on repeat</h2>
  <p class="section-note">
    My favourite games, the ones I keep going back to, and the music that's usually on.
  </p>

  <div class="split">
    <div class="shelf-side">
      {#each shelves as shelf (shelf.label)}
        <div class="unit">
          <ul class="shelf" aria-label="Games: {shelf.label}">
        {#each shelf.games as game (game.title)}
          <li
            class="spine"
            style="--case: {game.color}; --case-ink: {game.ink}; --height: {game.height}px"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {#if game.icon === 'sun'}
                <path d="M3 17h18M6.5 17a5.5 5.5 0 0 1 11 0M12 5v3M4.6 8.6l2.1 2.1M19.4 8.6l-2.1 2.1" />
              {:else if game.icon === 'hat'}
                <path
                  d="M2 15.5c4 3.4 16 3.4 20 0-2.8.2-4.6-.8-5.6-6.4-.5-2.9-2.6-1.3-4.4-1.3S8.100 6.200 7.600 9.100C6.600 14.700 4.800 15.700 2 15.500Z"
                />
              {:else if game.icon === 'city'}
                <path d="M3 20V9h5v11M8 20V4h6v16M14 20v-8h7v8M2 20h20M10.500 8h1M10.500 12h1M10.500 16h1" />
              {:else if game.icon === 'chip'}
                <path
                  d="M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4M10.500 10.500h3v3h-3z"
                />
              {:else if game.icon === 'rain'}
                <path
                  d="M7 14a4 4 0 0 1 .5-8 5 5 0 0 1 9.600 1.200A3.500 3.500 0 0 1 17 14H7ZM8 17l-1 3M12 17l-1 3M16 17l-1 3"
                />
              {:else if game.icon === 'sword'}
                <path d="M20.500 3.500v3L10 17l-3-3L17.500 3.500h3ZM5 12l7 7M7.500 16.500 4 20" />
              {:else if game.icon === 'lock'}
                <path d="M6 11h12v9H6zM8.500 11V8a3.500 3.500 0 0 1 7 0v3M12 14.500v2" />
              {:else}
                <path d="M12 3.500 21.500 20h-19L12 3.500ZM12 10v4.500M12 17.200v.3" />
              {/if}
            </svg>
            <span class="title">{game.title}</span>
          </li>
        {/each}
          </ul>
          <div class="plank" aria-hidden="true"></div>
          <p class="label">{shelf.label}</p>
        </div>
      {/each}
    </div>

    <div class="flyer-side">
      <span class="tape gaffer" style="left: 30%; rotate: -7deg"></span>
      <div class="flyer">
        <p class="shout" aria-hidden="true">grunge<br />&amp; rock</p>
        <p class="visually-hidden">Grunge and rock</p>

        <ul class="tapes">
          {#each tapes as tape (tape.title)}
            <li>
              <Cassette title={tape.title} artist={tape.artist} onplay={() => unlock('side-a')} />
            </li>
          {/each}
        </ul>

        <p class="caption">press one. they only spin.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 340px);
    gap: 56px;
    align-items: center;
  }

  /* ── the shelves ── */
  .unit + .unit {
    margin-top: 34px;
  }
  .shelf {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    padding-inline: 14px;
  }

  .spine {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 58px;
    height: var(--height);
    padding: 14px 0 12px;
    border-radius: 3px 3px 0 0;
    color: var(--case-ink);
    background-color: var(--case);
    /* scuffs and a worn top edge */
    background-image:
      linear-gradient(90deg, rgba(0, 0, 0, 0.28), transparent 14%, transparent 86%, rgba(0, 0, 0, 0.22)),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3 1.7'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.3'/%3E%3C/svg%3E");
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: translate 0.2s ease;
  }
  .spine:hover {
    translate: 0 -12px;
  }
  .spine:last-child {
    rotate: 5deg;
    transform-origin: bottom left;
    margin-left: 4px;
  }

  .spine svg {
    flex: none;
    width: 30px;
    height: 30px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .title {
    writing-mode: vertical-rl;
    font-weight: 700;
    font-size: 15px;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    white-space: nowrap;
  }

  .plank {
    height: 12px;
    border-radius: 2px;
    background: linear-gradient(#8a6a44, #5f4629);
    box-shadow: 0 8px 14px -6px rgba(0, 0, 0, 0.6);
  }

  .label {
    margin-top: 10px;
    padding-left: 14px;
    font-family: var(--hand);
    font-size: 24px;
    line-height: 1.2;
    color: var(--mat-dim);
  }

  /* ── the flyer ── */
  .flyer-side {
    position: relative;
    rotate: 2deg;
    filter: drop-shadow(0 12px 14px rgba(0, 0, 0, 0.45));
  }

  .gaffer {
    z-index: 1;
    width: 110px;
    height: 30px;
    background: #1b1a18;
    opacity: 0.94;
  }

  .flyer {
    padding: 34px 26px 44px;
    color: #131210;
    background-color: #dbd7cc;
    /* photocopier grain, plus a halftone patch in one corner */
    background-image:
      radial-gradient(circle at 100% 0, transparent 0 34%, #dbd7cc 62%),
      radial-gradient(rgba(19, 18, 16, 0.55) 1.3px, transparent 1.6px),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 1.25'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
    background-size:
      100% 100%,
      7px 7px,
      200px 200px;
    /* torn bottom edge */
    clip-path: polygon(
      0 0, 100% 0, 100% 96%, 94% 98%, 88% 95.500%, 81% 98.500%, 73% 96%, 66% 99%, 58% 96.500%,
      50% 99.500%, 42% 96.500%, 34% 99%, 27% 96%, 19% 98.500%, 12% 95.500%, 6% 98%, 0 96%
    );
  }

  .shout {
    font-weight: 700;
    font-size: 56px;
    line-height: 0.86;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    filter: url(#rough);
  }

  .tapes {
    display: grid;
    gap: 14px;
    margin-top: 22px;
  }
  .tapes li {
    transition: rotate 0.2s ease;
  }
  .tapes li:nth-child(odd) {
    rotate: -3deg;
  }
  .tapes li:nth-child(even) {
    rotate: 2deg;
    margin-left: 10px;
  }
  .tapes li:hover {
    rotate: 0deg;
  }

  .caption {
    margin-top: 12px;
    font-family: var(--hand);
    font-size: 22px;
    line-height: 1.2;
    text-align: center;
  }

  @media (max-width: 820px) {
    .split {
      grid-template-columns: 1fr;
      gap: 48px;
    }
    .flyer-side {
      max-width: 340px;
    }
  }
  @media (max-width: 400px) {
    .shelf {
      padding-inline: 4px;
    }
    .spine {
      width: 52px;
    }
  }
</style>
