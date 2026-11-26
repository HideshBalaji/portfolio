<script>
  // Hand-drawn stickers that sit in the margins of the hero on wide screens:
  // a clapperboard, a football and a ticket stub for the conference paper.
  // Each shape is drawn twice. The first copy is fattened into a cream
  // die-cut border, the second is the artwork itself.

  const rad = (deg) => (deg * Math.PI) / 180;
  const pt = (cx, cy, r, deg) =>
    `${(cx + r * Math.cos(rad(deg))).toFixed(1)},${(cy + r * Math.sin(rad(deg))).toFixed(1)}`;
  const pentagon = (cx, cy, r, start) =>
    [0, 1, 2, 3, 4].map((i) => pt(cx, cy, r, start + i * 72)).join(' ');

  const spokes = [0, 1, 2, 3, 4].map((i) => -90 + i * 72);
  const ball = {
    centre: pentagon(50, 50, 13, -90),
    seams: spokes.map((a) => ({ from: pt(50, 50, 13, a), to: pt(50, 50, 27, a) })),
    // the neighbouring dark panels, mostly hidden round the edge of the ball
    rim: spokes.map((a) => {
      const [x, y] = pt(50, 50, 40, a).split(',').map(Number);
      return pentagon(x, y, 13, a + 180);
    }),
    // seams joining one rim panel to the next
    links: spokes.map((a) => {
      const [x1, y1] = pt(50, 50, 40, a).split(',').map(Number);
      const [x2, y2] = pt(50, 50, 40, a + 72).split(',').map(Number);
      return { from: pt(x1, y1, 13, a + 180 - 72), to: pt(x2, y2, 13, a + 72 + 180 + 72) };
    }),
  };
</script>

{#snippet clapper()}
  <g transform="rotate(-13 14 46)">
    <rect x="12" y="26" width="118" height="18" rx="2" fill="#1d1b16" />
    {#each [0, 1, 2, 3, 4] as i (i)}
      <polygon
        points="{24 + i * 24},26 {36 + i * 24},26 {28 + i * 24},44 {16 + i * 24},44"
        fill="#f4ecd9"
      />
    {/each}
  </g>
  <rect x="12" y="46" width="118" height="16" fill="#1d1b16" />
  {#each [0, 1, 2, 3, 4] as i (i)}
    <polygon
      points="{16 + i * 24},46 {28 + i * 24},46 {36 + i * 24},62 {24 + i * 24},62"
      fill="#f4ecd9"
    />
  {/each}
  <rect x="12" y="62" width="118" height="54" rx="3" fill="#24221d" />
  <line x1="12" y1="80" x2="130" y2="80" stroke="#f4ecd9" stroke-width="1" opacity=".5" />
  <line x1="12" y1="98" x2="130" y2="98" stroke="#f4ecd9" stroke-width="1" opacity=".5" />
  <line x1="74" y1="98" x2="74" y2="116" stroke="#f4ecd9" stroke-width="1" opacity=".5" />
  <text x="19" y="76" class="chalk">prod. portfolio</text>
  <text x="19" y="94" class="chalk">dir. hidesh</text>
  <text x="19" y="112" class="chalk">scene 1</text>
  <text x="81" y="112" class="chalk">take 2</text>
{/snippet}

{#snippet football()}
  <circle cx="50" cy="50" r="40" fill="#f7f3e8" stroke="#1d1b16" stroke-width="3" />
  <g clip-path="url(#ball-clip)">
    <polygon points={ball.centre} fill="#1d1b16" />
    {#each ball.rim as points (points)}
      <polygon {points} fill="#1d1b16" />
    {/each}
    {#each [...ball.seams, ...ball.links] as seam (seam.from + seam.to)}
      <polyline
        points="{seam.from} {seam.to}"
        fill="none"
        stroke="#1d1b16"
        stroke-width="2.2"
        stroke-linecap="round"
      />
    {/each}
  </g>
{/snippet}

{#snippet gamepad()}
  <path
    d="M38 22H112C132 22 142 44 146 70C149 88 138 96 128 90C118 84 112 70 100 70H50C38 70 32 84 22 90C12 96 1 88 4 70C8 44 18 22 38 22Z"
    fill="#24221d"
  />
  <rect x="39" y="34" width="7" height="22" rx="1.5" fill="#f4ecd9" />
  <rect x="31.5" y="41.500" width="22" height="7" rx="1.5" fill="#f4ecd9" />
  <circle cx="108" cy="36" r="4.5" fill="#ffd84a" />
  <circle cx="117" cy="45" r="4.5" fill="#f0553a" />
  <circle cx="99" cy="45" r="4.5" fill="#f4ecd9" />
  <circle cx="108" cy="54" r="4.5" fill="#f4ecd9" />
  <rect x="64" y="36" width="9" height="4" rx="2" fill="#6b665a" />
  <rect x="77" y="36" width="9" height="4" rx="2" fill="#6b665a" />
  <circle cx="60" cy="60" r="8" fill="#3a372f" stroke="#f4ecd9" stroke-width="1.5" />
  <circle cx="90" cy="60" r="8" fill="#3a372f" stroke="#f4ecd9" stroke-width="1.5" />
{/snippet}

{#snippet pick()}
  <path
    d="M30 66C20 52 4 34 6 20C8 8 20 4 30 4C40 4 52 8 54 20C56 34 40 52 30 66Z"
    fill="#f0553a"
  />
  <text x="30" y="34" text-anchor="middle" class="pick-text">hb</text>
{/snippet}

<div class="stickers" aria-hidden="true">
  <svg class="sticker gamepad" viewBox="0 0 150 100">
    <g class="die-cut">{@render gamepad()}</g>
    {@render gamepad()}
  </svg>

  <svg class="sticker pick" viewBox="0 0 60 70">
    <g class="die-cut">{@render pick()}</g>
    {@render pick()}
  </svg>

  <svg class="sticker clapper" viewBox="0 0 142 124">
    <g class="die-cut">{@render clapper()}</g>
    {@render clapper()}
  </svg>

  <svg class="sticker football" viewBox="0 0 100 100">
    <defs>
      <clipPath id="ball-clip"><circle cx="50" cy="50" r="38.5" /></clipPath>
    </defs>
    <g class="die-cut">{@render football()}</g>
    {@render football()}
  </svg>
</div>

<a class="ticket" href="#paper" aria-label="Jump to the ICICT 2025 conference paper">
  <span class="tape" style="left: 26%; rotate: -9deg; width: 70px"></span>
  <span class="stub">admit<br />one</span>
  <span class="body">
    <strong>ICICT 2025</strong>
    <span>IEEE conference paper</span>
    <span>pp. 1314–1319</span>
  </span>
</a>

<style>
  .stickers,
  .ticket {
    display: none;
  }

  @media (min-width: 1340px) {
    .stickers {
      display: block;
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .sticker {
      position: absolute;
      overflow: visible;
      filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.4));
    }
    .clapper {
      width: 158px;
      left: -214px;
      top: 6px;
      rotate: -7deg;
    }
    .football {
      width: 96px;
      left: -150px;
      top: 258px;
      rotate: 14deg;
    }

    .die-cut :global(*) {
      fill: #f4ecd9;
      stroke: #f4ecd9;
      stroke-width: 9px;
      stroke-linejoin: round;
      opacity: 1;
    }

    .chalk {
      font-family: var(--hand);
      font-size: 13px;
      fill: #f4ecd9;
    }
    .pick-text {
      font-family: var(--hand);
      font-size: 24px;
      fill: #1d1b16;
    }
    .die-cut text {
      display: none;
    }

    .gamepad {
      width: 150px;
      right: -214px;
      top: 236px;
      rotate: -10deg;
    }
    .pick {
      width: 50px;
      right: -96px;
      top: 372px;
      rotate: 20deg;
    }

    .ticket {
      position: absolute;
      right: -224px;
      top: 54px;
      display: flex;
      width: 184px;
      rotate: 6deg;
      color: #1d1b16;
      text-decoration: none;
      line-height: 1.3;
      filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.4));
      transition: rotate 0.2s ease;
    }
    .ticket:hover {
      rotate: 2deg;
    }
    .stub,
    .body {
      background: var(--hi);
      /* little semicircle bites where the stub tears off */
      --bite: radial-gradient(circle 6px at var(--side) 0, transparent 98%, #000) top / 100% 51%
          no-repeat,
        radial-gradient(circle 6px at var(--side) 100%, transparent 98%, #000) bottom / 100% 51%
          no-repeat;
      -webkit-mask: var(--bite);
      mask: var(--bite);
    }
    .stub {
      --side: 100%;
      display: grid;
      place-items: center;
      padding: 12px 12px 12px 10px;
      border-right: 2px dashed rgba(29, 27, 22, 0.45);
      font-size: 11px;
      font-weight: 700;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .body {
      --side: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px 10px 10px 14px;
      font-size: 11.5px;
    }
    .body strong {
      font-size: 17px;
      letter-spacing: 0.02em;
    }
  }
</style>
