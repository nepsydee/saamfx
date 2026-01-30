import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  onHero: () => void;
  onMyWorks: () => void;
  onHireMe: () => void;
}

const Navigation = ({ onHero, onMyWorks, onHireMe }: Props) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const soundRef = useRef<HTMLAudioElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    soundRef.current = new Audio('/audio/sound.mp3');
    soundRef.current.loop = true;
    soundRef.current.volume = 0.5;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('soundEnabled');
    if (saved !== null) setSoundEnabled(saved === 'true');
  }, []);

  useEffect(() => {
    if (!soundRef.current) return;
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    localStorage.setItem('soundEnabled', String(soundEnabled));
    if (soundEnabled) {
      soundRef.current.play().catch(() => { });
    } else {
      soundRef.current.pause();
      soundRef.current.currentTime = 0;
    }
  }, [soundEnabled]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  px-6 py-4 md:px-8 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={onHero}
          className="flex items-center "
          aria-label="Go to top"
          
        >
          <img
            src="/logo.png"
            alt="SAAM.FX"
            className="h-8 md:h-10 w-auto hover:opacity-70 transition-opacity duration-300 cursor-pointer"
            draggable={false}
          />
        </button>
        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.15em] text-white uppercase pl-14">
          <button onClick={onHero} className="group relative">
            <span className="group-hover:-translate-y-2 group-hover:opacity-0 transition-all duration-300 inline-block">   I</span>
            <span className="absolute left-0 top-0 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 text-[#c084fc]">I</span>
          </button>

          <button onClick={onMyWorks} className="group relative">
            <span className="group-hover:-translate-y-2 group-hover:opacity-0 transition-all duration-300 inline-block">   CAN</span>
            <span className="absolute left-0 top-0 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 text-[#c084fc]">CAN</span>
          </button>

          <button onClick={onHireMe} className="group relative">
            <span className="group-hover:-translate-y-2 group-hover:opacity-0 transition-all duration-300 inline-block">   EDIT</span>
            <span className="absolute left-0 top-0 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 text-[#c084fc]">EDIT</span>
          </button>
        </div>
        {/* Sound */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium tracking-[0.1em] text-white hidden sm:inline">
            SOUND:
          </span>
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className="w-10 h-10 rounded-full border border-[#590794] flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
