# Service Images Setup Instructions

## Overview
You need to add three service images to the frontend application.

## Steps to Add Images

### 1. Save the Images
Save the three images you have (Breakdown Repair, Scheduled Service, and Emergency Pickup) to the following locations with these exact filenames:

```
d:\mechzy\MechTrix\MechTrix\frontend\public\images\breakdown.png
d:\mechzy\MechTrix\MechTrix\frontend\public\images\schedule.png
d:\mechzy\MechTrix\MechTrix\frontend\public\images\emergency.png
```

**Image Details:**
- **breakdown.png** - The "Breakdown Repair" image (tow truck with car and wrenches)
- **schedule.png** - The "Scheduled Service" image (calendar with tools)
- **emergency.png** - The "Emergency Pickup" image (tow truck with flashing light)

### 2. Verify the Images
After saving, the images directory should contain:
```
frontend/public/images/
├── breakdown.png       ← New
├── schedule.png        ← New  
├── emergency.png       ← New
├── garage-hero.jpg
├── garage-hero.jpg.jpg
└── garage-hero.jpg.png
```

### 3. Where the Images Are Used
The images are already integrated into the **Customer Dashboard** at:
- File: `frontend/src/pages/CustomerDashboard.jsx` (lines 99-115)

The services section displays three cards with these images.

## Current Implementation

The code in CustomerDashboard.jsx already references these images:

```jsx
<section className="services">
  <h2>Our Services</h2>
  <div className="service-cards">
    <div className="card">
      <img src="/images/breakdown.png" alt="Breakdown Repair" />
      <h3>Breakdown Repair</h3>
    </div>
    <div className="card">
      <img src="/images/schedule.png" alt="Scheduled Service" />
      <h3>Scheduled Service</h3>
    </div>
    <div className="card">
      <img src="/images/emergency.png" alt="Emergency Pickup" />
      <h3>Emergency Pickup</h3>
    </div>
  </div>
</section>
```

## Testing

After adding the images:
1. Start the frontend development server: `npm run dev`
2. Navigate to the Customer Dashboard
3. Scroll to the "Our Services" section
4. Verify all three service images display correctly

## Troubleshooting

If images don't display:
- Check that filenames match exactly (case-sensitive on some systems)
- Verify images are in PNG format
- Clear browser cache and refresh
- Check browser console for 404 errors
