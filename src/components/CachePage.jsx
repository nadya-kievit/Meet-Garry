function CachePage({ number, title, description, onArrived }) {
  return (
    <section aria-labelledby={`cache-${number}-title`}>
      <p className="eyebrow">Cache {number} of 3</p>
      <h1 id={`cache-${number}-title`}>Cache {number}</h1>
      <h2>{title}</h2>
      <p>{description}</p>
      <button className="primary-button" onClick={onArrived}>
        I&apos;ve Arrived
      </button>
    </section>
  )
}

export default CachePage
