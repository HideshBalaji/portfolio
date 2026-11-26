<script>
  // Work history, laid out like a page of a screenplay: each job is a scene
  // with a slugline (place and date), then the role, then the action lines.
  import { experience } from '../data.js';
</script>

<section class="section column" id="experience">
  <h2 class="section-title">where i've worked</h2>
  <p class="section-note">Typed up like a script. Old habit from the film club.</p>

  <div class="page paper">
    <span class="tape" style="left: 16%; rotate: -4deg"></span>
    <span class="tape" style="left: 84%; rotate: 3deg"></span>
    <span class="holes" aria-hidden="true"><i></i><i></i><i></i></span>

    <ol>
      {#each experience as job (job.company)}
        <li class="scene">
          <h3>
            <span class="slug">Int. {job.company}, {job.place}</span>
            <span class="when">{job.when}</span>
          </h3>
          <p class="role">{job.role}</p>
          {#if job.note}<p class="note">{job.note}</p>{/if}

          <ul class="lines">
            {#each job.lines as line (line)}
              <li>{line}</li>
            {/each}
          </ul>
        </li>
      {/each}
    </ol>

    <p class="cut">Cut to: whatever's next.</p>
  </div>
</section>

<style>
  .page {
    padding: 56px 64px 44px 92px;
  }

  /* three-hole punch down the left edge */
  .holes {
    position: absolute;
    left: 26px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .holes i {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--mat);
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.45);
  }

  .scene + .scene {
    margin-top: 40px;
  }

  h3 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2px 24px;
    font-size: 17px;
    line-height: 1.4;
  }
  .slug {
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .when {
    font-weight: 400;
    color: var(--ink-dim);
    white-space: nowrap;
  }

  .role {
    margin-top: 2px;
    font-family: var(--hand);
    font-size: 26px;
    line-height: 1.2;
    color: var(--red);
  }

  .lines {
    margin-top: 10px;
    max-width: 64ch;
  }
  .lines li {
    position: relative;
    padding-left: 20px;
    font-size: 15.5px;
  }
  .lines li + li {
    margin-top: 7px;
  }
  .lines li::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 0.78em;
    width: 9px;
    height: 2px;
    background: var(--ink);
  }

  .note {
    font-size: 14.5px;
    color: var(--ink-dim);
  }

  .cut {
    margin-top: 44px;
    text-align: right;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--ink-dim);
  }

  @media (max-width: 760px) {
    .page {
      padding: 40px 22px 32px;
    }
    .holes {
      display: none;
    }
  }
</style>
