import { useId, useState } from 'react'

function ChevronIcon() {
	return (
		<svg className="quiz-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
			<path d="m6 9 6 6 6-6" />
		</svg>
	)
}

function AnswerIcon({ name }) {
	return (
		<svg className="answer-icon" viewBox="0 0 24 24" aria-hidden="true">
			{name === 'sun' && (
				<>
					<circle cx="12" cy="12" r="3.5" />
					<path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
				</>
			)}
			{name === 'snowflake' && (
				<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 2 3-2M9 20l3-2 3 2M4 10l3-.2.8-2.8M20 14l-3 .2-.8 2.8" />
			)}
			{name === 'flower' && (
				<>
					<circle cx="12" cy="12" r="2" />
					<circle cx="12" cy="6.5" r="3" />
					<circle cx="17" cy="10" r="3" />
					<circle cx="15" cy="16" r="3" />
					<circle cx="9" cy="16" r="3" />
					<circle cx="7" cy="10" r="3" />
				</>
			)}
			{name === 'leaf' && (
				<>
					<path d="M19.5 4.5C12 4.7 6.7 7.7 5.5 13.2c-.7 3.2 1.7 5.8 4.8 5.1 5.5-1.2 8.5-6.5 9.2-13.8Z" />
					<path d="M5 20c2.5-4 5.6-7.1 10.5-10" />
				</>
			)}
			{name === 'x' && (
				<>
					<circle cx="12" cy="12" r="8.5" />
					<path d="m9 9 6 6M15 9l-6 6" />
				</>
			)}
			{name === 'calendar' && (
				<>
					<rect x="4" y="5.5" width="16" height="14" rx="2" />
					<path d="M8 3v5M16 3v5M4 10h16M8 14h2M14 14h2" />
				</>
			)}
			{name === 'sprout' && (
				<>
					<path d="M12 21V10" />
					<path d="M12 14c-5 0-7-2.7-7-7 4.8 0 7 2.5 7 7ZM12 10c0-4.3 2.3-6.5 7-6.5 0 4.2-2 6.5-7 6.5Z" />
				</>
			)}
			{name === 'deer' && (
				<>
					<path d="M8 9 5 5V2M5 5 2.5 4M16 9l3-4V2M19 5l2.5-1" />
					<path d="M7 8c1.2-2 3-3 5-3s3.8 1 5 3l-1 8-4 5-4-5-1-8Z" />
					<path d="M9.5 12h.1M14.5 12h.1M10 16h4" />
				</>
			)}
			{name === 'wolf' && (
				<>
					<path d="m5 9 1-6 5 4h2l5-4 1 6-2 8-5 4-5-4-2-8Z" />
					<path d="M9 12h.1M15 12h.1M10 17l2-2 2 2" />
				</>
			)}
			{name === 'otter' && (
				<>
					<circle cx="7" cy="7" r="2.5" />
					<circle cx="17" cy="7" r="2.5" />
					<circle cx="12" cy="12" r="8" />
					<path d="M9 12h.1M15 12h.1M10 16c1.3 1 2.7 1 4 0M7 15l-4 1M7 17l-3 3M17 15l4 1M17 17l3 3" />
				</>
			)}
			{name === 'bird' && (
				<>
					<path d="M3 16c4-6 8-8 14-6l4-3-2 5c-3 4-8 6-16 4Z" />
					<path d="M8 14c2 0 4-1 6-3M6 17l-1 3M10 17v3" />
				</>
			)}
			{name === 'fish' && (
				<>
					<path d="M3 12c4-5 9-7 15-3l4-3v12l-4-3c-6 4-11 2-15-3Z" />
					<circle cx="8" cy="11" r=".7" />
				</>
			)}
		</svg>
	)
}

function Quiz({ question, answers, answerIcons, correctAnswer, continueLabel, onContinue }) {
	const [feedback, setFeedback] = useState('')
	const [isCorrect, setIsCorrect] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [isReviewing, setIsReviewing] = useState(false)
	const quizPanelId = useId()
	const isShowingQuestion = !isCorrect || isReviewing

	const checkAnswer = (answer) => {
		if (answer === correctAnswer) {
			setFeedback('')
			setIsCorrect(true)
			setIsReviewing(false)
			return
		}

		setFeedback('Incorrect. Try again.')
	}

	return (
		<div className={`quiz ${isExpanded ? 'quiz--expanded' : ''}`}>
			<button
				className="quiz-toggle"
				type="button"
				aria-controls={quizPanelId}
				aria-expanded={isExpanded}
				onClick={() => setIsExpanded((expanded) => !expanded)}
			>
				<span>{isExpanded ? 'Hide Quiz' : 'View Quiz'}</span>
				<ChevronIcon />
			</button>

			<div className="quiz-collapsible" id={quizPanelId} hidden={!isExpanded}>
				<div className="quiz-content">
					<div
						className={`quiz-question-view ${!isShowingQuestion ? 'quiz-view--hidden' : ''}`}
						aria-hidden={!isShowingQuestion}
					>
						<h2>{question}</h2>
						<div className="answer-list" aria-label="Answer choices">
							{answers.map((answer, index) => (
								<button
									className={`answer-button ${isCorrect && answer === correctAnswer ? 'answer-button--correct' : ''}`}
									disabled={isCorrect}
									key={answer}
									onClick={() => checkAnswer(answer)}
									type="button"
								>
									<AnswerIcon name={answerIcons[index]} />
									<span>{answer}</span>
								</button>
							))}
						</div>

						{feedback && (
							<p className="feedback feedback-error" role="status">
								{feedback}
							</p>
						)}

						{isReviewing && (
							<button
								className="quiz-review-button"
								type="button"
								onClick={() => setIsReviewing(false)}
							>
								Back to result
							</button>
						)}
					</div>

					<div
						className={`quiz-success-view ${isShowingQuestion ? 'quiz-view--hidden' : ''}`}
						aria-hidden={isShowingQuestion}
					>
						<div className="correct-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24">
								<path d="m6.5 12.5 3.5 3.5 7.5-8" />
							</svg>
						</div>
						<h2>Correct!</h2>
						<button className="primary-button" onClick={onContinue}>
							{continueLabel}
						</button>
						<button
							className="quiz-review-button"
							type="button"
							onClick={() => setIsReviewing(true)}
						>
							Review quiz
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Quiz
