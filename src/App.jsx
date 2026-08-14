import { useState } from 'react'
import CacheProgress from './components/CacheProgress.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

const caches = [
	{
		title: 'Infographic',
		coordinates: '48.473135, -123.274245',
		description: 'First cache description...',
		question: 'What season is the common camas flower found in?',
		answers: ['Summer', 'Winter', 'Spring', 'Autumn', 'Never', 'All Season'],
		answerIcons: ['sun', 'snowflake', 'flower', 'leaf', 'x', 'calendar'],
		correctAnswer: 'Spring',
	},
	{
		title: 'Garry Oak Meadow',
		coordinates: '48.473135, -123.274245',
		description: 'Second cache description...',
		question: 'How many endangered plant species are home to the wet pools in this meadow?',
		answers: ['5', '113', '28', '17', 'None'],
		answerIcons: ['sprout', 'sprout', 'sprout', 'sprout', 'x'],
		correctAnswer: '17',
	},
	{
		title: 'Stqéyə Stone Sculpture',
		coordinates: '48.473135, -123.274245',
		description: 'Third cache description...',
		question: 'There are several animals carved into this sculpture. Which of the following is not one of them?',
		answers: ['Deer', 'Wolf', 'Otter', 'Bird', 'Fish'],
		answerIcons: ['deer', 'wolf', 'otter', 'bird', 'fish'],
		correctAnswer: 'Deer',
	},
]

function BackIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="m15 18-6-6 6-6" />
		</svg>
	)
}

function MapPinIcon() {
	return (
		<svg className="map-pin-icon" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20 10c0 5.3-8 12-8 12S4 15.3 4 10a8 8 0 1 1 16 0Z" />
			<circle cx="12" cy="10" r="2.5" />
		</svg>
	)
}

function LearnMoreIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20.5 3.5C13 3.7 7.7 6.7 6.5 12.2c-.7 3.2 1.7 5.8 4.8 5.1 5.5-1.2 8.5-6.5 9.2-13.8Z" />
			<path d="M4 21c2.5-4 6.6-8.1 11.5-11" />
		</svg>
	)
}

function App() {
	const [stage, setStage] = useState('landing')

	const isCacheStage = stage.startsWith('cache')
	const cacheNumber = isCacheStage ? Number(stage.slice('cache'.length)) : null
	const currentCache = cacheNumber ? caches[cacheNumber - 1] : null

	const continueFromQuiz = () => {
		setStage(cacheNumber === caches.length ? 'success' : `cache${cacheNumber + 1}`)
	}

	const stages = [
		'landing',
		'cache1',
		'cache2',
		'cache3',
		'success',
	]

	const handleBack = () => {
		const index = stages.indexOf(stage)

		if (index > 0) {
			setStage(stages[index - 1])
		}
	}

	return (
		<main className={`site-shell ${isCacheStage ? 'site-shell--top' : ''}`}>
			<div className="card">
				{stage === 'landing' && (
					<section className="landing-page" aria-labelledby="landing-title">
						<div className="landing-intro">
							<h1 id="landing-title">Meet Garry</h1>
							<p>Stuff about Garry Oaks here...</p>
						</div>
						<div className="landing-actions">
							<button className="primary-button" onClick={() => setStage('cache1')}>
								View First Cache
							</button>
							<CacheProgress current={0} total={caches.length} variant="landing" />
						</div>
					</section>
				)}

				{isCacheStage && currentCache && (
					<section className="page-with-fixed-navigation" aria-labelledby={`cache-${cacheNumber}-title`}>
						<div className="cache-navigation">
							<button className="back-button" onClick={handleBack} aria-label="Go back">
								<BackIcon />
							</button>
							<CacheProgress current={cacheNumber} total={caches.length} />
							<span aria-hidden="true" />
						</div>
						<div className="cache-info-panel">
							<div className="cache-title-row">
								<MapPinIcon />
								<h1 id={`cache-${cacheNumber}-title`}>{currentCache.title}</h1>
							</div>
							<h2>{currentCache.coordinates}</h2>
							<p>{currentCache.description}</p>
						</div>
						<Quiz
							key={cacheNumber}
							question={currentCache.question}
							answers={currentCache.answers}
							answerIcons={currentCache.answerIcons}
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
						<div className="cache-navigation">
							<button className="back-button" onClick={handleBack} aria-label="Go back">
								<BackIcon />
							</button>
							<CacheProgress current={caches.length} total={caches.length} />
							<span aria-hidden="true" />
						</div>
						<h1 id="success-title">Congratulations!</h1>
						<p>
							Goodbye message with call to action...
						</p>
						<button className="learn-more-button" onClick={() => {window.location.href = 'https://goert.ca/about/what-are-geo/'}}>
							<span className="learn-more-icon"><LearnMoreIcon /></span>
							<span>Learn more about the Garry Oak ecosystem</span>
							<span className="learn-more-arrow" aria-hidden="true">↗</span>
						</button>
					</section>
				)}
			</div>
		</main>
	)
}

export default App
