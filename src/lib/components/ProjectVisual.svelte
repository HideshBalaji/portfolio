<script>
  // Small drawn "screens" that stand in for screenshots on each project card.
  // They are diagrams of what the project does, not real captures.
  let { kind } = $props();

  const ranks = [84, 70, 58, 47, 38];
</script>

<svg class="screen" viewBox="0 0 320 180" aria-hidden="true">
  <rect width="320" height="180" fill="var(--screen)" />

  {#if kind === 'rag'}
    <!-- resume → skills → ranked job titles -->
    <rect class="line" x="22" y="42" width="58" height="78" rx="3" />
    {#each [56, 66, 76, 86, 96, 106] as y, i (y)}
      <line class="line thin" x1="31" y1={y} x2={i % 3 === 2 ? 58 : 71} y2={y} />
    {/each}
    <text class="label" x="51" y="140" text-anchor="middle">resume</text>

    <path class="line arrow" d="M88 81 H110 M104 75 L111 81 L104 87" />

    {#each ['spaCy', 'TF-IDF', 'cosine'] as step, i (step)}
      <rect class="line" x="118" y={48 + i * 25} width="64" height="18" rx="9" />
      <text class="label bright" x="150" y={61 + i * 25} text-anchor="middle">{step}</text>
    {/each}
    <text class="label" x="150" y="140" text-anchor="middle">match</text>

    <path class="line arrow" d="M190 81 H212 M206 75 L213 81 L206 87" />

    {#each ranks as width, i (width)}
      <rect
        x="220"
        y={46 + i * 15}
        {width}
        height="9"
        rx="2"
        fill={i === 0 ? 'var(--hi)' : 'var(--screen-ink)'}
        opacity={i === 0 ? 1 : 0.55}
      />
    {/each}
    <text class="label" x="262" y="140" text-anchor="middle">top 5 job titles</text>
  {:else if kind === 'scan'}
    <!-- a phone scanning a patch of skin -->
    <rect class="line" x="118" y="12" width="84" height="156" rx="11" />
    <rect x="126" y="26" width="68" height="84" rx="3" fill="#d9a184" />
    <path
      d="M148 58 C150 48 166 46 172 55 C180 62 176 78 166 80 C155 84 144 72 148 58 Z"
      fill="#7a3f2c"
    />
    <path
      class="reticle"
      d="M138 50 V42 H146 M174 42 H182 V50 M182 86 V94 H174 M146 94 H138 V86"
    />
    <rect x="126" y="120" width="68" height="7" rx="3.5" fill="var(--screen-ink)" opacity=".7" />
    <rect x="126" y="134" width="44" height="6" rx="3" fill="var(--screen-ink)" opacity=".35" />
    <rect x="126" y="147" width="68" height="10" rx="5" fill="var(--hi)" />
    <text class="label" x="60" y="80" text-anchor="middle">HAM10000</text>
    <text class="label" x="60" y="94" text-anchor="middle">dataset</text>
    <text class="label" x="260" y="80" text-anchor="middle">TensorFlow</text>
    <text class="label" x="260" y="94" text-anchor="middle">Lite, on device</text>
  {:else if kind === 'bench'}
    <!-- runtime comparison: 3.43 s against 0.48 s -->
    <text class="label" x="26" y="42">pandas</text>
    <rect x="26" y="50" width="240" height="20" rx="2" fill="var(--screen-ink)" opacity=".55" />
    <text class="label bright" x="274" y="64">3.43 s</text>
    <text class="label" x="26" y="98">Polars</text>
    <rect x="26" y="106" width="33.6" height="20" rx="2" fill="var(--hi)" />
    <text class="label bright" x="68" y="120">0.48 s</text>
    <text class="hand big" x="294" y="152" text-anchor="end">7× faster</text>
    <text class="label" x="26" y="152">NYC Taxi dataset</text>
  {/if}
</svg>

<style>
  .screen {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 3px;
  }

  .line {
    fill: none;
    stroke: var(--screen-ink);
    stroke-width: 1.6;
  }
  .thin {
    stroke-width: 1.2;
    opacity: 0.6;
  }
  .arrow {
    stroke: var(--hi);
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .reticle {
    fill: none;
    stroke: var(--hi);
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .label {
    font-family: var(--type);
    font-size: 10.5px;
    fill: var(--screen-ink);
    opacity: 0.7;
  }
  .bright {
    opacity: 1;
  }
  .hand {
    font-family: var(--hand);
    font-size: 21px;
    fill: var(--screen-ink);
  }
  .big {
    font-size: 30px;
    fill: var(--hi);
  }
</style>
