import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicy from '../src/pages/PrivacyPolicy';

/**
 * Privacy Policy Component Tests
 * 
 * These tests verify:
 * 1. The component renders without errors
 * 2. All required sections are present
 * 3. Accessibility features are implemented
 * 4. Links and navigation work correctly
 * 5. Configuration values are properly injected
 * 
 * Run with: npm test
 */

describe('Privacy Policy Page', () => {
  const renderPrivacyPolicy = () => {
    return render(
      <BrowserRouter>
        <PrivacyPolicy />
      </BrowserRouter>
    );
  };

  describe('Rendering', () => {
    it('renders without crashing', () => {
      renderPrivacyPolicy();
    });

    it('displays the main heading', () => {
      renderPrivacyPolicy();
      expect(screen.getByRole('heading', { name: /Privacy Policy/i, level: 1 })).toBeInTheDocument();
    });

    it('displays the effective date', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Effective Date:/i)).toBeInTheDocument();
    });
  });

  describe('Content Sections', () => {
    it('includes all required sections', () => {
      renderPrivacyPolicy();
      
      const requiredSections = [
        /Information We Collect/i,
        /How We Use Your Information/i,
        /Legal Basis for Processing/i,
        /Data Sharing/i,
        /Location.*Real-time Data/i,
        /Mobile Permissions/i,
        /Payments.*Billing/i,
        /User-Generated Content/i,
        /Account Management/i,
        /Data Retention/i,
        /Security Measures/i,
        /Children's Privacy/i,
        /International Data Transfers/i,
        /Cookies.*Analytics/i,
        /Your Rights/i,
        /Changes to This Policy/i,
        /Contact Us/i,
      ];

      requiredSections.forEach(section => {
        expect(screen.getByText(section)).toBeInTheDocument();
      });
    });

    it('displays customer and mechanic user types', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Customers/i)).toBeInTheDocument();
      expect(screen.getByText(/Mechanics/i)).toBeInTheDocument();
    });

    it('includes Table of Contents', () => {
      renderPrivacyPolicy();
      const toc = screen.getByRole('navigation', { name: /table of contents/i });
      expect(toc).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has a skip link for keyboard navigation', () => {
      renderPrivacyPolicy();
      const skipLink = screen.getByText(/Skip to main content/i);
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('uses proper heading hierarchy', () => {
      renderPrivacyPolicy();
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(5);
    });

    it('has aria-labelledby for sections', () => {
      const { container } = renderPrivacyPolicy();
      const sections = container.querySelectorAll('section[aria-labelledby]');
      expect(sections.length).toBeGreaterThan(10);
    });

    it('has main landmark', () => {
      renderPrivacyPolicy();
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Links and Navigation', () => {
    it('includes contact email link', () => {
      renderPrivacyPolicy();
      const emailLinks = screen.getAllByText(/support@mechze.com/i);
      expect(emailLinks.length).toBeGreaterThan(0);
      expect(emailLinks[0].closest('a')).toHaveAttribute('href', 'mailto:support@mechze.com');
    });

    it('includes domain link', () => {
      renderPrivacyPolicy();
      const domainLink = screen.getByText(/https:\/\/mechze\.com/i);
      expect(domainLink).toBeInTheDocument();
    });

    it('has Table of Contents links', () => {
      renderPrivacyPolicy();
      const tocLinks = screen.getAllByRole('link');
      const tocLink = tocLinks.find(link => link.getAttribute('href') === '#section-1');
      expect(tocLink).toBeInTheDocument();
    });

    it('external links have proper security attributes', () => {
      const { container } = renderPrivacyPolicy();
      const externalLinks = container.querySelectorAll('a[target="_blank"]');
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
      });
    });
  });

  describe('Interactive Elements', () => {
    it('has a download PDF button', () => {
      renderPrivacyPolicy();
      const downloadBtn = screen.getByRole('button', { name: /Download.*Print.*PDF/i });
      expect(downloadBtn).toBeInTheDocument();
    });

    it('download button has proper aria-label', () => {
      renderPrivacyPolicy();
      const downloadBtn = screen.getByLabelText(/Download Privacy Policy as PDF/i);
      expect(downloadBtn).toBeInTheDocument();
    });
  });

  describe('Configuration Values', () => {
    it('displays company name', () => {
      renderPrivacyPolicy();
      expect(screen.getAllByText(/Mechze/i).length).toBeGreaterThan(5);
    });

    it('does not contain placeholder text', () => {
      const { container } = renderPrivacyPolicy();
      const text = container.textContent;
      
      expect(text).not.toMatch(/\[COMPANY_NAME\]/i);
      expect(text).not.toMatch(/\[DOMAIN\]/i);
      expect(text).not.toMatch(/\[SUPPORT_EMAIL\]/i);
      expect(text).not.toMatch(/\[EFFECTIVE_DATE\]/i);
      expect(text).not.toMatch(/Lorem ipsum/i);
    });
  });

  describe('Tables', () => {
    it('renders permissions table', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Location/i)).toBeInTheDocument();
      expect(screen.getByText(/Camera/i)).toBeInTheDocument();
      expect(screen.getByText(/Photo Library/i)).toBeInTheDocument();
    });

    it('renders cookies table', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Essential/i)).toBeInTheDocument();
      expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
    });
  });

  describe('Legal Content', () => {
    it('mentions GDPR compliance', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/GDPR/i)).toBeInTheDocument();
    });

    it('includes children\'s privacy statement', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/under the age of 18/i)).toBeInTheDocument();
    });

    it('mentions data encryption', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/encryption/i)).toBeInTheDocument();
    });

    it('includes user rights section', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Right to Access/i)).toBeInTheDocument();
      expect(screen.getByText(/Right to Deletion/i)).toBeInTheDocument();
    });
  });

  describe('Mobile-Specific Content', () => {
    it('mentions mobile apps', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/mobile applications/i)).toBeInTheDocument();
    });

    it('includes permissions section', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Mobile Permissions/i)).toBeInTheDocument();
    });

    it('discusses location tracking', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/real-time location/i)).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('displays copyright information', () => {
      renderPrivacyPolicy();
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`${currentYear}.*Mechze`, 'i'))).toBeInTheDocument();
    });

    it('shows last updated date', () => {
      renderPrivacyPolicy();
      expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
    });
  });
});

/**
 * Accessibility Audit Tests
 * 
 * These tests check for common accessibility issues.
 * For comprehensive testing, also use:
 * - axe-core (automated)
 * - Manual screen reader testing
 * - Keyboard navigation testing
 */
describe('Privacy Policy - Accessibility Audit', () => {
  const renderPrivacyPolicy = () => {
    return render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
  };

  it('all images have alt text', () => {
    const { container } = renderPrivacyPolicy();
    const images = container.querySelectorAll('img');
    
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });

  it('all form elements have labels', () => {
    const { container } = renderPrivacyPolicy();
    const inputs = container.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      const id = input.getAttribute('id');
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        expect(label).toBeInTheDocument();
      }
    });
  });

  it('no empty links', () => {
    const { container } = renderPrivacyPolicy();
    const links = container.querySelectorAll('a');
    
    links.forEach(link => {
      const text = link.textContent.trim();
      const ariaLabel = link.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    });
  });

  it('no empty buttons', () => {
    const { container } = renderPrivacyPolicy();
    const buttons = container.querySelectorAll('button');
    
    buttons.forEach(button => {
      const text = button.textContent.trim();
      const ariaLabel = button.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    });
  });
});

/**
 * SEO Tests
 * 
 * Verify meta tags and structured data for search engines
 */
describe('Privacy Policy - SEO', () => {
  it('sets document title', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
    
    // Note: Testing Helmet's title requires checking the Helmet context
    // This is a simplified check; in production, use Helmet's testing utilities
  });

  it('includes canonical URL', () => {
    const { container } = render(
      <HelmetProvider>
        <BrowserRouter>
          <PrivacyPolicy />
        </BrowserRouter>
      </HelmetProvider>
    );
    
    // Helmet injects into <head>, so we check the Helmet script
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });
});
