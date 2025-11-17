/**
 * Privacy Policy Configuration
 * 
 * IMPORTANT: Replace these values with your actual company information before deploying to production.
 * These constants are used throughout the Privacy Policy page to maintain consistency.
 */

export const PRIVACY_CONFIG = {
  // Company Details
  COMPANY_NAME: 'Mechze',
  COMPANY_LEGAL_NAME: 'Mechze Inc.', // Use for legal documents
  
  // Contact Information
  DOMAIN: 'https://mechze.com',
  SUPPORT_EMAIL: 'support@mechze.com',
  DPO_EMAIL: 'dpo@mechze.com', // Data Protection Officer email
  PRIVACY_EMAIL: 'privacy@mechze.com',
  
  // Legal Details
  EFFECTIVE_DATE: '2025-01-01', // Format: YYYY-MM-DD
  LAST_UPDATED: '2025-01-01', // Update this when you make changes
  VERSION: '1.0.0',
  
  // Regional Settings
  JURISDICTION: 'United States', // Primary jurisdiction
  DATA_PROTECTION_AUTHORITY: 'Federal Trade Commission (FTC)', // Or relevant authority
  
  // Business Hours (for support)
  SUPPORT_HOURS: 'Monday - Friday, 9:00 AM - 6:00 PM EST',
  
  // Social Media & Additional Links
  TWITTER_HANDLE: '@mechze',
  FACEBOOK_PAGE: 'https://facebook.com/mechze',
  HELP_CENTER_URL: 'https://help.mechze.com',
  TERMS_URL: 'https://mechze.com/terms',
  
  // App Store Links (for mobile apps)
  IOS_APP_URL: 'https://apps.apple.com/app/mechze',
  ANDROID_APP_URL: 'https://play.google.com/store/apps/details?id=com.mechze',
  
  // Technical Details
  PAYMENT_PROCESSOR: 'Stripe', // or 'PayPal', etc.
  ANALYTICS_PROVIDERS: ['Google Analytics', 'Firebase Analytics', 'Mixpanel'],
  CLOUD_PROVIDER: 'AWS', // or 'Google Cloud', 'Azure', etc.
  
  // Retention Periods (in years)
  RETENTION_ACTIVE_ACCOUNT: 'duration of account',
  RETENTION_INACTIVE_ACCOUNT: 3,
  RETENTION_FINANCIAL_RECORDS: 7,
  RETENTION_VERIFICATION_DOCS: 2, // after account closure
  RETENTION_COMMUNICATION_LOGS: 2,
};

// Helper function to get formatted effective date
export const getFormattedEffectiveDate = () => {
  return new Date(PRIVACY_CONFIG.EFFECTIVE_DATE).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to check if policy needs update reminder
export const needsUpdateReminder = () => {
  const lastUpdated = new Date(PRIVACY_CONFIG.LAST_UPDATED);
  const now = new Date();
  const monthsDiff = (now - lastUpdated) / (1000 * 60 * 60 * 24 * 30);
  return monthsDiff > 12; // Remind to review annually
};

export default PRIVACY_CONFIG;
