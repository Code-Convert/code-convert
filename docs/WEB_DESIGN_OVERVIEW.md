# Visual Section Overview

## Complete Page Flow (Top to Bottom)

---

### 🎯 SECTION 1: HERO (Full Screen)
```
┌─────────────────────────────────────────────────────────────┐
│                    [Animated Background]                     │
│                                                              │
│         WE BUILD HIGH-CONVERTING WEBSITES                    │
│              FOR GROWING BRANDS                              │
│                                                              │
│    We leverage data-backed Conversion Rate Optimisation     │
│      and precision-driven digital strategy to help          │
│      ambitious businesses break through revenue             │
│           plateaus and unlock sustainable growth.           │
│                                                              │
│    ┌───────────────────┐  ┌──────────────────┐            │
│    │  Book A Meeting   │  │  View Our Work   │            │
│    │  [with badge on   │  │                  │            │
│    │   hover]          │  │                  │            │
│    └───────────────────┘  └──────────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Components:
- AnimatedHeading (word-by-word reveal)
- CTAButton x2 (primary with badge, secondary)
- motion.p for supporting text

Design:
- Centered layout
- Max-width: 6xl (1152px)
- Large bold typography
- Generous whitespace
```

---

### 📱 SECTION 2: STICKY PROJECT SHOWCASE
```
┌─────────────────────────────────────────────────────────────┐
│              SELECTED PROJECTS                               │
│    See How Strategy, Design & Performance Combine           │
│                                                              │
│  ┌─────────────────────┐  ┌────────────────────────┐      │
│  │ [E-Commerce]        │  │                         │      │
│  │ StyleHub Fashion    │  │   [Large Screenshot]    │      │
│  │                     │  │   Glassmorphism card    │      │
│  │ Description text... │  │   Border + shadow       │      │
│  │                     │  │   Aspect: video         │      │
│  │ Services:           │  │                         │      │
│  │ [Tag] [Tag] [Tag]   │  │                         │      │
│  └─────────────────────┘  └────────────────────────┘      │
│                                                              │
│                     ⬇️ Scroll ⬇️                              │
│                                                              │
│  ┌─────────────────────┐  ┌────────────────────────┐      │
│  │ [Luxury Retail]     │  │                         │      │
│  │ Mbali Jewellery     │  │   [New Screenshot]      │      │
│  │ ...                 │  │   Smooth transition     │      │
│  └─────────────────────┘  └────────────────────────┘      │
│                                                              │
│  [Continues for 4 projects total]                           │
└─────────────────────────────────────────────────────────────┘

Components:
- Section wrapper
- SectionHeader (subtitle, title, description)
- StickyScroll with 4 ProjectCards

Behavior:
- Image panel sticky on desktop
- Content fades/scales as you scroll
- Each project = full viewport height
- Page scroll controls animation (not container)

Design:
- 2-column grid (stacks on mobile)
- Large images (700px+ wide)
- Industry badges (red accent)
- Service tags (gray)
```

---

### 🖼️ SECTION 3: WEBSITE CAROUSEL
```
┌─────────────────────────────────────────────────────────────┐
│                  RECENT LAUNCHES                             │
│              Website Launches                                │
│    A selection of websites designed and developed           │
│         for brands across South Africa.                      │
│                                                              │
│  ← ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ →        │
│    │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │          │
│    │      │ │      │ │      │ │      │ │      │          │
│    │Urban │ │Apex  │ │Verde │ │Elevate│Summit│          │
│    │Living│ │Consult│Organic│Fitness│Legal │          │
│    │      │ │      │ │      │ │      │ │      │          │
│    └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
│                                                              │
│    [Auto-scrolls • Pause on hover • Drag to scroll]        │
└─────────────────────────────────────────────────────────────┘

Components:
- Section wrapper
- SectionHeader
- WebsiteCarousel with 5 WebsiteCards (duplicated)

Behavior:
- Auto-scrolls horizontally (30s duration)
- Pauses when mouse hovers
- Draggable with mouse/touch
- Infinite seamless loop
- Hover scales card slightly

Design:
- Cards: 400px wide, 450px tall
- Gradient overlay on images
- Name + industry at bottom
- Horizontal overflow hidden
```

---

### 📊 SECTION 4: OUR WORK + STATISTICS
```
┌─────────────────────────────────────────────────────────────┐
│                     OUR WORK                                 │
│         A Track Record Of Market Dominance                   │
│    We let the numbers do the talking. Explore the           │
│    strategies, campaigns and digital experiences that        │
│    transformed ambitious goals into measurable growth.       │
│                                                              │
│               ┌──────────────────┐                          │
│               │ See More Projects│                          │
│               └──────────────────┘                          │
│                                                              │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                 │
│   │ 150+ │  │ 95+  │  │ 4.8x │  │ 100% │                 │
│   │[Glow]│  │[Glow]│  │[Glow]│  │[Glow]│                 │
│   │      │  │      │  │      │  │      │                 │
│   │Projects│Performance│Average│Custom │                 │
│   │Delivered│ Scores  │ ROAS  │Built  │                 │
│   └──────┘  └──────┘  └──────┘  └──────┘                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Components:
- Section wrapper
- SectionHeader with CTA button
- AnimatedStats (4 StatCards)

Behavior:
- Numbers count up when scrolled into view
- Spring animation for smooth counting
- Only animates once
- Hover glow intensifies

Design:
- 4-column grid (2-col mobile)
- Large numbers (7xl text)
- Gradient text
- Red glow effect
- Centered layout
```

---

### 💬 SECTION 5: TESTIMONIALS
```
┌─────────────────────────────────────────────────────────────┐
│              CLIENT SUCCESS STORIES                          │
│       Trusted By Industry-Leading Companies                  │
│    Real feedback from businesses across South Africa        │
│         that trusted us to build, optimise and              │
│              scale their digital presence.                   │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐          │
│  │ ⭐⭐⭐⭐⭐   │  │ ⭐⭐⭐⭐⭐   │  │ ⭐⭐⭐⭐⭐   │          │
│  │            │  │            │  │            │          │
│  │ "Quote..." │  │ "Quote..." │  │ "Quote..." │          │
│  │            │  │            │  │            │          │
│  │ Sarah M.   │  │ David K.   │  │ Lisa C.    │          │
│  │ Founder    │  │ Marketing  │  │ Managing   │          │
│  │ StyleHub   │  │ Director   │  │ Partner    │          │
│  └────────────┘  └────────────┘  └────────────┘          │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐          │
│  │ ⭐⭐⭐⭐⭐   │  │ ⭐⭐⭐⭐⭐   │  │ ⭐⭐⭐⭐⭐   │          │
│  │ [3 more testimonials in second row]         │          │
│  └────────────┘  └────────────┘  └────────────┘          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Components:
- Section wrapper
- SectionHeader
- TestimonialsGrid (6 TestimonialCards)

Behavior:
- Staggered entrance (0.1s delay each)
- Hover lifts card (-5px)
- Glow effect on hover
- Scale slightly on hover

Design:
- 3-column grid (stacks on mobile)
- Glassmorphism cards
- Star ratings (filled/unfilled)
- Quote prominent
- Author info at bottom
- Border on hover
```

---

### 🎯 SECTION 6: FINAL CTA (Conversion Zone)
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│            [Gradient Glow Background Effect]                 │
│   ┌────────────────────────────────────────────────┐       │
│   │  [Glassmorphism Card]                          │       │
│   │                                                │       │
│   │        Get Your Scaling Strategy               │       │
│   │                                                │       │
│   │   From idea to investment, MVP to market —     │       │
│   │   we adapt to your goals and build around      │       │
│   │   what your product truly needs.               │       │
│   │                                                │       │
│   │   ┌──────────────────┐  ┌─────────────────┐  │       │
│   │   │ Book 1:1 Meeting │  │ Request Callback│  │       │
│   │   └──────────────────┘  └─────────────────┘  │       │
│   │                                                │       │
│   └────────────────────────────────────────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Components:
- Section wrapper
- motion.div for card animation
- CTAButton x2 (primary + secondary)

Behavior:
- Scale animation on scroll into view
- Glow intensifies as card enters
- Buttons have standard interactions

Design:
- Large premium card
- Centered content
- Max-width: 5xl (896px)
- Gradient glow behind card
- Large heading (6xl)
- Dual CTAs
- High visual impact
```

---

## 🎨 Design Pattern Summary

### Typography Scale
```
Hero Heading:     text-4xl → text-8xl  (36px → 96px)
Section Titles:   text-3xl → text-6xl  (30px → 60px)
Subsections:      text-2xl → text-4xl  (24px → 36px)
Body Large:       text-lg → text-2xl   (18px → 24px)
Body:             text-base → text-xl  (16px → 20px)
Small:            text-sm → text-base  (14px → 16px)
```

### Color Palette
```
Background:       #050505 (black)
Text Primary:     #FFFFFF (white)
Text Secondary:   rgba(255,255,255,0.6) (gray-400)
Accent:           #FF1E1E (red)
Borders:          rgba(255,255,255,0.1)
Glassmorphism:    rgba(255,255,255,0.05)
```

### Spacing System
```
Sections:         py-24 md:py-32       (96px → 128px)
Content:          mb-12 md:mb-16       (48px → 64px)
Elements:         gap-4 md:gap-8       (16px → 32px)
Cards:            p-6 md:p-8           (24px → 32px)
```

### Animation Timings
```
Fast:             0.3s  (hover effects)
Medium:           0.6s  (scroll reveals)
Slow:             0.8s  (hero entrance)
Delays:           0.1s  (stagger increment)
```

---

## 📐 Layout Grid Reference

### Desktop (1440px+)
```
┌─────────────────────────────────────────┐
│  [Sidebar: None - Full Width Design]   │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Container: max-w-7xl (1280px)    │ │
│  │  Padding: px-6 (24px)             │ │
│  │                                   │ │
│  │  [3-4 Column Grids]               │ │
│  │  [Large Images]                   │ │
│  │  [Generous Spacing]               │ │
│  └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────┐
│  Container: max-w-7xl        │
│  Padding: px-6               │
│                              │
│  [2 Column Grids]            │
│  [Medium Images]             │
│  [Balanced Spacing]          │
└──────────────────────────────┘
```

### Mobile (< 640px)
```
┌─────────────────┐
│  Container:     │
│  max-w-7xl      │
│  Padding: px-4  │
│                 │
│  [Single Col]   │
│  [Stacked]      │
│  [Smaller Text] │
│  [Touch-sized]  │
└─────────────────┘
```

---

## 🔄 Scroll Journey

```
Page Load
   ↓
Hero Animates (Words appear)
   ↓
Scroll Down
   ↓
Projects Section Header Fades In
   ↓
Project 1 (StyleHub) - Image & Content Active
   ↓
Scroll → Project 2 (Mbali) - Smooth Transition
   ↓
Scroll → Project 3 (Fintech)
   ↓
Scroll → Project 4 (Prime Estates)
   ↓
Carousel Section - Auto-scrolling begins
   ↓
Our Work Section - CTA appears
   ↓
Stats Count Up (150+, 95+, 4.8x, 100%)
   ↓
Testimonials Fade In (Staggered)
   ↓
Final CTA Card Scales In
   ↓
Footer (if you have one)
```

---

## 🎬 Animation Sequence

### On Page Load
1. Background starts animating (always active)
2. Hero heading: word-by-word (0s → 0.8s)
3. Supporting text: fade up (0.8s)
4. CTA buttons: fade up (1.0s)

### On Scroll
- Section headers: fade in (once)
- Project cards: opacity + scale transitions
- Carousel: continuous auto-scroll
- Stats: count from 0 → target (once)
- Testimonials: staggered fade + slide (once)
- Final CTA: scale + glow (once)

### On Hover
- Buttons: scale 1.02, badge appears
- Cards: lift -5px, glow intensifies
- Carousel: pause auto-scroll
- Stats: glow increases

---

## 📱 Responsive Breakpoints

```
< 640px   (sm)   Mobile    - Single column, stacked
640px     (md)   Tablet    - 2 columns, medium text
768px     (lg)   Desktop   - 3 columns, sticky effects
1024px    (xl)   Large     - 4 columns, full features
1280px    (2xl)  XL        - Max content width
```

---

## ✨ Interactive Elements

| Element | Interaction | Feedback |
|---------|-------------|----------|
| CTA Buttons | Hover | Badge appears, scale up |
| CTA Buttons | Click | Scale down, navigate |
| Project Images | Scroll | Fade in/out, parallax |
| Carousel Cards | Hover | Scale 1.02, pause auto-scroll |
| Carousel | Drag | Manual scroll, cursor change |
| Stat Numbers | Scroll into view | Count up animation |
| Testimonial Cards | Hover | Lift, glow, scale |
| All Text | Select | Red highlight (selection color) |
| Background | Mouse move | Particles follow cursor |

---

This visual overview shows exactly how each section looks and behaves. Use it as a reference when customizing or explaining the design to stakeholders! 🎨
