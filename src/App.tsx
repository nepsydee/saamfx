import { useRef } from 'react'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import MyWorks from './sections/MyWorks'
import HireMe from './sections/HireMe'
import './App.css'

function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const worksRef = useRef<HTMLDivElement>(null)
  const hireRef = useRef<HTMLDivElement>(null)

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToWorks = () => {
    worksRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToHire = () => {
    hireRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] overflow-x-hidden">
      <Navigation
        onHero={scrollToHero}
        onMyWorks={scrollToWorks}
        onHireMe={scrollToHire}
      />

      <main className="relative w-full overflow-x-hidden">
        <div ref={heroRef}>
          <Hero />
        </div>

        <div ref={worksRef}>
          <MyWorks />
        </div>

        <div ref={hireRef}>
          <HireMe />
        </div>
      </main>
    </div>
  )
}

export default App
