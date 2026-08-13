import { useState } from 'react'
import CachePage from './components/CachePage.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

const caches = [
  {
    title: 'Cache Location Placeholder',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Follow the placeholder instructions to find this cache.',
    question: 'Question placeholder text for Cache 1?',
    answers: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option B',
  },
  {
    title: 'Cache Location Placeholder',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Follow the placeholder instructions to find this cache.',
    question: 'Question placeholder text for Cache 2?',
    answers: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option C',
  },
  {
    title: 'Cache Location Placeholder',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Follow the placeholder instructions to find this cache.',
    question: 'Question placeholder text for Cache 3?',
    answers: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option D',
  },
]

function App() {
  const [stage, setStage] = useState('landing')

  const cacheNumber = Number(stage.at(-1))
  const isCacheStage = stage.startsWith('cache')
  const isQuizStage = stage.startsWith('quiz')
  const currentCache = caches[cacheNumber - 1]

  const goToQuiz = () => setStage(`quiz${cacheNumber}`)

  const continueFromQuiz = () => {
    setStage(cacheNumber === caches.length ? 'success' : `cache${cacheNumber + 1}`)
  }

  return (
    <main className="site-shell">
      <div className="card">
        {stage === 'landing' && (
          <section aria-labelledby="landing-title">
            <p className="eyebrow">Multi-cache activity</p>
            <h1 id="landing-title">Multi-Cache Title Placeholder</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="primary-button" onClick={() => setStage('cache1')}>
              View First Cache
            </button>
          </section>
        )}

        {isCacheStage && currentCache && (
          <CachePage
            number={cacheNumber}
            title={currentCache.title}
            description={currentCache.description}
            onArrived={goToQuiz}
          />
        )}

        {isQuizStage && currentCache && (
          <section aria-labelledby={`quiz-${cacheNumber}-title`}>
            <p className="eyebrow">
              Cache {cacheNumber} of {caches.length}
            </p>
            <h1 id={`quiz-${cacheNumber}-title`}>Cache {cacheNumber} Quiz</h1>
            <Quiz
              question={currentCache.question}
              answers={currentCache.answers}
              correctAnswer={currentCache.correctAnswer}
              continueLabel={
                cacheNumber === caches.length
                  ? 'Finish Multi-Cache'
                  : `Continue to Cache ${cacheNumber + 1}`
              }
              onContinue={continueFromQuiz}
            />
          </section>
        )}

        {stage === 'success' && (
          <section aria-labelledby="success-title">
            <p className="eyebrow">Multi-cache complete</p>
            <h1 id="success-title">Congratulations!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Multi-cache completed successfully.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
