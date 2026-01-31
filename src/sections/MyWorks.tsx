import { useEffect, useRef, useState } from 'react'
import Works3D from '../components/Works3D'

const works3D = [{ model: '/models/0.glb', title: 'Main 3D Model' }]

const imageWorks = [
  { img: '/1.png', title: 'EXPERT' },
  { img: '/2.png', title: 'EXPERT' },
  { img: '/3.png', title: 'PROFESSIONAL' },
  { img: '/4.png', title: 'INTERMEDIATE' },
  { img: '/5.png', title: 'EXPERT' },
  { img: '/6.png', title: 'PROFESSIONAL' },
]

export default function MyWorks() {
  const [activeModel] = useState(works3D[0])
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.25 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-24 sm:py-28 md:py-32 px-4 sm:px-6 md:px-10 lg:px-12"
    >
      {/* BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg.mp4"
        muted
        loop
        playsInline
        preload="none"
        poster="/bg-poster.jpg"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10">

        {/* ===== TOP MARQUEE ===== */}
        <div className="mb-14 w-screen overflow-hidden -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-12">
          <div className="marquee-track flex w-[200%]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex w-screen justify-around">
                <span className="marquee-text">
                  DESIGN • MOTION • DEVELOPMENT
                </span>
                <span className="marquee-text">
                  DESIGNER & VIDEO EDITOR CRAFTING DISTINCTIVE VISUALS
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TITLE */}
        <h2
          className="text-white text-center font-extrabold mb-16 sm:mb-20 select-none"
          style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)',
            textShadow: `
              0 0 16px rgba(255,255,255,0.45),
              0 0 40px rgba(255,255,255,0.25)
            `,
          }}
        >
          MASTERED TOOLS
        </h2>

        {/* 3D MODEL */}
        <div className="max-w-4xl mx-auto mb-24 h-[280px] sm:h-[360px] md:h-[440px]">
          <Works3D model={activeModel.model} />
        </div>

        {/* IMAGE GRID */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-12">
            {imageWorks.map((item, i) => (
              <div key={i} className="group relative flex justify-center hover:scale-[1.06] transition">
                <div className="relative w-full h-[320px] flex items-center justify-center">
                  <div className="absolute w-[260px] h-[260px] rounded-full bg-[#c084fc]/45 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                  <img
                    src={item.img}
                    alt={item.title}
                    className="relative z-10 max-h-[260px] object-contain group-hover:scale-[1.15] transition drop-shadow-[0_30px_55px_rgba(0,0,0,0.75)]"
                  />
                  <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white font-extrabold tracking-[0.28em] text-lg drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM MARQUEE ===== */}
        <div className="mt-10 w-screen overflow-hidden -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-12">
          <div className="marquee-track flex w-[200%]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex w-screen justify-around">
                <span className="marquee-text">READY TO START YOUR NEXT PROJECT?</span>
                <span className="marquee-text">AVAILABLE FOR PROJECTS & COLLABORATIONS</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* STYLES */}
      <style jsx>{`
        .marquee-track {
          animation: marquee 22s linear infinite;
        }

        .marquee-text {
          font-size: clamp(1.05rem, 1.8vw, 1.35rem);
          font-weight: 800;
          letter-spacing: 0.32em;
          white-space: nowrap;
          color: white;
          text-shadow:
            0 0 10px rgba(255,255,255,0.9),
            0 0 26px rgba(255,255,255,0.45),
            0 0 48px rgba(255,255,255,0.25);
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
