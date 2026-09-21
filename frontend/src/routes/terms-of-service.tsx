import { useState } from 'react'

const sillyTermSets = [
  [
    'All socks must be worn with confidence.',
    'The moon is not a valid academic reference.',
    'You agree to high-five at least one good idea.',
  ],
  [
    'Crumbs may be considered tiny snacks, legally speaking.',
    'Please do not challenge the website to a staring contest.',
    'Every dramatic pause must last exactly three seconds.',
  ],
  [
    'Users shall remain impressively hydrated.',
    'Any suspiciously large sandwich must be reported.',
    'The word “banana” may be used as a password for nothing.',
  ],
  [
    'You may not operate a hovercraft in the footer.',
    'All brilliant ideas must first pass the wiggle test.',
    'The button knows what you did last Tuesday.',
  ],
]

function nextIndex(currentIndex: number) {
  let index = currentIndex
  while (index === currentIndex) {
    index = Math.floor(Math.random() * sillyTermSets.length)
  }
  return index
}

export default function TermsOfService() {
  const [termSetIndex, setTermSetIndex] = useState(0)
  const [pressCount, setPressCount] = useState(0)

  function changeTerms() {
    setTermSetIndex((currentIndex) => nextIndex(currentIndex))
    setPressCount((currentCount) => currentCount + 1)
  }

  return (
    <main className="terms-page">
      <div className="terms-card">
        <p className="terms-eyebrow">VERY OFFICIAL DOCUMENT</p>
        <h1>Terms of Service</h1>
        <p className="terms-intro">
          Please review these legally questionable terms before proceeding.
        </p>

        <ul className="terms-list" aria-live="polite">
          {sillyTermSets[termSetIndex].map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>

        <button className="terms-button" type="button" onClick={changeTerms}>
          Change the terms
        </button>
        <p className="terms-count">Terms changed {pressCount} times</p>
      </div>
    </main>
  )
}
