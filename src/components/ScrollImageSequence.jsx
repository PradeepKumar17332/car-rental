import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @param {string} folder - Path prefix e.g. '/carhero'
 * @param {number} totalFrames - Number of frames
 * @param {string} framePrefix - e.g. 'ezgif-frame-'
 * @param {number} framePadding - Zero-pad width e.g. 3
 * @param {number} scrollMultiplier - How many vh the section occupies
 * @param {React.ReactNode} children - Overlay content
 * @param {string} id - Section id for scroll anchoring
 * @param {(progress: number) => void} onProgress - progress callback [0..1]
 */
function ScrollImageSequence({
  folder,
  totalFrames,
  framePrefix = 'ezgif-frame-',
  framePadding = 3,
  scrollMultiplier = 500,
  children,
  id,
  onProgress,
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const loadedCountRef = useRef(0);
  const rafRef = useRef(null);
  const triggerRef = useRef(null);
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Frame URL builder ---- */
  const getFrameUrl = useCallback(
    (index) => {
      const n = String(index + 1).padStart(framePadding, '0');
      return `${folder}/${framePrefix}${n}.jpg`;
    },
    [folder, framePrefix, framePadding]
  );

  /* ---- Draw a frame to canvas ---- */
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    // Resize canvas buffer if needed
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.scale(dpr, dpr);
    }

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    // Cover mode on desktop; zoom-out more on mobile so the full car is visible
    const isMobile = cw < 768;
    const coverScale = Math.max(cw / iw, ch / ih);
    const scale = isMobile ? coverScale * 0.82 : coverScale;
    const x = (cw - iw * scale) / 2;
    const y = (ch - ih * scale) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, iw * scale, ih * scale);
  }, []);

  /* ---- Load a single frame ---- */
  const loadFrame = useCallback(
    (index) =>
      new Promise((resolve) => {
        if (framesRef.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          framesRef.current[index] = img;
          loadedCountRef.current += 1;
          resolve();
        };
        img.onerror = () => resolve();
      }),
    [getFrameUrl]
  );

  /* ---- Progressive preload ---- */
  const preload = useCallback(async () => {
    framesRef.current = new Array(totalFrames).fill(null);

    // 1. First frame immediately
    await loadFrame(0);
    drawFrame(0);

    // 2. First 10 frames fast
    const batch1 = [];
    for (let i = 1; i < Math.min(10, totalFrames); i++) batch1.push(loadFrame(i));
    await Promise.all(batch1);

    // 3. Rest of frames in background
    const rest = [];
    for (let i = 10; i < totalFrames; i++) rest.push(loadFrame(i));
    await Promise.all(rest);
  }, [totalFrames, loadFrame, drawFrame]);

  /* ---- Resize handler ---- */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    preload();

    // Reduced motion: just show last frame statically
    if (isReducedMotion) {
      const timer = setTimeout(() => {
        if (framesRef.current[totalFrames - 1]) {
          drawFrame(totalFrames - 1);
        } else {
          drawFrame(0);
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    // GSAP ScrollTrigger
    const proxy = { frame: 0 };

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${scrollMultiplier}%`,
      pin: stickyRef.current,
      pinSpacing: true,
      scrub: 1.5,
      onUpdate: (self) => {
        const frame = Math.round(self.progress * (totalFrames - 1));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => drawFrame(frame));
        }
        if (onProgress) onProgress(self.progress);
      },
    });

    triggerRef.current = trigger;

    window.addEventListener('resize', handleResize);

    return () => {
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} id={id} className="pinned-section">
      <div ref={stickyRef} className="pinned-viewport">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          aria-hidden="true"
        />
        {/* Overlay content (text, CTAs) */}
        {children}
      </div>
    </section>
  );
}

export default ScrollImageSequence;
