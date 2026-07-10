'use client'

import { forwardRef } from 'react'
import WordRipple from './WordRipple'

interface PoemDisplayProps {
  poemText: string;
  onPoemChange: (text: string) => void;
  onWordClick: (word: string) => void;
  selectedWord: string | null;
  rippleWord: string | null;
}

const PoemDisplay = forwardRef<HTMLDivElement, PoemDisplayProps>(
  ({
    poemText,
    onPoemChange,
    onWordClick,
    selectedWord,
    rippleWord,
  }, ref) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onPoemChange(e.target.value)
    }

    const renderPoemWithRipples = () => {
      const words = poemText.split(/(\s+)/)
      return words.map((word, idx) => {
        if (/^\s+$/.test(word)) return word
        
        const isRippling = word === rippleWord
        const isSelected = word === selectedWord

        return (
          <WordRipple
            key={idx}
            word={word}
            isActive={isRippling}
            onAnimationComplete={() => {}}
          >
            <button
              onClick={() => onWordClick(word)}
              className={`word-ripple font-serif text-lg transition-all ${
                isSelected ? 'text-violet-600 font-bold' : 'text-slate-800'
              } hover:text-violet-600 hover:underline`}
            >
              {word}
            </button>
          </WordRipple>
        )
      })
    }

    return (
      <div ref={ref} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Display View */}
          <div className="p-8 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white min-h-64">
            <div className="prose prose-lg max-w-none font-serif text-slate-800 leading-relaxed">
              <p className="text-lg italic text-slate-600 mb-6">
                {poemText ? (
                  <span className="flex flex-wrap gap-1">
                    {renderPoemWithRipples()}
                  </span>
                ) : (
                  'Your poem will appear here...'
                )}
              </p>
            </div>
          </div>

          {/* Edit View */}
          <div className="p-6 bg-white">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Edit Your Poem
            </label>
            <textarea
              value={poemText}
              onChange={handleTextChange}
              className="w-full h-48 p-4 border border-slate-300 rounded-lg font-serif text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter your poem here..."
            />
          </div>
        </div>
      </div>
    )
  }
)

PoemDisplay.displayName = 'PoemDisplay'

export default PoemDisplay
