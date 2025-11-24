# RegainFlow Design System

This document provides a comprehensive guide to the RegainFlow design system, including CSS variables, utility classes, and component patterns.

## Table of Contents

- [Overview](#overview)
- [Color System](#color-system)
- [Glass Morphism](#glass-morphism)
- [Neon Accents & Glows](#neon-accents--glows)
- [Typography](#typography)
- [Spacing](#spacing)
- [Border Radius](#border-radius)
- [Shadows](#shadows)
- [Z-Index System](#z-index-system)
- [Animations & Transitions](#animations--transitions)
- [Utility Classes](#utility-classes)
- [Icon System](#icon-system)
- [Component Patterns](#component-patterns)
- [Responsive Design](#responsive-design)
- [CSS Architecture](#css-architecture)
- [Best Practices](#best-practices)

---

## Overview

RegainFlow uses a **Glass Morphism + Neon Aesthetic** design system. The core principles are:
- Dark backgrounds with frosted glass overlays
- Subtle cyan neon accents for highlights and CTAs
- Clean typography with good contrast
- Smooth animations and transitions

All design tokens are defined in `app/styles/variables.css`.

---

## Color System

### Primary Colors

```css
/* Primary brand colors */
--color-primary: #00d6cb;           /* Cyan - main brand color */
--color-primary-light: #00ffff;     /* Bright cyan for highlights */
--color-primary-dark: #00a89e;      /* Darker cyan for contrast */

/* Alpha variants for overlays */
--color-primary-alpha-15: rgba(0, 214, 203, 0.15);
--color-primary-alpha-20: rgba(0, 214, 203, 0.2);
--color-primary-alpha-25: rgba(0, 214, 203, 0.25);
--color-primary-alpha-50: rgba(0, 214, 203, 0.5);
```

### Secondary Colors

```css
--color-secondary: #121213;         /* Dark background base */
--color-accent: #ffd700;            /* Gold accent for special highlights */
```

### Text Colors

```css
--color-text-primary: #ffffff;      /* Main text - white */
--color-text-secondary: #a6a6a6;    /* Muted text - gray */
--color-text-tertiary: #666666;     /* Very muted text */
```

### Background Colors

```css
--color-bg-primary: #121213;        /* Main dark background */
--color-bg-secondary: #1a1a1a;      /* Slightly lighter */
--color-bg-tertiary: #242424;       /* Card backgrounds */
```

### Status Colors

```css
--color-success: #10b981;           /* Green for success states */
--color-warning: #f59e0b;           /* Orange for warnings */
--color-error: #ef4444;             /* Red for errors */
--color-info: #3b82f6;              /* Blue for information */
```

---

## Glass Morphism

Glass morphism creates a frosted glass effect with backdrop blur and translucent backgrounds.

### Glass Backgrounds

```css
/* Background opacity levels */
--glass-bg-ultra-light: rgba(255, 255, 255, 0.025);  /* Barely visible */
--glass-bg-light: rgba(255, 255, 255, 0.05);         /* Subtle */
--glass-bg-medium: rgba(255, 255, 255, 0.08);        /* Standard cards */
--glass-bg-heavy: rgba(255, 255, 255, 0.12);         /* Prominent elements */
```

### Backdrop Blur

```css
/* Blur intensity levels */
--glass-blur-sm: blur(8px);     /* Subtle blur */
--glass-blur-md: blur(12px);    /* Standard blur */
--glass-blur-lg: blur(20px);    /* Heavy blur for prominent cards */
```

### Glass Borders

```css
--glass-border: rgba(255, 255, 255, 0.1);            /* Subtle border */
--glass-border-accent: rgba(0, 214, 203, 0.2);       /* Cyan-tinted border */
--glass-border-hover: rgba(0, 214, 203, 0.4);        /* Hover state */
```

### Example: Glass Card

```css
.my-card {
  background: var(--glass-bg-medium);
  backdrop-filter: var(--glass-blur-lg);
  -webkit-backdrop-filter: var(--glass-blur-lg);
  border: 1px solid var(--glass-border-accent);
  border-radius: var(--radius-lg);
}
```

---

## Neon Accents & Glows

Neon glows are used sparingly for emphasis. Keep alpha values between 0.2-0.4 for a refined look.

### Glow Variables

```css
/* Pre-defined glow effects */
--glow-subtle: 0 0 10px rgba(0, 214, 203, 0.2);      /* Subtle ambient glow */
--glow-medium: 0 0 20px rgba(0, 214, 203, 0.3);      /* Standard glow */
--glow-hover: 0 0 25px rgba(0, 214, 203, 0.4);       /* Enhanced on hover */
--glow-intense: 0 0 30px rgba(0, 214, 203, 0.5);     /* Maximum intensity */
```

### Example: Glowing Button

```css
.neon-button {
  background: var(--color-primary-alpha-15);
  border: 1.5px solid var(--color-primary);
  box-shadow: var(--glow-subtle);
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.neon-button:hover {
  background: var(--color-primary-alpha-25);
  box-shadow: var(--glow-hover);
  transform: translateY(-2px);
}
```

### Example: Glowing Icon

```css
.icon-glow {
  color: var(--color-primary);
  filter: drop-shadow(0 0 8px rgba(0, 214, 203, 0.5));
}
```

### Example: Text Glow

```css
.text-neon {
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(0, 214, 203, 0.3);
}
```

---

## Typography

### Font Family

```css
--font-primary: 'Exo 2', sans-serif;   /* Main font */
--font-logo: 'Montserrat', sans-serif; /* Logo font */
--font-mono: 'JetBrains Mono', monospace; /* Code font */
```

### Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Font Sizes

```css
/* Recommended scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Usage

```css
.my-text {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-semibold);
}
```

---

## Spacing

Use consistent spacing throughout the application:

```css
/* Spacing scale */
--space-1: 0.25rem;   /* 4px - Extra small */
--space-2: 0.5rem;    /* 8px - Small */
--space-3: 0.75rem;   /* 12px - Medium small */
--space-4: 1rem;      /* 16px - Medium */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px - Large */
--space-8: 2rem;      /* 32px - Extra large */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## Border Radius

```css
--radius-sm: 5px;      /* Small elements like inputs */
--radius-base: 8px;    /* Standard cards and buttons */
--radius-md: 12px;     /* Medium cards */
--radius-lg: 16px;     /* Large cards and sections */
--radius-xl: 20px;     /* Hero sections */
--radius-2xl: 24px;    /* Extra large elements */
--radius-full: 9999px; /* Pills and circular elements */
```

---

## Shadows

```css
/* Elevation shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);

/* Glass shadow */
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.3);
```

---

## Z-Index System

```css
/* Z-index scale for layering */
--z-below: -1;
--z-base: 0;
--z-above: 1;
--z-dropdown: 10;
--z-sticky: 20;
--z-fixed: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-popover: 60;
--z-tooltip: 70;
--z-toast: 80;
--z-max: 9999;
```

### Usage Guidelines

| Element | Z-Index | Example |
|---------|---------|---------|
| Base content | `--z-base` | Page content |
| Dropdowns | `--z-dropdown` | Navbar dropdown menu |
| Sticky elements | `--z-sticky` | Sticky headers |
| Fixed elements | `--z-fixed` | Fixed navbar |
| Modal backdrop | `--z-modal-backdrop` | Dark overlay |
| Modals | `--z-modal` | Modal dialogs |
| Tooltips | `--z-tooltip` | Hover tooltips |

---

## Animations & Transitions

### Transition Timing

```css
/* Transition durations */
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 350ms;
--transition-slower: 500ms;

/* Easing functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Transitions

```css
/* Button transition */
.button {
  transition: all var(--transition-base) var(--ease-out);
}

/* Card hover */
.card {
  transition: transform var(--transition-base) var(--ease-out),
              box-shadow var(--transition-base) var(--ease-out);
}
```

### Keyframe Animations

Available in `app/styles/animations.css`:

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse glow */
@keyframes pulseGlow {
  0%, 100% { box-shadow: var(--glow-subtle); }
  50% { box-shadow: var(--glow-medium); }
}

/* Spin */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Usage

```css
.animate-fade {
  animation: fadeIn var(--transition-slow) var(--ease-out);
}

.animate-slide {
  animation: slideUp var(--transition-slow) var(--ease-out);
}

.animate-pulse {
  animation: pulseGlow 2s ease-in-out infinite;
}
```

---

## Utility Classes

These classes are available globally from `app/styles/utilities.css`.

### Glass Card

```html
<div class="glass-card">
  <!-- Content -->
</div>
```

### Glass Section

```html
<section class="glass-section">
  <!-- Full-width glass container -->
</section>
```

### Neon Button

```html
<a href="#" class="neon-button-glass">
  Schedule a Call
</a>
```

### Text Highlight

```html
<h1>
  <span class="text-highlight">Highlighted</span> Text
</h1>
```

### Gradient Text

```html
<h2 class="gradient-text">Gradient Heading</h2>
```

### Container

```html
<div class="container">
  <!-- Centered, max-width content -->
</div>
```

### Visually Hidden (Accessibility)

```html
<span class="sr-only">Screen reader only text</span>
```

---

## Icon System

RegainFlow uses **Phosphor Icons Duotone** variant for consistent visual language.

### Package

```bash
npm install react-icons
```

### Import Pattern

```typescript
import {
  PiRobotDuotone,
  PiCodeDuotone,
  PiRocketLaunchDuotone
} from 'react-icons/pi';
```

### Size Guidelines

| Context               | Size    | Example              |
| --------------------- | ------- | -------------------- |
| Feature grids & cards | 48px    | Capability showcases |
| Section headers       | 32px    | Process steps        |
| Card icons            | 20-24px | Feature cards        |
| Navigation dropdowns  | 16px    | Menu items           |
| Inline text           | 14-16px | Buttons, badges      |

### Standard Icons by Feature

```typescript
// Capability icons
const icons = {
  'AI Automation': PiRobotDuotone,
  'RAG & Search': PiMagnifyingGlassDuotone,
  'Data Validation': PiShieldCheckDuotone,
  'System Integration': PiPlugsConnectedDuotone,
  'Full-Stack Engineering': PiCodeDuotone,
  'DevOps': PiGitBranchDuotone,
};
```

### Example Usage

```tsx
import { PiRocketLaunchDuotone } from 'react-icons/pi';

function MyComponent() {
  return (
    <div className="icon-container">
      <PiRocketLaunchDuotone
        size={32}
        className="icon-glow"
      />
    </div>
  );
}
```

---

## Component Patterns

### Card with Glass Morphism

```tsx
<div className="glass-card">
  <div className="card-icon">
    <PiRobotDuotone size={48} />
  </div>
  <h3>Card Title</h3>
  <p>Card description text...</p>
</div>
```

```css
.card-icon {
  color: var(--color-primary);
  filter: drop-shadow(0 0 8px rgba(0, 214, 203, 0.5));
  margin-bottom: 1rem;
}
```

### CTA Button

```tsx
<a
  href="https://cal.com/regainflow/30min"
  className="neon-button-glass"
>
  Schedule a Call
</a>
```

### Input with Glass Effect

```css
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-base);
  color: var(--color-text-primary);
  padding: 0.75rem 1rem;
  transition: all var(--transition-base) var(--ease-out);
}

.glass-input:focus {
  border-color: rgba(0, 214, 203, 0.5);
  box-shadow: 0 0 0 3px rgba(0, 214, 203, 0.15);
  outline: none;
}

.glass-input::placeholder {
  color: var(--color-text-secondary);
}
```

### Badge / Tag

```css
.tag {
  background: var(--color-primary-alpha-15);
  border: 1px solid var(--color-primary-alpha-25);
  border-radius: var(--radius-full);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  padding: 0.25rem 0.75rem;
}
```

### Section Header

```css
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
}
```

### Divider with Glow

```css
.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-primary-alpha-50),
    transparent
  );
  margin: 2rem 0;
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Query Usage

```css
/* Base styles (mobile) */
.my-component {
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .my-component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .my-component {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
```

### Responsive Grid

```css
.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Container Widths

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}
```

---

## CSS Architecture

### File Structure

```
app/styles/
├── base.css        # CSS resets
├── variables.css   # Design tokens
├── utilities.css   # Utility classes
├── components.css  # Shared components
├── animations.css  # Keyframes
└── tailwind.css    # Tailwind utilities
```

### Load Order (in root.tsx)

1. base.css
2. tailwind.css
3. variables.css
4. utilities.css
5. components.css
6. animations.css

### Component-Specific CSS

Component CSS should be minimal and only include styles that can't be achieved with utilities:

```typescript
// In route file
import styles from '~/features/my-feature/components/my-component.css?url';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: styles }
];
```

---

## Best Practices

### DO

- Use CSS variables from `variables.css`
- Use utility classes when available
- Keep component CSS minimal
- Use semantic class names
- Add vendor prefixes for backdrop-filter (`-webkit-backdrop-filter`)
- Follow mobile-first responsive design
- Use appropriate z-index values from the scale
- Use transition variables for consistent animations

### DON'T

- Hardcode colors (use `var(--color-primary)` instead of `#00d6cb`)
- Hardcode fonts (use `var(--font-primary)`)
- Create duplicate `:root` variables in component CSS
- Use high alpha values for glows (keep 0.2-0.4)
- Mix icon libraries (stick to Phosphor Duotone)
- Use arbitrary z-index values (use the scale)
- Use `!important` unless absolutely necessary

### Example: Before & After

**Before (Bad):**
```css
.my-button {
  background: rgba(0, 214, 203, 0.15);
  color: #00d6cb;
  font-family: 'Exo 2', sans-serif;
  border-radius: 8px;
  z-index: 999;
  transition: all 0.3s ease;
}
```

**After (Good):**
```css
.my-button {
  background: var(--color-primary-alpha-15);
  color: var(--color-primary);
  font-family: var(--font-primary);
  border-radius: var(--radius-base);
  z-index: var(--z-above);
  transition: all var(--transition-base) var(--ease-out);
}
```

---

## Quick Reference

| Element       | Background                 | Blur | Border                  | Glow            |
| ------------- | -------------------------- | ---- | ----------------------- | --------------- |
| Standard card | `--glass-bg-medium`        | 20px | `--glass-border-accent` | `--glow-subtle` |
| Input field   | 5% white                   | 8px  | 10% white               | Focus: 3px ring |
| Button        | `--color-primary-alpha-15` | 8px  | `--color-primary`       | `--glow-subtle` |
| Hover state   | +5% opacity                | -    | Brighter                | `--glow-hover`  |

---

## Need Help?

- Check `app/styles/variables.css` for all available tokens
- Check `app/styles/utilities.css` for available utility classes
- Check `app/styles/animations.css` for animation keyframes
- Reference existing components in `app/features/` for patterns
- See `app/styles/components.css` for shared component styles