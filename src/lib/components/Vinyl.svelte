<script>
  // A record sliding out of its sleeve, dropped somewhere on the desk.
  // The sleeves are plain colour with handwriting, not real cover art.
  //
  // `peek` is the side the disc sticks out of: 'right', 'left' or 'up'.
  // Position it from the parent with CSS variables in `style`:
  //   --top, --right (offsets inside the section) and --tilt (rotation).
  // The disc slides further out and spins while hovered.
  let { record, peek = 'right', style = '' } = $props();
</script>

<figure
  class="vinyl peek-{peek}"
  style="--sleeve: {record.sleeve}; --sleeve-ink: {record.ink}; --label: {record.label}; {style}"
>
  <span class="disc" aria-hidden="true"><span class="label"></span></span>
  <span class="sleeve" aria-hidden="true">
    <span class="title" class:long={record.title.length > 9}>{record.title}</span>
    {#if record.artist}<span class="artist">{record.artist}</span>{/if}
  </span>
  <figcaption class="visually-hidden">
    Vinyl record: {record.title}{record.artist ? ` by ${record.artist}` : ''}
  </figcaption>
</figure>

<style>
  .vinyl {
    position: absolute;
    top: var(--top, 0);
    right: var(--right, 0);
    width: 130px;
    height: 130px;
    rotate: var(--tilt, 0deg);
    filter: drop-shadow(0 8px 9px rgba(0, 0, 0, 0.42));
  }

  .disc {
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    /* grooves, then two bands of light across the surface */
    background:
      repeating-radial-gradient(circle, transparent 0 2px, rgba(255, 255, 255, 0.055) 2px 3px),
      conic-gradient(
        from 30deg,
        #131210 0 8%,
        #34312b 14%,
        #131210 20% 58%,
        #34312b 64%,
        #131210 70%
      );
    transition: translate 0.3s ease;
  }
  .peek-right .disc {
    translate: 60px 0;
  }
  .peek-left .disc {
    translate: -60px 0;
  }
  .peek-up .disc {
    translate: 0 -60px;
  }
  .peek-right:hover .disc {
    translate: 76px 0;
  }
  .peek-left:hover .disc {
    translate: -76px 0;
  }
  .peek-up:hover .disc {
    translate: 0 -76px;
  }
  .vinyl:hover .disc {
    animation: spin 2.4s linear infinite;
  }
  @keyframes spin {
    to {
      rotate: 360deg;
    }
  }

  .label {
    position: absolute;
    inset: 32%;
    border-radius: 50%;
    background:
      radial-gradient(circle, #131210 0 9%, transparent 10%),
      linear-gradient(transparent 46%, rgba(0, 0, 0, 0.25) 46% 54%, transparent 54%), var(--label);
  }

  .sleeve {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px 12px;
    border-radius: 2px;
    color: var(--sleeve-ink);
    background-color: var(--sleeve);
    /* worn corners and a faint ring where the record presses on the card */
    background-image:
      radial-gradient(circle at 50% 50%, transparent 0 44%, rgba(0, 0, 0, 0.1) 45% 46%, transparent 47%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='130'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 -3 1.6'/%3E%3C/filter%3E%3Crect width='130' height='130' filter='url(%23n)' opacity='.3'/%3E%3C/svg%3E");
  }
  .title {
    font-family: var(--hand);
    font-size: 31px;
    line-height: 0.95;
  }
  /* longer titles drop a size so they fit the sleeve */
  .title.long {
    font-size: 24px;
    line-height: 1;
  }
  .artist {
    margin-top: 2px;
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1.3;
  }

  /* on phones the records shrink and sit in the gap above the section title */
  @media (max-width: 760px) {
    .vinyl {
      top: -34px;
      right: 0;
      scale: 0.6;
      transform-origin: top right;
    }
    .vinyl.peek-right {
      right: 30px;
    }
    .vinyl.peek-up {
      top: 6px;
    }
  }
</style>
