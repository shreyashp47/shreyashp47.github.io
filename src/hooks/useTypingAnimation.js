import { useState, useEffect, useCallback } from 'react'

export function useTypingAnimation(words, typingSpeed = 60, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex] || ''

    if (isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length - 1))
    } else {
      setDisplayText(currentWord.substring(0, displayText.length + 1))
    }
  }, [words, wordIndex, isDeleting, displayText])

  useEffect(() => {
    if (!words.length) return

    const currentWord = words[wordIndex] || ''
    let timeout

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [words, wordIndex, isDeleting, displayText, typingSpeed, deletingSpeed, pauseTime, tick])

  return displayText
}
