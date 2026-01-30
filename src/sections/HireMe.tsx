import { User, Mail, MessageSquare, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const ENDPOINT = import.meta.env.VITE_API_URL

const HireMe = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const body = new URLSearchParams()
      data.forEach((value, key) => body.append(key, String(value)))

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
        body,
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      form.reset()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    } catch {
      alert('Message failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        flex items-center justify-center
        px-4 sm:px-6
      "
    >
      {/* 🎥 BACKGROUND VIDEO */}
      <video
        className="
          absolute inset-0
          w-full h-full
          object-cover
          scale-105
        "
        src="/bg1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* SUCCESS POPUP */}
      {success && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4">
          <div
            className="
              backdrop-blur-xl
              bg-white/10
              border border-white/20
              rounded-2xl
              px-6 sm:px-10
              py-6 sm:py-8
              text-center
              animate-[fadeIn_0.4s_ease-out]
              shadow-[0_0_80px_rgba(255,255,255,0.25)]
            "
          >
            <CheckCircle className="w-10 h-10 mx-auto text-white mb-3" />
            <p className="text-white font-semibold tracking-wide">
              Message sent successfully
            </p>
            <p className="text-white/60 text-sm mt-1">
              I’ll get back to you shortly
            </p>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">

        {/* TITLE */}
        <h2
          className="
            text-white
            text-center
            font-bold
            mb-10 sm:mb-12
            select-none
            pointer-events-none
          "
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            textShadow: `
              0 0 12px rgba(255,255,255,0.35),
              0 0 28px rgba(255,255,255,0.22),
              0 0 60px rgba(255,255,255,0.12)
            `,
          }}
        >
          HIRE ME
        </h2>

        {/* ===== GLASS CARD ===== */}
        <div
          className="
            group
            max-w-xl
            mx-auto
            backdrop-blur-xl
            bg-white/5
            border border-white/10
            rounded-2xl
            p-6 sm:p-8 md:p-10
            transition-all duration-500
            hover:scale-[1.03]
            hover:shadow-[0_0_120px_rgba(192,132,252,0.35)]
          "
        >
          <form onSubmit={handleSubmit} className="grid gap-5 sm:gap-6">

            {/* NAME */}
            <div className="relative">
              <input
                name="name"
                required
                placeholder="Your Name"
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-full
                  px-12
                  py-3 sm:py-4
                  text-white
                  placeholder-white/60
                  outline-none
                  focus:border-white/40
                "
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <input
                name="email"
                required
                type="email"
                placeholder="Your Email"
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-full
                  px-12
                  py-3 sm:py-4
                  text-white
                  placeholder-white/60
                  outline-none
                  focus:border-white/40
                "
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            </div>

            {/* MESSAGE */}
            <div className="relative">
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="
                  w-full
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  px-5
                  py-3 sm:py-4
                  text-white
                  placeholder-white/60
                  outline-none
                  focus:border-white/40
                  resize-none
                "
              />
              <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-white/40" />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-3 sm:mt-4
                bg-white
                text-black
                font-semibold
                py-3 sm:py-4
                rounded-full
                transition-all
                hover:scale-[1.05]
                hover:shadow-[0_10px_40px_rgba(255,255,255,0.35)]
                active:scale-95
                disabled:opacity-60
              "
            >
              {loading ? 'SENDING…' : 'SEND MESSAGE'}
            </button>
          </form>

          <p className="mt-5 sm:mt-6 text-center text-sm text-white/60">
            Let’s build something amazing together
            <br /><br />
           +977-9745610053
          </p>
        </div>
      </div>
    </section>
  )
}

export default HireMe
