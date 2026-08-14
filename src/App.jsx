import { useEffect, useRef, useState } from 'react'
import { ValidationError, useForm } from '@formspree/react'
import CacheProgress from './components/CacheProgress.jsx'
import Quiz from './components/Quiz.jsx'
import './App.css'

const caches = [
	{
		title: 'Seasons in Bloom',
		coordinates: '48.439226, -123.297891',
		description: 'Use the coordinates to find your first stop. Once you arrive, look around carefully to answer the question below. A correct answer will unlock the next step.',
		question: 'What season is the common camas flower found in?',
		answers: ['Summer', 'Winter', 'Spring', 'Autumn', 'Never', 'All Season'],
		answerIcons: ['sun', 'snowflake', 'flower', 'leaf', 'x', 'calendar'],
		correctAnswer: 'Spring',
	},
	{
		title: 'So Many Trunks',
		coordinates: '48.439402, -123.294577',
		description: 'Follow the coordinates to your next stop. Once you arrive, explore the area and look for the information you’ll need to unlock the next cache.',
		question: 'How many trunks are on the Garry Oak next to you?',
		answers: ['1', '3', '4', '7', 'Trick question! There is no Garry Oak'],
		answerIcons: ['tree', 'tree', 'tree', 'tree', 'x'],
		correctAnswer: '4',
	},
	{
		title: 'The Stone Wolf',
		coordinates: '48.438080, -123.293518',
		description: 'You know the drill now, enjoy this stop and take a picture!',
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

function HowItWorksIcon({ name }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			{name === 'map' && (
				<>
					<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
					<path d="M9 3v15M15 6v15" />
				</>
			)}
			{name === 'search' && (
				<>
					<circle cx="10.5" cy="10.5" r="6.5" />
					<path d="m15.5 15.5 5 5" />
				</>
			)}
			{name === 'lock' && (
				<>
					<rect x="5" y="10" width="14" height="11" rx="2" />
					<path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
				</>
			)}
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

function FeedbackIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20 15a4 4 0 0 1-4 4H9l-5 3v-7a4 4 0 0 1-1-2.7V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7Z" />
			<path d="M8 11h.01M12 11h.01M16 11h.01" />
		</svg>
	)
}

function SendIcon() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="m21 3-7.5 18-3.2-7.3L3 10.5 21 3Z" />
			<path d="m10.3 13.7 4.2-4.2" />
		</svg>
	)
}

function App() {
	const [feedbackState, submitFeedback] = useForm(
		import.meta.env.VITE_FORMSPREE_FORM_ID,
	)
	const feedbackFormRef = useRef(null)
	const [stage, setStage] = useState('landing')

	useEffect(() => {
		if (feedbackState.succeeded) {
			feedbackFormRef.current?.reset()
		}
	}, [feedbackState.succeeded])

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
		<main className={`site-shell ${isCacheStage || stage === 'success' ? 'site-shell--top' : ''}`}>
			<div className="card">
				{stage === 'landing' && (
					<section className="landing-page" aria-labelledby="landing-title">
						<div className="landing-intro">
							<div className="landing-title-icon" aria-hidden="true">
								<img src="/leaf-icon.png" alt="" />
							</div>
							<h1 className="landing-title" id="landing-title">Meet Garry</h1>
							<span className="landing-title-rule" aria-hidden="true" />
						</div>
						<div className="landing-description">
							<p>Garry oak ecosystems are a special part of southern Vancouver Island and one of Canada’s most endangered ecosystems.</p>
							<br></br>
							<p>This multi-cache takes place in the Garry Oak ecosystem at Cattle Point.</p>
						</div>
						<section className="how-it-works" aria-labelledby="how-it-works-title">
							<div className="how-it-works-heading">
								<span aria-hidden="true" />
								<h2 id="how-it-works-title">How it works</h2>
								<span aria-hidden="true" />
							</div>
							<ol className="how-it-works-list">
								<li className="how-it-works-step">
									<span className="how-it-works-icon">
										<HowItWorksIcon name="map" />
									</span>
									<span>Visit 3 caches</span>
								</li>
								<li className="how-it-works-step">
									<span className="how-it-works-icon">
										<HowItWorksIcon name="search" />
									</span>
									<span>Use nearby info to answer each quiz</span>
								</li>
								<li className="how-it-works-step">
									<span className="how-it-works-icon">
										<HowItWorksIcon name="lock" />
									</span>
									<span>Correct answers unlock the next stop</span>
								</li>
							</ol>
							<aside className="virtual-cache-note">
								<span className="virtual-cache-note-icon" aria-hidden="true">
									<img src="/leaf-icon.png" alt="" />
								</span>
								<p>
									<strong>Virtual only</strong>
									<span>No need to search for physical objects</span>
								</p>
							</aside>
						</section>
						<div className="landing-actions">
							<button className="primary-button" onClick={() => setStage('cache1')}>
								View First Cache
							</button>
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
							<h1 className="cache-name" id={`cache-${cacheNumber}-title`}>
								{currentCache.title}
							</h1>
							<div className="cache-coordinate-label">
								<MapPinIcon />
								<p className="cache-coordinate-value">{currentCache.coordinates}</p>
							</div>
							<p className="cache-description">{currentCache.description}</p>
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
					<section className="success-page" aria-labelledby="success-title">
						<button className="back-button success-back-button" onClick={handleBack} aria-label="Go back">
							<BackIcon />
						</button>
						<div className="success-hero">
							<img className="success-illustration" src="/success-icon.png" alt="" />
							<h1 id="success-title">Congratulations!</h1>
							<p>
								You completed all three caches at Cattle Point. Thanks for exploring a small part of the Garry Oak ecosystem.
							</p>
						</div>
						<form ref={feedbackFormRef} className="success-feedback-card" onSubmit={submitFeedback}>
							<div className="success-feedback-heading">
								<FeedbackIcon />
								<h2>Share your experience</h2>
							</div>

							<textarea
								aria-label="Share your experience"
								name="message"
								placeholder="What did you enjoy? Any feedback for us?"
								disabled={feedbackState.submitting}
								required
							/>

							<ValidationError
								className="feedback feedback-error"
								field="message"
								prefix="Feedback"
								errors={feedbackState.errors}
							/>

							{feedbackState.succeeded ? (
								<p className="feedback feedback-success" role="status">
									Thanks for the feedback!
								</p>
							) : (
								<button
									className="send-feedback-button"
									type="submit"
									disabled={feedbackState.submitting}
								>
									<span>
										{feedbackState.submitting ? 'Sending…' : 'Send Feedback'}
									</span>
									<SendIcon />
								</button>
							)}
						</form>
						<button className="learn-more-button" onClick={() => {window.open('https://goert.ca/about/what-are-geo/', '_blank', 'noopener,noreferrer')}}>
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
