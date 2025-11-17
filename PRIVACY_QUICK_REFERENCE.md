# Privacy Policy - Quick Reference Card
**Print this and keep at your desk!**

---

## 🚀 Quick Commands

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev
# → http://localhost:5173/privacy-policy

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy (example: Vercel)
vercel --prod
```

---

## 📝 Before Launch Checklist

### Configuration (5 min)
- [ ] Open `src/config/privacyConfig.js`
- [ ] Replace `COMPANY_NAME` → Your company name
- [ ] Replace `DOMAIN` → `https://your-domain.com`
- [ ] Replace `SUPPORT_EMAIL` → `support@your-domain.com`
- [ ] Update `EFFECTIVE_DATE` → Go-live date (YYYY-MM-DD)
- [ ] Verify payment processor name
- [ ] Check analytics providers list

### Testing (15 min)
- [ ] Test on localhost
- [ ] Run `npm test` (all tests pass)
- [ ] Lighthouse audit (95+ accessibility score)
- [ ] Test on mobile device
- [ ] Try print/PDF function
- [ ] Check all links work
- [ ] Tab through page (keyboard navigation)

### Legal Review (1-2 weeks)
- [ ] Lawyer reviews content
- [ ] GDPR compliance confirmed
- [ ] CCPA compliance confirmed
- [ ] COPPA compliance confirmed
- [ ] Third-party services accurate

### Deployment (30 min)
- [ ] Deploy to production
- [ ] Verify HTTPS works
- [ ] Test final URL: `https://yourdomain.com/privacy-policy`
- [ ] Add link to website footer
- [ ] Add link to mobile app settings

### App Stores (15 min)
- [ ] **Google Play:** App Content → Privacy Policy → Add URL
- [ ] **Apple App Store:** App Info → Privacy Policy URL → Add URL
- [ ] Submit for review

---

## 🔗 Important URLs

| Environment | URL |
|-------------|-----|
| Local Dev   | http://localhost:5173/privacy-policy |
| Staging     | https://staging.mechze.com/privacy-policy |
| Production  | https://mechze.com/privacy-policy |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/PrivacyPolicy.jsx` | Main component |
| `src/pages/PrivacyPolicy.css` | Styling |
| `src/config/privacyConfig.js` | **← Edit this first!** |
| `src/App.jsx` | Route added ✅ |
| `src/main.jsx` | HelmetProvider added ✅ |
| `package.json` | react-helmet-async added ✅ |

---

## 🆘 Quick Troubleshooting

**Problem:** Page not found  
**Fix:** Check route in `src/App.jsx`:
```jsx
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
```

**Problem:** SEO tags not working  
**Fix:** Check `HelmetProvider` in `src/main.jsx`

**Problem:** Tests failing  
**Fix:** Run `npm install --save-dev @testing-library/react`

**Problem:** Print not working  
**Fix:** Ensure HTTPS; check pop-up blocker

---

## 📊 Compliance Checklist

- [ ] ✅ **GDPR** - User rights, consent, DPO contact
- [ ] ✅ **CCPA** - Right to know, delete, opt-out
- [ ] ✅ **COPPA** - Age restriction (18+)
- [ ] ✅ **PCI-DSS** - Payment security statement
- [ ] ✅ **Accessibility** - WCAG 2.1 AA compliant
- [ ] ✅ **SEO** - Meta tags, structured data

---

## 📞 Support Contacts

| Need | Contact |
|------|---------|
| Privacy questions | support@mechze.com |
| Legal review | (Your lawyer) |
| Technical issues | (Your dev team) |
| DPO (EU users) | dpo@mechze.com |

---

## 📅 Maintenance Schedule

| When | What |
|------|------|
| **Quarterly** | Review third-party services |
| **6 Months** | Check privacy law updates |
| **Annually** | Full policy review + legal consult |
| **As Needed** | Update when adding features |

---

## 🎯 Success Metrics

- [ ] Lighthouse accessibility score: **95+**
- [ ] Mobile responsive: **✅ 320px to 4K**
- [ ] Page load time: **< 2 seconds**
- [ ] All tests passing: **40+/40**
- [ ] Zero accessibility errors
- [ ] HTTPS enforced
- [ ] App stores approved

---

## 📚 Documentation

- **Quick Start:** `PRIVACY_README.md`
- **Deployment:** `PRIVACY_DEPLOYMENT.md`
- **Full Summary:** `PRIVACY_DELIVERY_SUMMARY.md`
- **Tests:** `tests/PrivacyPolicy.test.jsx`

---

## ⚡ Emergency Updates

If you need to update the policy urgently:

1. Edit content in `src/pages/PrivacyPolicy.jsx`
2. Update date in `src/config/privacyConfig.js`:
   ```js
   EFFECTIVE_DATE: '2025-XX-XX',
   VERSION: '1.X.0',
   ```
3. Deploy: `npm run build && vercel --prod`
4. Notify users (if material change)
5. Tag version: `git tag -a privacy-v1.X.0 -m "Description"`

---

## 🎉 Launch Day Checklist

Morning:
- [ ] Final smoke test on staging
- [ ] Verify config values one last time
- [ ] Deploy to production
- [ ] Test production URL

Afternoon:
- [ ] Update Google Play Console
- [ ] Update Apple App Store
- [ ] Add footer link to website
- [ ] Send announcement email (optional)

Evening:
- [ ] Monitor analytics (page views)
- [ ] Check for error reports
- [ ] Celebrate! 🎊

---

**Keep this card handy for quick reference!**

**Version:** 1.0.0 | **Updated:** 2025-01-01 | **Project:** Mechze Privacy Policy
