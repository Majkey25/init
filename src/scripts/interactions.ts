// Animate only the visual label; the accessible name and label width stay unchanged.
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const glyphs = '01<>/{}[]_+#';

document.querySelectorAll<HTMLElement>('[data-glitch]').forEach((control) => {
  const label = control.querySelector<HTMLElement>('[data-glitch-text]');
  const original = label?.textContent ?? '';
  let frame = 0;

  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    control.classList.remove('is-glitching');
    if (label) label.textContent = original;
  };

  const play = () => {
    if (motion.matches || frame) return;
    const start = performance.now();
    control.classList.add('is-glitching');
    let last = -40;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= 480 || motion.matches) return reset();
      if (label && elapsed - last >= 40) {
        last = elapsed;
        const decoded = Math.floor((elapsed / 400) * original.length);
        label.textContent = Array.from(original, (character, i) =>
          i < decoded || /\s/.test(character)
            ? character
            : glyphs[Math.floor(Math.random() * glyphs.length)],
        ).join('');
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
  };

  control.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch') play();
  });
  control.addEventListener('focus', () => {
    if (control.matches(':focus-visible')) play();
  });
  control.addEventListener('pointerleave', reset);
  control.addEventListener('blur', reset);
  control.addEventListener('click', reset);
  motion.addEventListener('change', reset);
});
