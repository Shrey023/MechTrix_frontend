import React from 'react';

const Contact = () => {
	return (
		<main className="section section-alt" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '85vh' }}>
			<div className="container">
				<div className="about-card" style={{ display: 'block', maxWidth: '700px', margin: '0 auto', padding: '2.5rem' }}>
					<span className="section-tag">Get In Touch</span>
					<h1 className="section-title" style={{ marginBottom: '1rem' }}>Contact Mechze</h1>

					<p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
						Whether you have a question, feedback, or need instant vehicle repair support, our team is here to assist you.
					</p>

					<div style={{ display: 'grid', gap: '1.25rem', marginTop: '2rem' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
							<div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							</div>
							<div>
								<div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Us</div>
								<a href="mailto:mechzy01@gmail.com" style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
									mechzy01@gmail.com
								</a>
							</div>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
							<div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
								</svg>
							</div>
							<div>
								<div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Us</div>
								<a href="tel:+919238159179" style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
									+91-9238159179
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Contact;
