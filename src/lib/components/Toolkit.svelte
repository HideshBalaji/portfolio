<script>
  import { toolkit } from '../data.js';
</script>

<section class="section column" id="toolkit">
  <h2 class="section-title">the toolkit</h2>
  <p class="section-note">What I reach for, grouped by the kind of work.</p>

  <dl>
    {#each toolkit as set (set.group)}
      <div class="set">
        <dt>{set.group}</dt>
        <dd>
          <ul>
            {#each set.items as item (item)}
              <li>{item}</li>
            {/each}
          </ul>
        </dd>
      </div>
    {/each}
  </dl>
</section>

<style>
  dl {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 34px 36px;
  }

  .set {
    padding-top: 12px;
    border-top: 1px dashed var(--mat-rule);
  }

  dt {
    font-family: var(--hand);
    font-size: 28px;
    line-height: 1.15;
    color: var(--hi);
    margin-bottom: 10px;
  }
  :global([data-theme='light']) dt {
    color: var(--red);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }
  li {
    padding: 2px 11px 1px;
    border: 1px solid var(--mat-rule);
    border-radius: 999px;
    font-size: 14.5px;
  }

  @media (max-width: 760px) {
    dl {
      grid-template-columns: 1fr;
      gap: 28px;
    }
  }
</style>
