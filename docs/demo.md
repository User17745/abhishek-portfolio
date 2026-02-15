# Demo Scenario - Milestone 1 (MVP)

## Prerequisites
- Node.js 20+
- npm

## Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Demo Checklist

### 1. Initial Load
- [ ] Navigate to `http://localhost:4321`
- [ ] Verify page loads without errors
- [ ] Check hero section displays correctly
- [ ] Verify stats cards are visible

### 2. Navigation
- [ ] Click each nav link (About, Experience, Projects, Brands, Contact)
- [ ] Verify smooth scroll to each section
- [ ] Test mobile menu (resize to <768px width)
- [ ] Toggle mobile menu open/close

### 3. Theme Toggle
- [ ] Click theme toggle button in header
- [ ] Verify dark/light mode switches
- [ ] Refresh page - verify theme persists
- [ ] Check system preference detection

### 4. Sections Verification

#### Hero Section
- [ ] Name and title visible
- [ ] CTA buttons functional
- [ ] LinkedIn link opens correctly
- [ ] Stats grid displays all 6 items

#### About Section
- [ ] Bio text renders correctly
- [ ] All skill categories visible
- [ ] Badge tags display properly

#### Experience Section
- [ ] Timeline renders correctly
- [ ] All 8 experience items visible
- [ ] Highlights and roles display
- [ ] Cards have hover effect

#### Projects Section
- [ ] 7 project cards display
- [ ] Metrics show on applicable cards
- [ ] Platform badges visible
- [ ] Hover effect on cards

#### Brands Section
- [ ] Featured brands display prominently
- [ ] Other brands listed below
- [ ] Hover effects work

#### Contact Section
- [ ] Contact info displays correctly
- [ ] Form inputs are functional
- [ ] Submit button visible
- [ ] Form validation works

### 5. Responsive Testing
- [ ] Desktop (1440px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Mobile menu works on small screens

### 6. Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] No console errors
- [ ] Images load correctly

## Production Build

```bash
npm run build
npm run preview
```

- [ ] Production build succeeds
- [ ] Preview server runs correctly
- [ ] All features work in production
