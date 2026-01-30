import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';

const images = [
  '/grid-1.jpg', '/grid-2.jpg', '/grid-3.jpg', '/grid-4.jpg', '/grid-5.jpg',
  '/grid-6.jpg', '/grid-7.jpg', '/grid-8.jpg', '/grid-9.jpg', '/grid-10.jpg',
  '/grid-11.jpg', '/grid-12.jpg', '/grid-13.jpg', '/grid-14.jpg', '/grid-15.jpg',
];

const videos = [
  '/v1.mp4', // top-left
  '/v2.mp4', // top-right
  '/v3.mp4', // middle-left
  '/v4.mp4', // middle-center
  '/v5.mp4', // middle-right
  '/v6.mp4', // bottom-center
];

// gridIndex : videoIndex
const videoMap: Record<number, number> = {
  0: 0,   // top-left
  4: 1,   // top-right
  6: 2,   // middle-left
  7: 3,   // middle-center
  8: 4,   // middle-right
  12: 5,  // bottom-center
};

const Hero = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    images.forEach((_, index) => {
      setTimeout(() => {
        setLoadedImages(prev => new Set([...prev, index]));
      }, 200 + index * 50);
    });

    setTimeout(() => setShowTitle(true), 600);
    setTimeout(() => setShowContent(true), 800);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Image / Video Grid */}
      <div className="absolute inset-0 p-[1vw] pt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1vw] h-full">
          {images.map((src, index) => {
            const videoIndex = videoMap[index];

            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
                  loadedImages.has(index)
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {videoIndex !== undefined ? (
                  <video
                    src={videos[videoIndex]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={src}
                    alt={`Portfolio image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-[1.02]"
                    style={{ transitionTimingFunction: 'ease-out' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          className={`text-white font-bold tracking-[-0.04em] transition-all duration-800 ${
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          SAAM.FX
          <sup className="text-[0.3em] align-super ml-1">®</sup>
        </h1>
      </div>

      {/* Bottom Right CTA */}
      <div
        className={`absolute bottom-8 right-6 md:right-8 flex flex-col items-end gap-3 transition-all duration-600 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
        style={{
          transitionDelay: '900ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <a
          href="https://www.instagram.com/saam.fx/"
          className="inline-flex items-center gap-2 bg-black hover:bg-[#590794] text-white px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300"
        >
          <Instagram className="w-4 h-4" />
          FOLLOW ME
        </a>
      </div>
    </section>
  );
};

export default Hero;
