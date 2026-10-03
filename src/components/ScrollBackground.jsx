import { useEffect, useRef } from 'react'

// Fixed split-screen background. Left: medicine (real 3D brain + ECG trace). Right: computer science (real CPU + circuit traces).
// Scrolling moves the two halves toward each other, rotates them, draws the traces, and steps the captions through three stages.
// One passive scroll listener writes CSS variables (--scroll 0..1, data-stage 0..2); everything else is CSS.
const STAGES = [
  { med: 'Clinical reasoning: from evidence to the person in the room.', cs: 'Software engineering: systems that know what they are.' },
  { med: 'Differential diagnosis: weigh the possibilities, name the uncertainty.', cs: 'Streaming and HLS: real-time pipelines on real hardware.' },
  { med: 'Patient formulation: one coherent story from the findings.', cs: 'AI pipelines: models running in production.' },
]

// Swarm: x/y = start position (vw/vh), z = size (vmin), s = stagger 0..0.3, r = spin. Organs start left, hardware right; they swap sides, then merge at the RabbitHole card.
const ORGANS = [
  { img: '/physician-brain-3d.png', x: 6, y: 34, z: 22, s: 0, r: 40 },
  { t: '👁️', x: 24, y: 18, z: 7, s: .05, r: -60 }, { t: '🫀', x: 4, y: 70, z: 9, s: .1, r: 30 },
  { t: '🫁', x: 22, y: 62, z: 9, s: .15, r: -25 }, { t: '✋', x: 14, y: 86, z: 8, s: .2, r: 70 },
  { t: '🦶', x: 28, y: 82, z: 7, s: .25, r: -50 }, { t: '🦴', x: 10, y: 12, z: 7, s: .12, r: 80 },
  { t: '👂', x: 30, y: 44, z: 6, s: .08, r: -35 }, { t: '🦷', x: 2, y: 50, z: 5, s: .3, r: 55 },
]
const PARTS = [
  { img: '/cpu-package-3d.png', x: 72, y: 34, z: 22, s: 0, r: -40 },
  { t: '🖥️', x: 76, y: 16, z: 9, s: .05, r: 30 }, { t: 'RAM', x: 90, y: 70, z: 6, s: .1, r: -20 },
  { t: '💾', x: 70, y: 66, z: 8, s: .15, r: 45 }, { t: '⌨️', x: 82, y: 86, z: 9, s: .2, r: -30 },
  { t: 'GPU', x: 66, y: 84, z: 6, s: .25, r: 25 }, { t: '🔌', x: 88, y: 12, z: 7, s: .12, r: -70 },
  { t: 'SSD', x: 68, y: 48, z: 5, s: .08, r: 35 }, { t: '🖱️', x: 94, y: 48, z: 6, s: .3, r: -55 },
]

export default function ScrollBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, window.scrollY / max)
      node.style.setProperty('--scroll', progress.toFixed(4))
      node.dataset.stage = String(Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length)))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div className="scroll-bg" ref={ref} data-stage="0" aria-hidden="true">
      <section className="scroll-bg__half scroll-bg__half--med">
        <svg className="scroll-bg__trace scroll-bg__ecg" viewBox="0 0 600 120" preserveAspectRatio="none">
          <path pathLength="1" d="M0 60 H120 L140 60 L155 20 L175 100 L195 60 H300 L318 60 L332 34 L350 84 L368 60 H600" />
        </svg>
        <p className="scroll-bg__label"><b>Medicine</b>{STAGES.map((s, i) => <span key={s.med} data-i={i}>{s.med}</span>)}</p>
      </section>
      <section className="scroll-bg__half scroll-bg__half--cs">
        <svg className="scroll-bg__trace scroll-bg__circuit" viewBox="0 0 600 160" preserveAspectRatio="none">
          <path pathLength="1" d="M0 40 H140 V100 H260 V60 H380 V120 H500 V30 H600" />
          <path pathLength="1" d="M0 130 H90 V80 H210 V140 H330 V90 H460 V150 H600" />
        </svg>
        <p className="scroll-bg__label"><b>Computer science</b>{STAGES.map((s, i) => <span key={s.cs} data-i={i}>{s.cs}</span>)}</p>
      </section>
      <span className="scroll-bg__seam" />
      <span className="scroll-bg__orb" />
      {[['med', ORGANS], ['cs', PARTS]].map(([side, list]) => list.map((o, i) => (
        <i key={side + i} className={`sb-item sb-item--${side}${/^[A-Z]+$/.test(o.t || '') ? ' sb-item--chip' : ''}`} style={{ '--x': o.x, '--y': o.y, '--z': o.z, '--s': o.s, '--r': o.r, '--i': i }}>
          <b>{o.img ? <img src={o.img} alt="" decoding="async" /> : o.t}</b>
        </i>
      )))}
    </div>
  )
}
