// A small game layer: four things to find on the page. Unlocking one shows
// a pop-up (Toast.svelte) and ticks it off in the footer. Progress lasts for
// the visit only; nothing is stored.

export const list = [
  { id: 'directors-cut', name: "Director's cut", hint: 'Replay the countdown' },
  { id: 'lights', name: 'Lights, camera', hint: 'Flip the lights' },
  { id: 'side-a', name: 'Side A', hint: 'Spin the tape' },
  { id: 'credits', name: 'Roll credits', hint: 'Reach the end' },
];

export const achievements = $state({ found: [], toast: null });

let timer;

export function unlock(id) {
  if (achievements.found.includes(id)) return;
  const item = list.find((entry) => entry.id === id);
  if (!item) return;

  achievements.found.push(id);
  achievements.toast = item;
  clearTimeout(timer);
  timer = setTimeout(() => (achievements.toast = null), 4200);
}
