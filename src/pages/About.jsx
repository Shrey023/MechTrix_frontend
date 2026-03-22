import React from 'react';

const About = () => {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      color: 'var(--color-off-white)',
      padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 5vw, 2rem) 3rem',
      fontFamily: 'var(--font-body)',
    }}>
      <section style={{
        maxWidth: '980px',
        margin: '0 auto',
        background: 'var(--color-bg3)',
        border: '1px solid rgba(131, 68, 23, 0.15)',
        padding: 'clamp(1.25rem, 4vw, 2rem)',
      }}>
        <h1 style={{ marginBottom: '1rem' }}>About Us</h1>

        <p style={{ marginBottom: '1rem' }}>
          At Mechze, we are building a smarter and faster way to connect vehicle owners with trusted mechanics.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          Breakdowns and vehicle issues can happen anytime, anywhere and finding a reliable mechanic quickly is often stressful.
          Our mission is to remove that uncertainty by creating a platform where customers can easily discover, connect, and
          book verified mechanics nearby.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          We empower local mechanics by giving them digital visibility, helping them grow their business, reach more customers,
          and manage bookings efficiently.
        </p>

        <h2 style={{ margin: '1.4rem 0 0.9rem' }}>Our Focus</h2>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-warm-gray)', lineHeight: 1.9 }}>
          <li>Reliability</li>
          <li>Transparency</li>
          <li>Ease of use</li>
          <li>Real-time accessibility</li>
        </ul>

        <p style={{ marginTop: '1.2rem' }}>
          Whether you are a customer in need of quick assistance or a mechanic looking to expand your reach,
          MechTrix is built to serve both sides seamlessly.
        </p>

        <p style={{ marginTop: '1rem' }}>
          We are just getting started, and our goal is to transform how vehicle services are accessed across Jabalpur and beyond.
        </p>
      </section>
    </main>
  );
};

export default About;