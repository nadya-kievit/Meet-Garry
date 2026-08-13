import { useState } from 'react'
import Quiz from './components/Quiz.jsx'
import './App.css'

const caches = [
	{
		title: '48.473135, -123.274245',
		description: 'First cache description...',
		question: 'Question....?',
		answers: ['Option A', 'Option B', 'Option C', 'Option D'],
		correctAnswer: 'Option B',
	},
	{
		title: '48.473135, -123.274245',
		description: 'Second cache description...',
		question: 'Question....?',
		answers: ['Option A', 'Option B', 'Option C', 'Option D'],
		correctAnswer: 'Option C',
	},
	{
		title: '48.473135, -123.274245',
		description: 'Third cache description...',
		question: 'Question....?',
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

	const stages = [
		'landing',
		'cache1',
		'quiz1',
		'cache2',
		'quiz2',
		'cache3',
		'quiz3',
		'success',
	]

	const handleBack = () => {
		const index = stages.indexOf(stage)

		if (index > 0) {
			setStage(stages[index - 1])
		}
	}

	return (
		<main className="site-shell">
			<div className="card">
				{stage === 'landing' && (
					<section aria-labelledby="landing-title">
						<h1 id="landing-title">Meet Garry</h1>
						<p>Stuff about Garry Oaks here...</p>
						<button className="primary-button" onClick={() => setStage('cache1')}>
							View First Cache
						</button>
					</section>
				)}

				{isCacheStage && currentCache && (
					<section aria-labelledby={`cache-${cacheNumber}-title`}>
						<button className="back-button" onClick={handleBack}>
							Back
						</button>
						<h1 id={`cache-${cacheNumber}-title`}>Cache {cacheNumber}</h1>
						<h2>{currentCache.title}</h2>
						<p>{currentCache.description}</p>
						<button className="primary-button" onClick={goToQuiz}>
							I&apos;ve Arrived
						</button>
					</section>
				)}

				{isQuizStage && currentCache && (
					<section aria-labelledby={`quiz-${cacheNumber}-title`}>
						<button className="back-button" onClick={handleBack}>
							Back
						</button>
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
						<button className="back-button" onClick={handleBack}>
							Back
						</button>
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
