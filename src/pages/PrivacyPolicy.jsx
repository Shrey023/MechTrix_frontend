import React, { useRef, useEffect } from 'react';
import './PrivacyPolicy.css';

// Configuration constants - REPLACE THESE WITH YOUR ACTUAL VALUES
const COMPANY_NAME = 'Mechze';
const DOMAIN = 'https://mechze.com';
const SUPPORT_EMAIL = 'mechzy01@gmail.com';
const EFFECTIVE_DATE = '2025-01-01'; // Format: YYYY-MM-DD

const PrivacyPolicy = () => {
  const contentRef = useRef(null);

  // Set document title and meta tags
  useEffect(() => {
    document.title = `Privacy Policy — ${COMPANY_NAME}`;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = `Learn how ${COMPANY_NAME} collects, uses, and protects your personal information. Our privacy policy covers data practices for both customers and mechanics.`;

    // Set robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = 'index, follow';

    // Set canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = `${DOMAIN}/privacy-policy`;

    // Add structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `Privacy Policy — ${COMPANY_NAME}`,
      description: `Privacy policy for ${COMPANY_NAME} platform covering customers and mechanics`,
      url: `${DOMAIN}/privacy-policy`,
      dateModified: EFFECTIVE_DATE,
      mainEntity: {
        '@type': 'PrivacyPolicy',
        name: `${COMPANY_NAME} Privacy Policy`,
        effectiveDate: EFFECTIVE_DATE,
      },
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = COMPANY_NAME;
    };
  }, []); 

  // Generate PDF from page content
  const handleDownloadPDF = () => {
    window.print();
  };

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>

      <div className="privacy-policy-page">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <main id="main-content" className="privacy-container" ref={contentRef} role="main">
          <header className="privacy-header">
            <h1>Privacy Policy</h1>
            <p className="effective-date">
              <strong>Effective Date:</strong> {new Date(EFFECTIVE_DATE).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="last-updated">Last updated: {EFFECTIVE_DATE}</p>
          </header>

          {/* Introduction */}
          <section className="intro-section" aria-labelledby="intro-heading">
            <h2 id="intro-heading">Introduction</h2>
            <p>
              Welcome to {COMPANY_NAME}. This Privacy Policy describes how {COMPANY_NAME} ("we," "us," or "our") 
              collects, uses, shares, and protects your personal information when you use our platform, including 
              our website at <a href={DOMAIN}>{DOMAIN}</a> and our mobile applications (collectively, the "Services").
            </p>
            <p>
              This policy applies to two types of users:
            </p>
            <div className="user-types">
              <div className="user-card customer-card">
                <h3>👤 Customers</h3>
                <p>Individuals who request mechanic services through our platform</p>
              </div>
              <div className="user-card mechanic-card">
                <h3>🔧 Mechanics</h3>
                <p>Service providers who offer automotive repair and maintenance services</p>
              </div>
            </div>
            <p>
              By using {COMPANY_NAME}, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with this policy, please do not use our Services.
            </p>
          </section>

          {/* Table of Contents */}
          <nav className="table-of-contents" aria-labelledby="toc-heading">
            <h2 id="toc-heading">Table of Contents</h2>
            <ol>
              <li><a href="#section-1" onClick={(e) => { e.preventDefault(); scrollToSection('section-1'); }}>Information We Collect</a></li>
              <li><a href="#section-2" onClick={(e) => { e.preventDefault(); scrollToSection('section-2'); }}>How We Use Your Information</a></li>
              <li><a href="#section-3" onClick={(e) => { e.preventDefault(); scrollToSection('section-3'); }}>Sharing of Information</a></li>
              <li><a href="#section-4" onClick={(e) => { e.preventDefault(); scrollToSection('section-4'); }}>Data Security</a></li>
              <li><a href="#section-5" onClick={(e) => { e.preventDefault(); scrollToSection('section-5'); }}>Data Retention</a></li>
              <li><a href="#section-6" onClick={(e) => { e.preventDefault(); scrollToSection('section-6'); }}>Your Choices and Rights</a></li>
              <li><a href="#section-7" onClick={(e) => { e.preventDefault(); scrollToSection('section-7'); }}>Children's Privacy</a></li>
              <li><a href="#section-8" onClick={(e) => { e.preventDefault(); scrollToSection('section-8'); }}>Changes to This Policy</a></li>
              <li><a href="#section-9" onClick={(e) => { e.preventDefault(); scrollToSection('section-9'); }}>Contact Us</a></li>
            </ol>
          </nav>

          {/* Section 1: Information We Collect */}
          <section id="section-1" className="policy-section" aria-labelledby="section-1-heading">
            <h2 id="section-1-heading">1. Information We Collect</h2>
            <p>
              We collect information from you when you use our Services. The type of information depends on whether you are a Customer or a Mechanic.
            </p>

            <div className="user-data-split">
              <div className="data-category customer-data">
                <h3>For Customers:</h3>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, phone number, and password</li>
                  <li><strong>Location Information:</strong> Your current location when you request a service (requires your permission)</li>
                  <li><strong>Vehicle Information:</strong> Make, model, and details about the service you need</li>
                  <li><strong>Payment Information:</strong> We do not store your credit card details. Payment information is securely processed by third-party payment providers</li>
                  <li><strong>Service History:</strong> Records of your past bookings and service requests</li>
                  <li><strong>Communications:</strong> Messages you send through our platform and customer support interactions</li>
                  <li><strong>Device Information:</strong> Device type, operating system, IP address, and app usage data</li>
                </ul>
              </div>

              <div className="data-category mechanic-data">
                <h3>For Mechanics:</h3>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, phone number, and password</li>
                  <li><strong>Professional Information:</strong> Business name (if applicable), service areas, skills, and availability</li>
                  <li><strong>Location Information:</strong> Your location when you are available for work and during active jobs</li>
                  <li><strong>Verification Information:</strong> We may request basic identity or business verification documents to ensure platform safety</li>
                  <li><strong>Payment Information:</strong> Bank account information for receiving payments (stored securely by our third-party payment provider)</li>
                  <li><strong>Service History:</strong> Records of completed jobs, earnings, and customer reviews</li>
                  <li><strong>Communications:</strong> Messages with customers and support interactions</li>
                  <li><strong>Device Information:</strong> Device type, operating system, IP address, and app usage data</li>
                </ul>
              </div>
            </div>

            <p className="collection-note">
              <strong>Note:</strong> We collect location data only when you are actively using the app and with your permission. 
              You can disable location access in your device settings, but this may limit core features of the service.
            </p>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section id="section-2" className="policy-section" aria-labelledby="section-2-hedading">
            <h2 id="section-2-heading">2. How We Use Your Information</h2>
            <p>We process your personal data based on your consent, our need to provide the service, or our legitimate business interests. We use your information to:</p>
            <ul>
              <li><strong>Provide Our Services:</strong> Connect customers with mechanics, process service requests, and coordinate appointments</li>
              <li><strong>Match and Navigate:</strong> Use location data to find nearby mechanics and provide navigation assistance</li>
              <li><strong>Process Payments:</strong> Facilitate secure transactions between customers and mechanics</li>
              <li><strong>Communicate:</strong> Send booking confirmations, service updates, and respond to your inquiries</li>
              <li><strong>Improve Our Platform:</strong> Analyze usage patterns and gather feedback to enhance the user experience</li>
              <li><strong>Ensure Safety:</strong> Verify mechanic accounts and monitor for fraudulent or inappropriate activity</li>
              <li><strong>Comply with Legal Obligations:</strong> Meet legal and regulatory requirements</li>
              <li><strong>Marketing:</strong> With your consent, send you promotional offers and service recommendations. You can opt out at any time</li>
            </ul>
          </section>

          {/* Section 3: Sharing of Information */}
          <section id="section-3" className="policy-section" aria-labelledby="section-3-heading">
            <h2 id="section-3-heading">3. Sharing of Information</h2>
            <p>We share your information only when necessary to provide our Services or as required by law:</p>
            <ul>
              <li>
                <strong>Between Users:</strong> When you book a service, we share necessary information (name, phone number, location) 
                between customers and mechanics to facilitate the service
              </li>
              <li>
                <strong>Payment Processors:</strong> We use third-party payment providers to process transactions securely. 
                Your payment information is handled directly by these providers and not stored on our servers
              </li>
              <li>
                <strong>Service Providers:</strong> We may share data with trusted service providers who help us operate our platform, 
                such as cloud hosting, analytics, and communication services. These providers are contractually obligated to protect your data
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or government request, 
                or to protect the safety and rights of our users and our company
              </li>
              <li>
                <strong>Business Transfers:</strong> If {COMPANY_NAME} is involved in a merger, acquisition, or sale of assets, 
                your information may be transferred as part of that transaction
              </li>
            </ul>
            <p className="sharing-note">
              <strong>We do not sell your personal information.</strong> Your data is shared only to provide our Services and ensure platform safety.
            </p>
          </section>

          {/* Section 4: Data Security */}
          <section id="section-4" className="policy-section" aria-labelledby="section-4-heading">
            <h2 id="section-4-heading">4. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, loss, or misuse:
            </p>
            <ul>
              <li><strong>Encryption:</strong> Data transmitted between your device and our servers is encrypted using secure protocols (HTTPS/TLS)</li>
              <li><strong>Secure Storage:</strong> Personal information is stored on secure servers with restricted access</li>
              <li><strong>Password Protection:</strong> User passwords are securely hashed and cannot be retrieved in plain text</li>
              <li><strong>Access Controls:</strong> Only authorized personnel have access to personal data, and access is monitored</li>
              <li><strong>Third-Party Security:</strong> Our payment and cloud service providers follow industry-standard security practices</li>
            </ul>
            <p className="security-note">
              <strong>Your Responsibility:</strong> Keep your account password secure and do not share it with anyone. 
              If you suspect unauthorized access to your account, contact us immediately at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
            <p>
              While we implement reasonable security measures, no system is completely secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          {/* Section 5: Data Retention */}
          <section id="section-5" className="policy-section" aria-labelledby="section-5-heading">
            <h2 id="section-5-heading">5. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary to provide our Services, comply with legal obligations, 
              resolve disputes, and enforce our agreements.
            </p>
            <ul>
              <li><strong>Active Accounts:</strong> We keep your information while your account is active and you continue using our Services</li>
              <li><strong>Closed Accounts:</strong> When you delete your account, we will remove or anonymize your personal information, 
              except where we are required to retain it for legal, tax, or accounting purposes</li>
              <li><strong>Transaction Records:</strong> Booking and payment records may be retained longer to comply with legal obligations 
              and resolve disputes</li>
              <li><strong>Communications:</strong> Support messages and communications may be kept to improve our service quality</li>
            </ul>

            <p><strong>How to Delete Your Account:</strong></p>
            <ol>
              <li>You can delete your account through the app settings, or</li>
              <li>Email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with "Delete My Account" in the subject line</li>
              <li>We will process your request within 30 days</li>
            </ol>

            <p className="deletion-note">
              <strong>Important:</strong> Deleting your account will permanently remove your profile and service history. 
              This action cannot be undone. Some information may be retained for legal compliance.
            </p>
          </section>

          {/* Section 6: Your Choices and Rights */}
          <section id="section-6" className="policy-section" aria-labelledby="section-6-heading">
            <h2 id="section-6-heading">6. Your Choices and Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul>
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> You can update or correct your account information through the app or by contacting us</li>
              <li><strong>Deletion:</strong> You can request that we delete your personal information (subject to legal retention requirements)</li>
              <li><strong>Opt-Out of Marketing:</strong> You can unsubscribe from promotional emails by clicking the "Unsubscribe" 
              link in any marketing email</li>
              <li><strong>Location Permissions:</strong> You can control location access through your device settings</li>
              <li><strong>Push Notifications:</strong> You can disable notifications through your device settings or app settings</li>
            </ul>

            <h3>How to Exercise Your Rights:</h3>
            <p>
              To exercise any of these rights, contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with 
              "Privacy Request" in the subject line. Please include your account email or phone number so we can verify your identity.
            </p>
            <p>
              We will respond to your request within 30 days. Note that even if you opt out of marketing communications, 
              we may still send you important service-related messages (such as booking confirmations).
            </p>
          </section>

          {/* Section 7: Children's Privacy */}
          <section id="section-7" className="policy-section" aria-labelledby="section-7-heading">
            <h2 id="section-7-heading">7. Children's Privacy</h2>
            <p>
              {COMPANY_NAME} is not intended for use by anyone under the age of 18. We do not knowingly collect personal 
              information from children under 18.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We will promptly delete such information.
            </p>
            <p>
              By using our Services, you confirm that you are at least 18 years old and legally able to enter into agreements.
            </p>
          </section>

          {/* Section 8: Changes to This Policy */}
          <section id="section-8" className="policy-section" aria-labelledby="section-8-heading">
            <h2 id="section-8-heading">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
            </p>
            <p>
              When we make changes:
            </p>
            <ul>
              <li>We will update the "Effective Date" at the top of this page</li>
              <li>For significant changes, we will notify you through the app, email, or a notice on our website</li>
              <li>Your continued use of our Services after the changes take effect means you accept the updated policy</li>
            </ul>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* Section 9: Contact Us */}
          <section id="section-9" className="policy-section" aria-labelledby="section-9-heading">
            <h2 id="section-9-heading">9. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests about this Privacy Policy or how we handle your personal information, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Company:</strong> {COMPANY_NAME}</p>
              <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
              <p><strong>Website:</strong> <a href={DOMAIN}>{DOMAIN}</a></p>
            </div>
            <p>
              For privacy-specific requests (access, deletion, correction), please use "Privacy Request" in your email subject line 
              to help us route your message appropriately.
            </p>
          </section>

          {/* Footer Actions */}
          <footer className="policy-footer">
            <button onClick={handleDownloadPDF} className="download-pdf-btn" aria-label="Download Privacy Policy as PDF">
              📄 Download / Print as PDF
            </button>
            <p className="footer-note">
              This Privacy Policy was last updated on {new Date(EFFECTIVE_DATE).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}. © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
