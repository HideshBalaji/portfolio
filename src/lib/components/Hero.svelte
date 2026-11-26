<script>
  import { profile } from '../data.js';
  import Polaroid from './Polaroid.svelte';
  import Stickers from './Stickers.svelte';

  // The underline under the name draws itself once the countdown finishes.
  let rolled = $state(false);
</script>

<section class="hero column">
  <Stickers />

  <div class="photo">
    <Polaroid photo={profile.photo} name={profile.name} ondone={() => (rolled = true)} />
  </div>

  <div class="intro">
    <h1>
      hey, i'm
      <span class="name" class:rolled>
        hidesh balaji
        <svg viewBox="0 0 400 16" preserveAspectRatio="none" aria-hidden="true">
          <path d="M3 9 C 60 2, 130 15, 215 7 S 350 3, 397 10" pathLength="1" />
        </svg>
      </span>
    </h1>

    <p class="role">Software engineer in {profile.location}.</p>

    <p>
      I play <mark>video games</mark>, listen to <mark>music</mark> and build the things I think are
      needed.
    </p>
    <p>I love experimenting with <mark>new stacks and frameworks</mark>.</p>

    <ul class="links">
      <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
      <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="mailto:{profile.email}">Email</a></li>
    </ul>
  </div>
</section>

<style>
  .hero {
    position: relative;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 52px;
    align-items: start;
    padding-top: 128px;
    padding-bottom: 56px;
  }

  .photo {
    padding-top: 22px;
  }

  h1 {
    font-family: var(--hand);
    font-weight: 400;
    font-size: clamp(46px, 8.2vw, 84px);
    line-height: 0.98;
    letter-spacing: 0.005em;
    margin-bottom: 20px;
  }

  .name {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }
  .name svg {
    position: absolute;
    left: -2%;
    bottom: -0.16em;
    width: 104%;
    height: 0.2em;
    overflow: visible;
  }
  .name path {
    fill: none;
    stroke: var(--red);
    stroke-width: 5;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    /* hidden until it draws, so the round line cap doesn't show as a dot */
    opacity: 0;
    transition:
      stroke-dashoffset 0.7s cubic-bezier(0.6, 0, 0.3, 1),
      opacity 0.1s;
  }
  .name.rolled path {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  .role {
    font-weight: 700;
    font-size: 1.08em;
    margin-bottom: 18px;
  }

  p {
    max-width: 56ch;
  }
  p + p {
    margin-top: 12px;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }
  .links a {
    display: block;
    padding: 5px 16px 4px;
    border: 1px solid var(--mat-rule);
    border-radius: 999px;
    text-decoration: none;
    transition:
      background-color 0.15s,
      border-color 0.15s,
      color 0.15s;
  }
  .links a:hover {
    background: var(--hi);
    border-color: var(--hi);
    color: #1d1b16;
  }

  @media (max-width: 760px) {
    .hero {
      grid-template-columns: 1fr;
      gap: 34px;
      padding-top: 104px;
    }
    .photo {
      padding-top: 10px;
      padding-left: 8px;
    }
  }
</style>
