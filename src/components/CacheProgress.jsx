function CacheProgress({ current, total, variant = 'header' }) {
	const progress = total > 1 ? ((current - 1) / (total - 1)) * 100 : 100

	return (
		<div
			className={`cache-progress cache-progress--${variant}`}
			aria-label={`Cache ${current} of ${total}`}
		>
			<div className="progress-summary">
				<span>{variant === 'landing' ? 'Cache Progress' : `Cache ${current} of ${total}`}</span>
				{variant === 'landing' && <span>{current} / {total}</span>}
			</div>
			<div
				className="progress-track"
				style={{ '--progress': `${progress}%` }}
				aria-hidden="true"
			>
				{Array.from({ length: total }, (_, index) => (
					<span
						className={`progress-step ${index < current ? 'progress-step--active' : ''}`}
						key={index}
					>
						{variant === 'header' && index < current ? '✓' : ''}
					</span>
				))}
			</div>
		</div>
	)
}

export default CacheProgress
