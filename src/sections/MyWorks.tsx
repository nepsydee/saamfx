import { useState } from 'react'
import Works3D from '../components/Works3D'

const works3D = [
  { model: '/models/0.glb', title: 'Main 3D Model' },
]

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

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        py-24 sm:py-28 md:py-32
        px-4 sm:px-6 md:px-10 lg:px-12
      "
    >
      {/* 🎥 BACKGROUND VIDEO */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TITLE */}
        <h2
          className="
            text-white
            text-center
            font-bold
            mb-16 sm:mb-20
            select-none
            pointer-events-none
          "
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            textShadow: `
              0 0 12px rgba(255,255,255,0.35),
              0 0 28px rgba(255,255,255,0.22),
              0 0 60px rgba(255,255,255,0.12)
            `,
          }}
        >
          MASTERED TOOLS
        </h2>

        {/* ===== 3D MODEL ===== */}
        <div
          className="
            max-w-4xl
            mx-auto
            mb-20 sm:mb-24 md:mb-28
            h-[280px]
            sm:h-[360px]
            md:h-[440px]
          "
        >
          <Works3D model={activeModel.model} />
        </div>

        {/* ===== IMAGE GRID ===== */}
        <div className="max-w-7xl mx-auto">
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              xl:grid-cols-6
              gap-10 sm:gap-12 lg:gap-14
            "
          >
            {imageWorks.map((item, i) => (
              <div
                key={i}
                className="
                  group
                  relative
                  flex justify-center
                  transition-transform duration-500
                  hover:scale-[1.06]
                "
              >
                <div
                  className="
                    relative
                    w-full
                    h-[260px]
                    sm:h-[300px]
                    md:h-[340px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  {/* 🔥 BACKLIGHT GLOW */}
                  <div
                    className="
                      absolute
                      w-[200px] h-[200px]
                      sm:w-[230px] sm:h-[230px]
                      lg:w-[260px] lg:h-[260px]
                      rounded-full
                      bg-[#c084fc]/45
                      blur-3xl
                      opacity-0
                      scale-90
                      transition-all duration-500
                      group-hover:opacity-100
                      group-hover:scale-110
                      z-0
                    "
                  />

                  {/* 🖼 IMAGE */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="
                      relative z-10
                      max-h-[190px]
                      sm:max-h-[220px]
                      md:max-h-[260px]
                      object-contain
                      transition-all duration-500 ease-out
                      group-hover:scale-[1.14]
                      group-hover:-translate-y-3
                      drop-shadow-[0_30px_55px_rgba(0,0,0,0.75)]
                    "
                  />

                  {/* ✨ HOVER TEXT */}
                  <div
                    className="
                      absolute inset-0
                      flex items-end justify-center
                      pb-7 sm:pb-9
                      opacity-0
                      group-hover:opacity-100
                      transition duration-300
                      z-20
                      pointer-events-none
                    "
                  >
                    <span
                      className="
                        text-white
                        text-sm sm:text-base lg:text-lg
                        font-extrabold
                        tracking-[0.28em]
                        uppercase
                        drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]
                      "
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
