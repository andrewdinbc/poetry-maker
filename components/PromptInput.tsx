'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  loading?: boolean;
}

export default function PromptInput({ onGenerate, loading = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      onGenerate(prompt)
      setPrompt('')
    }
  }

  const presets = [
    { label: 'Nature', prompt: 'Write a poem about nature and seasons' },
    { label: 'Emotion', prompt: 'Write a poem about joy and hope' },
    { label: 'Dreams', prompt: 'Write a poem about dreams and possibilities' },
    { label: 'Friendship', prompt: 'Write a poem about friendship and connection' },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-violet-600" />
        Generate with AI
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what kind of poem you'd like to create..."
            className="w-full h-24 p-4 border border-slate-300 rounded-lg text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-200 disabled:opacity-50 transition-all"
        >
          {loading ? 'Generating...' : 'Generate Poem'}
        </button>
      </form>

      {/* Preset Prompts */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-sm font-medium text-slate-600 mb-3">Quick Start:</p>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setPrompt(preset.prompt)
              }}
              className="px-3 py-2 text-sm rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
