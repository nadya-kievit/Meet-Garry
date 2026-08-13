import { useState } from 'react'

function Quiz({ question, answers, correctAnswer, continueLabel, onContinue }) {
	const [feedback, setFeedback] = useState('')
	const [isCorrect, setIsCorrect] = useState(false)

	const checkAnswer = (answer) => {
		if (answer === correctAnswer) {
			setFeedback('Correct! You may continue.')
			setIsCorrect(true)
			return
		}

		setFeedback('Incorrect. Try again.')
	}

	return (
		<div className="quiz">
			<h2>{question}</h2>
			<div className="answer-list" aria-label="Answer choices">
				{answers.map((answer) => (
					<button
					className="answer-button"
					disabled={isCorrect}
					key={answer}
					onClick={() => checkAnswer(answer)}
					type="button"
					>
					{answer}
					</button>
				))}
			</div>

			{feedback && (
				<p
					className={`feedback ${isCorrect ? 'feedback-success' : 'feedback-error'}`}
					role="status"
				>
					{feedback}
				</p>
			)}

			{isCorrect && (
				<button className="primary-button" onClick={onContinue}>
					{continueLabel}
				</button>
			)}
		</div>
	)
}

export default Quiz
