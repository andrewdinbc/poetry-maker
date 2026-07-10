'use client'

import { Sparkles, Loader } from 'lucide-react'

interface SuggestionPanelProps {
  selectedWord: string | null;
  suggestions: string[];
  loading: boolean;
  onInsertSuggestion: (suggestion: string) => void;
}

export default function SuggestionPanel({
  selectedWord,
  suggestions,
  loading,
  onInsertSuggestion,
}: SuggestionPanelProps) {
  if (!selectedWord) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
        <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">
          Click a word in your poem to see suggestions
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-violet-600" />
        Alternatives for "{selectedWord}"
      </h3>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader className="w-6 h-6 text-violet-600 animate-spin mb-3" />
          <p className="text-slate-600 text-sm">Finding suggestions...</p>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onInsertSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left rounded-lg border border-violet-200 bg-violet-50 text-slate-800 hover:bg-violet-100 transition-colors font-serif text-base group"
            >
              <span className="group-hover:font-semibold">{suggestion}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm text-center py-4">
          No suggestions available
        </p>
      )}
    </div>
  )
}
