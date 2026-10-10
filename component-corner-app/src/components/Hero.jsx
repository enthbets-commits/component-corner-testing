import "./Hero.css";

function Hero({ title, subtitle, ctaText }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <button>{ctaText}</button>
      </div>
    </section>
  );
}

export default Hero;