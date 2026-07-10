'use client'

import { BarChart3 } from 'lucide-react'

interface WordAnalysisProps {
  wordStats: { word: string; count: number }[];
  onWordClick: (word: string) => void;
}

export default function WordAnalysis({ wordStats, onWordClick }: WordAnalysisProps) {
  const maxCount = wordStats.length > 0 ? wordStats[0].count : 1

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-violet-600" />
        Word Frequency
      </h3>

      {wordStats.length > 0 ? (
        <div className="space-y-3">
          {wordStats.map((stat, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center justify-between mb-1">
                <button
                  onClick={() => onWordClick(stat.word)}
                  className="text-sm font-serif text-slate-800 hover:text-violet-600 transition-colors"
                >
                  {stat.word}
                </button>
                <span className="text-xs text-slate-500">{stat.count}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full transition-all"
                  style={{ width: `${(stat.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm text-center py-4">
          Word frequency will appear here
        </p>
      )}
    </div>
  )
}
