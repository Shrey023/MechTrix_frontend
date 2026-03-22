import React from 'react';

const Contact = () => {
	return (
		<main style={{
			minHeight: '100vh',
			background: 'var(--color-bg)',
			color: 'var(--color-off-white)',
			padding: 'clamp(5rem, 10vw, 7rem) clamp(1rem, 5vw, 2rem) 3rem',
			fontFamily: 'var(--font-body)',
		}}>
			<section style={{
				maxWidth: '760px',
				margin: '0 auto',
				background: 'var(--color-bg3)',
				border: '1px solid rgba(131, 68, 23, 0.15)',
				padding: 'clamp(1.25rem, 4vw, 2rem)',
			}}>
				<h1 style={{ marginBottom: '1rem' }}>Contact Us</h1>

				<p style={{ marginBottom: '0.9rem' }}>We&apos;d love to hear from you.</p>

				<p style={{ marginBottom: '1.25rem' }}>
					Whether you have a question, feedback, or need support, feel free to reach out to us.
				</p>

				<div style={{ display: 'grid', gap: '0.85rem' }}>
					<p style={{ color: 'var(--color-warm-gray)' }}>
						<strong style={{ color: 'var(--color-off-white)' }}>Email:</strong>{' '}
						<a href="mailto:mechzy01@gmail.com" style={{ color: 'var(--color-brown-light)' }}>
							mechzy01@gmail.com
						</a>
					</p>

					<p style={{ color: 'var(--color-warm-gray)' }}>
						<strong style={{ color: 'var(--color-off-white)' }}>Phone:</strong>{' '}
						<a href="tel:+919238159179" style={{ color: 'var(--color-brown-light)' }}>
							+91-9238159179
						</a>
					</p>
				</div>
			</section>
		</main>
	);
};

export default Contact;
