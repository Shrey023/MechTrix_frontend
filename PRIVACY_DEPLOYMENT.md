# Privacy Policy - Deployment Checklist

## Pre-Deployment Steps

### 1. Configuration Setup ✅
- [ ] Open `src/config/privacyConfig.js`
- [ ] Replace `COMPANY_NAME` with your actual company name
- [ ] Update `DOMAIN` to your production domain (e.g., `https://mechze.com`)
- [ ] Set `SUPPORT_EMAIL` to your actual support email
- [ ] Set `DPO_EMAIL` (Data Protection Officer email if applicable)
- [ ] Update `EFFECTIVE_DATE` to the date the policy goes live (format: YYYY-MM-DD)
- [ ] Fill in payment processor, analytics providers, and cloud provider names
- [ ] Verify retention periods match your actual data retention policies
- [ ] Update business hours and timezone

### 2. Legal Review 📋
- [ ] Have a lawyer review the Privacy Policy content
- [ ] Ensure compliance with applicable laws:
  - [ ] GDPR (if serving EU users)
  - [ ] CCPA/CPRA (if serving California users)
  - [ ] PIPEDA (if serving Canadian users)
  - [ ] Other regional privacy laws
- [ ] Verify all third-party services mentioned are accurate
- [ ] Confirm data retention periods align with legal requirements
- [ ] Ensure children's privacy section complies with COPPA (if applicable)

### 3. Route Setup 🛣️
Add the Privacy Policy route to your React Router configuration:

```jsx
// In src/App.jsx
import PrivacyPolicy from './pages/PrivacyPolicy';

// Add to your Routes:
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
```

### 4. Dependencies Installation 📦
Ensure required packages are installed:

```bash
npm install react-helmet-async
```

If not already using `react-helmet-async`, wrap your app in `HelmetProvider`:

```jsx
// In src/main.jsx or src/index.js
import { HelmetProvider } from 'react-helmet-async';

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

### 5. Testing Checklist 🧪

#### Accessibility Testing
- [ ] Run automated accessibility audit (use browser DevTools Lighthouse)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify all sections have proper heading hierarchy (h1 → h2 → h3)
- [ ] Test keyboard navigation (Tab through all links and buttons)
- [ ] Verify skip link works (press Tab on page load)
- [ ] Check color contrast ratios (minimum 4.5:1 for body text)
- [ ] Test with browser zoom at 200%

#### Functional Testing
- [ ] Verify Table of Contents links scroll to correct sections
- [ ] Test "Download / Print as PDF" button (triggers browser print dialog)
- [ ] Check all external links open in new tabs with proper security attributes
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS Safari, Chrome Android)
- [ ] Verify responsive layout at various screen sizes (320px, 768px, 1024px, 1440px)

#### SEO & Metadata
- [ ] Verify page title appears correctly in browser tab
- [ ] Check meta description is present and under 160 characters
- [ ] Confirm canonical URL is correct
- [ ] Validate structured data (JSON-LD) using Google's Rich Results Test
- [ ] Test Open Graph tags for social sharing (optional)

#### Content Verification
- [ ] Confirm all placeholder values are replaced (COMPANY_NAME, DOMAIN, etc.)
- [ ] Check all email links work (`mailto:` links)
- [ ] Verify effective date displays correctly
- [ ] Ensure no lorem ipsum or placeholder text remains
- [ ] Proofread all sections for typos and grammar

### 6. Production Deployment 🚀

#### Hosting & HTTPS
- [ ] Deploy to production server
- [ ] Ensure page is accessible at `https://mechze.com/privacy-policy` (or your domain)
- [ ] Verify HTTPS certificate is valid and enforced (HTTP should redirect to HTTPS)
- [ ] Test final URL in incognito/private browsing mode

#### Link Integration
- [ ] Add Privacy Policy link to website footer
- [ ] Add link to mobile app settings/legal section
- [ ] Include link in user registration flow (checkbox: "I agree to the Privacy Policy")
- [ ] Update email templates to include Privacy Policy link

#### App Store Compliance
- [ ] Add Privacy Policy URL to Google Play Console:
  - Go to Play Console → App Content → Privacy Policy
  - Enter: `https://mechze.com/privacy-policy`
- [ ] Add Privacy Policy URL to Apple App Store Connect:
  - Go to App Store Connect → App Information → Privacy Policy URL
  - Enter: `https://mechze.com/privacy-policy`
- [ ] Update app descriptions to mention privacy practices

### 7. Post-Deployment Monitoring 📊
- [ ] Monitor Google Search Console for indexing status
- [ ] Check Google Analytics for page views and bounce rate
- [ ] Monitor for broken links using tools like Screaming Frog
- [ ] Set calendar reminder to review policy annually
- [ ] Track user feedback or support tickets related to privacy

---

## Quick Deploy Commands

### Build for Production
```bash
cd frontend
npm run build
```

### Test Production Build Locally
```bash
npm run preview
```

### Deploy to Vercel (Example)
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify (Example)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## Version Control

After deployment, create a git tag for the policy version:

```bash
git tag -a privacy-policy-v1.0.0 -m "Privacy Policy version 1.0.0 - Effective 2025-01-01"
git push origin privacy-policy-v1.0.0
```

Store previous versions in a separate folder for legal record-keeping:
```
docs/legal/privacy-policy/
  ├── privacy-policy-v1.0.0-2025-01-01.md
  ├── privacy-policy-v1.1.0-2025-06-15.md
  └── ...
```

---

## Automated Testing Script (Optional)

Create a test file to validate the Privacy Policy page:

```javascript
// tests/PrivacyPolicy.test.jsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicy from '../src/pages/PrivacyPolicy';

describe('Privacy Policy Page', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
  });

  it('displays the page title', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('includes all required sections', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/Information We Collect/i)).toBeInTheDocument();
    expect(screen.getByText(/How We Use Your Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Sharing/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Rights/i)).toBeInTheDocument();
  });

  it('has accessible Table of Contents', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
    const toc = screen.getByRole('navigation', { name: /table of contents/i });
    expect(toc).toBeInTheDocument();
  });

  it('includes contact email', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
    const emailLink = screen.getByText(/support@mechze.com/i);
    expect(emailLink).toHaveAttribute('href', 'mailto:support@mechze.com');
  });
});
```

Run tests:
```bash
npm test
```

---

## Accessibility Audit Command

Using `axe-core` for automated accessibility testing:

```bash
npm install --save-dev @axe-core/react
```

Add to your app (in development mode):
```javascript
// In src/main.jsx (development only)
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

---

## Support & Maintenance

- Review and update the Privacy Policy at least annually
- Monitor changes to privacy laws (GDPR, CCPA, etc.)
- Update the policy whenever you add new third-party services or change data practices
- Notify users of material changes via email or app notification
- Maintain version history for legal compliance

---

**Last Updated:** 2025-01-01  
**Document Version:** 1.0.0
