// ─── Tweaks panel app ───
// Persisted defaults — the EDITMODE markers let the host rewrite this block on disk.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#5af078",
  "scanlines": true,
  "showGrid": true,
  "fontSize": 13,
  "promptUser": "hidesh@arch"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--green', tweaks.accentColor);
    document.documentElement.style.setProperty('--green-dim', tweaks.accentColor + 'aa');
  }, [tweaks.accentColor]);

  React.useEffect(() => {
    document.body.style.setProperty('--font-mono-size', tweaks.fontSize + 'px');
    document.querySelectorAll('.terminal-body').forEach(el => {
      el.style.fontSize = tweaks.fontSize + 'px';
    });
  }, [tweaks.fontSize]);

  React.useEffect(() => {
    const scanEl = document.createElement('style');
    scanEl.id = 'scanline-override';
    const existing = document.getElementById('scanline-override');
    if (existing) existing.remove();
    if (!tweaks.scanlines) {
      scanEl.textContent = 'body::before { display: none !important; }';
      document.head.appendChild(scanEl);
    }
  }, [tweaks.scanlines]);

  React.useEffect(() => {
    const el = document.getElementById('hero-grid-override');
    if (el) el.remove();
    if (!tweaks.showGrid) {
      const s = document.createElement('style');
      s.id = 'hero-grid-override';
      s.textContent = '.hero-bg-grid { display: none !important; }';
      document.head.appendChild(s);
    }
  }, [tweaks.showGrid]);

  React.useEffect(() => {
    document.querySelectorAll('.topbar-prompt').forEach(el => {
      el.textContent = tweaks.promptUser;
    });
    const footer = document.querySelector('.footer span:last-child');
    if (footer) footer.innerHTML = tweaks.promptUser + ':~$<span class="cursor-blink">█</span>';
  }, [tweaks.promptUser]);

  return (
    <TweaksPanel>
      <TweakSection title="Theme">
        <TweakColor label="Accent color" value={tweaks.accentColor} onChange={v => setTweak('accentColor', v)} />
        <TweakToggle label="CRT scanlines" value={tweaks.scanlines} onChange={v => setTweak('scanlines', v)} />
        <TweakToggle label="Hero grid" value={tweaks.showGrid} onChange={v => setTweak('showGrid', v)} />
      </TweakSection>
      <TweakSection title="Typography">
        <TweakSlider label="Terminal font size" value={tweaks.fontSize} min={10} max={16} step={1} onChange={v => setTweak('fontSize', v)} />
      </TweakSection>
      <TweakSection title="Identity">
        <TweakText label="Shell prompt" value={tweaks.promptUser} onChange={v => setTweak('promptUser', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = ReactDOM.createRoot(document.getElementById('tweaks-root'));
tweaksRoot.render(<TweaksApp />);
