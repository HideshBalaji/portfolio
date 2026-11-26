<script>
  // The "achievement unlocked" pop-up.
  import { fly } from 'svelte/transition';
  import { achievements, list } from '../achievements.svelte.js';
</script>

<div class="slot" role="status" aria-live="polite">
  {#if achievements.toast}
    {#key achievements.toast.id}
      <div class="toast" in:fly={{ y: 24, duration: 260 }} out:fly={{ y: 24, duration: 200 }}>
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            d="M10 6h12v7a6 6 0 0 1-12 0V6Zm0 2H6v2a4 4 0 0 0 4 4m12-6h4v2a4 4 0 0 1-4 4m-6 5v5m-5 2h10"
          />
        </svg>
        <p>
          <span class="small">
            Achievement unlocked, {achievements.found.length} of {list.length}
          </span>
          <strong>{achievements.toast.name}</strong>
        </p>
      </div>
    {/key}
  {/if}
</div>

<style>
  .slot {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 60;
    pointer-events: none;
    /* one cell, so a new pop-up replaces the old one in place */
    display: grid;
    justify-items: end;
  }

  .toast {
    grid-area: 1 / 1;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 20px 10px 10px;
    border: 1px solid rgba(255, 216, 74, 0.5);
    border-radius: 999px;
    background: #12110f;
    color: #efe7d3;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  }

  svg {
    flex: none;
    width: 44px;
    height: 44px;
    padding: 8px;
    border-radius: 50%;
    background: var(--hi);
    fill: none;
    stroke: #1d1b16;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  p {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }
  .small {
    font-size: 12.5px;
    color: #b9b19c;
  }
  strong {
    font-size: 17px;
  }

  @media (max-width: 560px) {
    .slot {
      left: 12px;
      right: 12px;
      bottom: 12px;
      justify-items: center;
    }
  }
</style>
