import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Poetry Maker</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/create"
              className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 font-medium transition-colors flex items-center gap-2"
            >
              Create <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Create Poetry Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-400">Word Ripples</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            An interactive poetry creation tool designed for classrooms. Click on words to create rippling effects and watch your poem evolve with AI-generated suggestions.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 my-16">
            <div className="p-6 rounded-xl bg-white border border-slate-200 hover:border-violet-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Interactive</h3>
              <p className="text-slate-600 text-sm">Click words to create beautiful ripple effects and expand your poetry</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 hover:border-violet-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-slate-600 text-sm">Get creative suggestions powered by Claude to inspire your poetry</p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 hover:border-violet-300 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Classroom Ready</h3>
              <p className="text-slate-600 text-sm">Perfect for teaching creative writing and poetry appreciation</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="/create"
            className="inline-flex px-8 py-4 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold hover:shadow-lg hover:shadow-violet-200 transition-all"
          >
            Start Creating Poetry <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-slate-600">
          <p>Poetry Maker by <span className="font-semibold text-slate-900">Chalk & Circuit</span> • Interactive EdTech for Classrooms</p>
        </div>
      </footer>
    </div>
  )
}
