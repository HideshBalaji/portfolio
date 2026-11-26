<script>
  import Nav from './lib/components/Nav.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Experience from './lib/components/Experience.svelte';
  import Paper from './lib/components/Paper.svelte';
  import Toolkit from './lib/components/Toolkit.svelte';
  import OffScreen from './lib/components/OffScreen.svelte';
  import OnRepeat from './lib/components/OnRepeat.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Toast from './lib/components/Toast.svelte';
</script>

<!-- Worn-ink filter: wobbles the edges of whatever it is applied to and
     knocks small specks out of it, like a bad photocopy. Use it from CSS
     with `filter: url(#rough)`. -->
<svg class="defs" width="0" height="0" aria-hidden="true">
  <filter id="rough" x="-5%" y="-10%" width="110%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" result="wobble" />
    <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="3" seed="8" result="specks" />
    <feColorMatrix
      in="specks"
      type="matrix"
      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -10 6.7"
      result="mask"
    />
    <feComposite in="wobble" in2="mask" operator="in" />
  </filter>
</svg>

<a class="skip" href="#work">Skip to work</a>
<Nav />

<main id="top">
  <Hero />
  <Projects />
  <Experience />
  <Paper />
  <Toolkit />
  <OffScreen />
  <OnRepeat />
  <Contact />
</main>

<Toast />

<style>
  .defs {
    position: absolute;
  }

  .skip {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 100;
    padding: 6px 12px;
    background: var(--hi);
    color: #1d1b16;
    translate: 0 -200%;
  }
  .skip:focus {
    translate: 0 0;
  }
</style>
