'use client'

import { useState, useCallback, useRef } from 'react'
import { ArrowLeft, Copy, RotateCcw, Download } from 'lucide-react'
import Link from 'next/link'
import WordRipple from '@/components/WordRipple'
import PoemDisplay from '@/components/PoemDisplay'
import PromptInput from '@/components/PromptInput'
import SuggestionPanel from '@/components/SuggestionPanel'
import WordAnalysis from '@/components/WordAnalysis'

export default function CreatePage() {
  const [poemText, setPoemText] = useState('Once upon a time, in a land far away...')
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [rippleWord, setRippleWord] = useState<string | null>(null)
  const [wordStats, setWordStats] = useState<{ word: string; count: number }[]>([])
  const poemContainerRef = useRef<HTMLDivElement>(null)

  // Calculate word frequency
  const calculateWordStats = useCallback((text: string) => {
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0)
    const freq: { [key: string]: number } = {}
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1
    })
    const stats = Object.entries(freq)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
    setWordStats(stats)
  }, [])

  // Handle word click for ripple effect and suggestions
  const handleWordClick = useCallback(async (word: string) => {
    setSelectedWord(word)
    setRippleWord(word)
    
    // Reset ripple effect after animation
    setTimeout(() => setRippleWord(null), 600)

    // Fetch suggestions
    setLoading(true)
    setSuggestions([])
    
    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word,
          context: poemText,
          theme: 'poetry',
        }),
      })
      
      if (!response.ok) throw new Error('Failed to fetch suggestions')
      
      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions(['error', 'trying', 'again'])
    } finally {
      setLoading(false)
    }
  }, [poemText])

  // Handle inserting a suggestion into the poem
  const handleInsertSuggestion = useCallback((suggestion: string) => {
    if (!selectedWord) return
    
    const newPoemText = poemText.replace(
      new RegExp(`\\b${selectedWord}\\b`, 'g'),
      suggestion
    )
    setPoemText(newPoemText)
    calculateWordStats(newPoemText)
    setSelectedWord(null)
    setSuggestions([])
  }, [poemText, selectedWord, calculateWordStats])

  // Handle poem text change
  const handlePoemChange = (text: string) => {
    setPoemText(text)
    calculateWordStats(text)
  }

  // Generate poem from prompt
  const handleGeneratePoem = useCallback(async (prompt: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      
      if (!response.ok) throw new Error('Failed to generate poem')
      
      const data = await response.json()
      setPoemText(data.poem || '')
      calculateWordStats(data.poem || '')
    } catch (error) {
      console.error('Error generating poem:', error)
    } finally {
      setLoading(false)
    }
  }, [calculateWordStats])

  // Copy poem to clipboard
  const handleCopyPoem = useCallback(() => {
    navigator.clipboard.writeText(poemText)
    // Show temporary feedback
    alert('Poem copied to clipboard!')
  }, [poemText])

  // Download poem as text
  const handleDownloadPoem = useCallback(() => {
    const element = document.createElement('a')
    const file = new Blob([poemText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'poem.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }, [poemText])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Poetry Creator</h1>
          <div className="flex gap-2">
            <button
              onClick={handleCopyPoem}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Copy poem"
            >
              <Copy className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={handleDownloadPoem}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Download poem"
            >
              <Download className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={() => {
                setPoemText('Once upon a time, in a land far away...')
                setSelectedWord(null)
                setSuggestions([])
              }}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reset poem"
            >
              <RotateCcw className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prompt Input */}
            <PromptInput
              onGenerate={handleGeneratePoem}
              loading={loading}
            />

            {/* Poem Display */}
            <PoemDisplay
              poemText={poemText}
              onPoemChange={handlePoemChange}
              onWordClick={handleWordClick}
              selectedWord={selectedWord}
              rippleWord={rippleWord}
              ref={poemContainerRef}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggestion Panel */}
            <SuggestionPanel
              selectedWord={selectedWord}
              suggestions={suggestions}
              loading={loading}
              onInsertSuggestion={handleInsertSuggestion}
            />

            {/* Word Analysis */}
            <WordAnalysis
              wordStats={wordStats}
              onWordClick={handleWordClick}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
