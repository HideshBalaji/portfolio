<script>
  import { paper, vinyls } from '../data.js';
  import Vinyl from './Vinyl.svelte';
</script>

<section class="section column" id="paper">
  <Vinyl record={vinyls.blonde} peek="up" style="--top: 236px; --right: 14px; --tilt: 8deg" />
  <h2 class="section-title">in print</h2>
  <p class="section-note">One conference paper so far, written from the career guidance project.</p>

  <article class="clipping paper">
    <span class="tape" style="left: 12%; rotate: -24deg; top: -6px; width: 78px"></span>
    <span class="tape" style="left: 90%; rotate: 21deg; top: -4px; width: 78px"></span>

    <p class="stamp" aria-hidden="true">IEEE<br />published</p>

    <h3>{paper.title}</h3>
    <p class="authors">{paper.authors}</p>
    <p class="venue"><em>{paper.venue}</em>. {paper.detail}</p>
    <p class="doi">
      DOI <a href={paper.href} target="_blank" rel="noopener">{paper.doi}</a>
    </p>
  </article>
</section>

<style>
  .clipping {
    max-width: 720px;
    padding: 40px 44px 34px;
    rotate: -0.8deg;
    background-color: var(--paper-edge);
  }

  h3 {
    max-width: 21ch;
    font-size: clamp(22px, 3.4vw, 30px);
    line-height: 1.22;
    letter-spacing: -0.01em;
  }

  .authors {
    margin-top: 16px;
    font-weight: 700;
  }
  .venue {
    margin-top: 4px;
    max-width: 58ch;
  }
  .doi {
    margin-top: 16px;
    overflow-wrap: anywhere;
  }
  .doi a {
    font-weight: 700;
    text-decoration-color: var(--red);
    text-decoration-thickness: 2px;
  }
  .doi a:hover {
    background: var(--hi);
  }

  /* rubber stamp */
  .stamp {
    position: absolute;
    right: 36px;
    top: 44px;
    padding: 8px 14px 6px;
    border: 3px double var(--red);
    border-radius: 6px;
    rotate: 9deg;
    color: var(--red);
    font-weight: 700;
    font-size: 15px;
    line-height: 1.15;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.85;
    mix-blend-mode: multiply;
  }

  @media (max-width: 640px) {
    .clipping {
      padding: 34px 22px 26px;
    }
    .stamp {
      position: static;
      display: inline-block;
      margin-bottom: 18px;
      rotate: -4deg;
    }
  }
</style>
