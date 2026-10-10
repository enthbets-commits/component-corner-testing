import Hero from "../components/Hero";

function HomePage() {
  return (
    <main>
      <Hero
        title="Upgrade Your Setup"
        subtitle="Discover quality computer and gaming accessories built for your everyday setup."
        ctaText="Shop Now"
      />

      <section className="home-intro">
        <h2>Why Shop With Us?</h2>

        <p>
          ComponentCorner makes it easy to find quality computer and gaming
          accessories for your setup.
        </p>

        <p>
          Browse our products, check out product details, and add your favorite
          items to your shopping cart.
        </p>
      </section>
    </main>
  );
}

export default HomePage;