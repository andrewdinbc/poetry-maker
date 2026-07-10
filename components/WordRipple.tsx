'use client'

import { useEffect, useRef } from 'react'

interface WordRippleProps {
  word: string;
  isActive?: boolean;
  onAnimationComplete?: () => void;
}

export default function WordRipple({
  word,
  isActive = false,
  onAnimationComplete,
}: WordRippleProps) {
  const rippleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !rippleRef.current) return

    const rippleElement = document.createElement('div')
    rippleElement.className = 'ripple-ring'
    rippleElement.style.top = '50%'
    rippleElement.style.left = '50%'
    rippleRef.current.appendChild(rippleElement)

    const timer = setTimeout(() => {
      rippleElement.remove()
      onAnimationComplete?.()
    }, 600)

    return () => clearTimeout(timer)
  }, [isActive, onAnimationComplete])

  return (
    <span
      ref={rippleRef}
      className={`word-ripple ${isActive ? 'scale-110 text-violet-600' : ''}`}
    >
      {word}
    </span>
  )
}
