import React from 'react';

const About = () => {
  return (
    <main className="section section-alt" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '85vh' }}>
      <div className="container">
        <div className="about-card" style={{ display: 'block', maxWidth: '900px', margin: '0 auto', padding: '2.5rem' }}>
          <span className="section-tag">About Mechze</span>
          <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>Making Vehicle Repair Simple & Convenient</h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.2rem' }}>
            At Mechze, we are building a smarter and faster way to connect vehicle owners with trusted mechanics.
          </p>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.2rem' }}>
            Breakdowns and vehicle issues can happen anytime, anywhere, and finding a reliable mechanic quickly is often stressful.
            Our mission is to remove that uncertainty by creating a platform where customers can easily discover, connect, and
            book verified mechanics nearby.
          </p>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            We empower local mechanics by giving them digital visibility, helping them grow their business, reach more customers,
            and manage bookings efficiently.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)', margin: '2rem 0 1rem' }}>Our Core Values</h2>
          <div className="about-highlights" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Reliability & Safety
            </div>
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Full Transparency
            </div>
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Ease of Use
            </div>
            <div className="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Real-time Access
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;