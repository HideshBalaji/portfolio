<script>
  // A cassette with a handwritten label. Pressing it spins the reels;
  // there is no audio.
  let { title, artist, onplay = () => {} } = $props();

  let playing = $state(false);

  function toggle() {
    playing = !playing;
    if (playing) onplay();
  }

  const teeth = [0, 60, 120, 180, 240, 300];
</script>

<button
  class="cassette"
  class:playing
  type="button"
  aria-pressed={playing}
  aria-label="{title} by {artist}. Spin the tape (there is no sound)"
  onclick={toggle}
>
  <svg viewBox="0 0 260 164" aria-hidden="true">
    <rect class="shell" x="3" y="3" width="254" height="158" rx="10" />
    <rect class="sticker" x="20" y="16" width="220" height="92" rx="4" />
    <text class="hand" x="30" y="42">{title}</text>
    <text class="typed" x="230" y="41" text-anchor="end">{artist}</text>
    <line class="rule" x1="30" y1="50" x2="230" y2="50" />
    <rect class="window" x="58" y="58" width="144" height="40" rx="20" />
    {#each [92, 168] as cx (cx)}
      <g class="reel">
        <circle class="hub" {cx} cy="78" r="15" />
        {#each teeth as angle (angle)}
          <rect
            class="tooth"
            x={cx - 1.5}
            y="65"
            width="3"
            height="7"
            transform="rotate({angle} {cx} 78)"
          />
        {/each}
      </g>
    {/each}
    <rect class="tape-band" x="110" y="70" width="40" height="16" />
    <path class="shell-line" d="M58 161 L70 124 H190 L202 161" />
    <circle class="screw" cx="94" cy="143" r="4" />
    <circle class="screw" cx="166" cy="143" r="4" />
    <circle class="screw" cx="14" cy="14" r="3" />
    <circle class="screw" cx="246" cy="14" r="3" />
    <circle class="screw" cx="14" cy="150" r="3" />
    <circle class="screw" cx="246" cy="150" r="3" />
  </svg>
</button>

<style>
  .cassette {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    transition: rotate 0.2s ease;
  }
  .cassette svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .shell {
    fill: #1b1a18;
    stroke: #131210;
    stroke-width: 2;
  }
  .shell-line {
    fill: #26241f;
    stroke: #3b382f;
    stroke-width: 1.5;
  }
  .sticker {
    fill: #f4ecd9;
  }
  .rule {
    stroke: #131210;
    stroke-width: 1;
    opacity: 0.4;
  }
  .hand {
    font-family: var(--hand);
    font-size: 22px;
    fill: var(--red);
  }
  .typed {
    font-family: var(--type);
    font-size: 10.5px;
    font-weight: 700;
    fill: #131210;
  }
  .window {
    fill: #131210;
  }
  .hub {
    fill: #f4ecd9;
  }
  .tooth {
    fill: #131210;
  }
  .tape-band {
    fill: #4a3526;
  }
  .screw {
    fill: #56524a;
  }

  .reel {
    transform-box: fill-box;
    transform-origin: center;
  }
  .playing .reel {
    animation: spin 1.5s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
