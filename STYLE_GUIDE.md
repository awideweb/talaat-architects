# TALAAT STUDIO Style Guide Documentation

## Overview

The TALAAT STUDIO design system is built on a foundation of minimalism, architectural precision, and sophisticated user experience. This document outlines the complete visual language, component system, and styling patterns used throughout the portfolio website.

## Design Philosophy

- **Minimalist Architecture**: Clean lines, generous whitespace, and purposeful simplicity
- **Typography-First**: Strong typographic hierarchy with light, sophisticated fonts
- **Contextual Blending**: Dark blur overlays that allow content to coexist with imagery
- **Mobile-First**: Responsive design prioritizing touch interaction and mobile experience
- **Accessibility-Focused**: WCAG 2.1 AA compliance with proper semantic markup

## Typography System

### Font Stack
- Primary: `Arial, Helvetica, sans-serif` (with planned upgrade to Urbanist)
- Weight: Primarily `font-light` (300) for sophisticated appearance
- Tracking: `tracking-wide` and `tracking-wider` for refined letter spacing

### Type Scale

| Name | Class | Usage |
|------|-------|-------|
| Display Large | `text-6xl font-light` | Hero titles, main branding |
| Display Medium | `text-5xl font-light` | Section heroes |
| Display Small | `text-4xl font-light` | Page heroes |
| Heading 1 | `text-3xl font-light uppercase tracking-wide` | Main page headings |
| Heading 2 | `text-2xl font-light tracking-wider` | Section headings |
| Heading 3 | `text-xl font-light tracking-wide` | Subsection headings |
| Heading 4 | `text-lg font-light tracking-wide` | Minor headings |
| Body Large | `text-lg leading-relaxed` | Introductory paragraphs |
| Body Medium | `text-base leading-relaxed` | Standard body text |
| Body Small | `text-sm leading-relaxed` | Secondary text |
| Caption | `text-xs uppercase tracking-wide font-light` | Labels, categories |

### Color Usage in Typography

- **Light Mode**: `text-gray-900` (primary), `text-gray-500` (headings), `text-gray-400` (secondary)
- **Dark Mode**: `text-white` (primary), `text-white/80` (secondary), `text-white/60` (captions)

## Color System

### Primary Grayscale
```css
gray-900: #111827  /* Primary dark backgrounds, text */
gray-800: #1f2937  /* Secondary dark backgrounds */
gray-700: #374151  /* Tertiary backgrounds */
gray-600: #4b5563  /* Disabled states */
gray-500: #6b7280  /* Heading text, borders */
gray-400: #9ca3af  /* Secondary text */
gray-300: #d1d5db  /* Light borders */
gray-200: #e5e7eb  /* Light backgrounds */
gray-100: #f3f4f6  /* Subtle backgrounds */
gray-50:  #f9fafb  /* Lightest backgrounds */
```

### Backdrop Blur Colors
```css
--blur-dark:    rgba(0, 0, 0, 0.7)   /* bg-black/70 */
--blur-darker:  rgba(0, 0, 0, 0.8)   /* bg-black/80 */
--blur-darkest: rgba(0, 0, 0, 0.9)   /* bg-black/90 */
--blur-light:   rgba(255, 255, 255, 0.1)  /* bg-white/10 */
--blur-lighter: rgba(255, 255, 255, 0.2)  /* bg-white/20 */
```

### Semantic Colors
```css
--background: #ffffff (light) / #0a0a0a (dark)
--foreground: #171717 (light) / #ededed (dark)
```

## Button Component System

### Variants

#### Primary Button
- **Style**: `bg-gray-900 text-white hover:bg-gray-800`
- **Usage**: Main CTAs, form submissions
- **Context**: Light backgrounds, primary actions

#### Secondary Button  
- **Style**: `bg-white text-gray-900 border border-gray-200 hover:bg-gray-50`
- **Usage**: Secondary actions, alternative choices
- **Context**: Light backgrounds, supporting actions

#### Ghost Button
- **Style**: `bg-transparent text-white hover:bg-white/10`
- **Usage**: Overlay actions, minimal UI
- **Context**: Dark backgrounds, image overlays

#### Outline Button
- **Style**: `bg-transparent border border-white/30 text-white hover:bg-white/10`
- **Usage**: Secondary actions on dark backgrounds
- **Context**: Dark overlays, modal dialogs

#### Glass Button
- **Style**: `bg-black/20 backdrop-blur-[2px] text-white border border-white/10`
- **Usage**: Navigation elements, floating UI
- **Context**: Over images, hero sections

#### Minimal Button
- **Style**: `bg-transparent text-white/80 hover:text-white`
- **Usage**: Subtle interactions, inline actions
- **Context**: Navigation, utility actions

### Sizes

| Size | Padding | Height | Text Size | Border Radius |
|------|---------|--------|-----------|---------------|
| sm   | `px-4 py-2` | `36px` | `text-sm` | `rounded-md` |
| md   | `px-6 py-3` | `44px` | `text-sm` | `rounded-md` |
| lg   | `px-8 py-4` | `48px` | `text-base` | `rounded-lg` |
| xl   | `px-10 py-5` | `56px` | `text-lg` | `rounded-lg` |

### States
- **Default**: Base styling with smooth transitions
- **Hover**: Scale transform (1.02) + color changes
- **Focus**: Ring outline for accessibility
- **Active**: Scale transform (0.98)
- **Disabled**: 50% opacity, no interactions
- **Loading**: Spinner overlay, content hidden

## Layout Patterns

### Grid Systems

#### Project Grid (2-Column)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Project cards */}
</div>
```

#### Footer (3-Column)
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Contact, Navigation, Social */}
</div>
```

### Spacing Scale
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)  
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)
- **4xl**: `5rem` (80px)

### Container Patterns
- **Max Width**: `max-w-7xl mx-auto` (1280px centered)
- **Padding**: `px-4 sm:px-6 lg:px-8` (responsive horizontal padding)
- **Section Spacing**: `py-20` (80px vertical)
- **Component Spacing**: `space-y-16` (64px between sections)

## Backdrop Blur System

### CSS Classes
```css
.dark-blur        { background: var(--blur-dark); backdrop-filter: blur(8px); }
.dark-blur-darker { background: var(--blur-darker); backdrop-filter: blur(12px); }
.dark-blur-darkest{ background: var(--blur-darkest); backdrop-filter: blur(16px); }
```

### Usage Contexts
- **Navigation Headers**: `dark-blur-darkest` for maximum contrast
- **Modal Overlays**: `dark-blur-darker` for content separation  
- **Card Overlays**: `dark-blur` for subtle content blending
- **Input Fields**: `bg-black/20 backdrop-blur-[2px]` for form elements

## Animation Patterns

### Micro-Interactions
- **Button Hover**: `scale: 1.02` (200ms ease)
- **Button Active**: `scale: 0.98` (200ms ease)
- **Focus Ring**: `ring-2 ring-white/50` with offset

### Page Transitions
- **Fade In**: `opacity: 0 → 1` (800ms ease)
- **Slide Up**: `y: 20px → 0` + opacity (600ms ease)
- **Staggered**: 100-200ms delays between elements

### Header Behavior
- **Shrink**: `height: 80px → 60px` (300ms ease-out)
- **Backdrop**: Blur intensity increases with scroll
- **Progress Bar**: `scaleX` based on scroll position

## Responsive Breakpoints

```javascript
screens: {
  'xs': '375px',   // Small mobile
  'sm': '640px',   // Large mobile  
  'md': '768px',   // Tablets
  'lg': '1024px',  // Small laptops
  'xl': '1280px',  // Large laptops
  '2xl': '1536px', // Large desktops
  '3xl': '1920px', // Ultra-wide
}
```

## Accessibility Features

### Focus Management
- **Visible Focus**: High-contrast ring indicators
- **Skip Links**: Hidden until focused, jump to main content
- **Focus Trapping**: Modal and navigation containment
- **Keyboard Navigation**: Full keyboard accessibility

### Semantic HTML
- **Proper Headings**: h1-h6 hierarchy maintained
- **ARIA Labels**: Comprehensive labeling for screen readers
- **Landmark Roles**: `main`, `navigation`, `banner`, `contentinfo`
- **Alt Text**: Descriptive image alternatives

### Color Contrast
- **AA Compliance**: 4.5:1 ratio for normal text
- **AAA Compliance**: 7:1 ratio for enhanced accessibility
- **Focus Indicators**: High contrast ring outlines

## Development Guidelines

### CSS Architecture
- **Tailwind CSS v4**: Utility-first approach
- **Custom Properties**: CSS variables for theming
- **Mobile-First**: All styles start from mobile breakpoint
- **Component Variants**: TypeScript-enforced prop interfaces

### File Structure
```
src/
├── components/
│   ├── Button.tsx           # Complete button system
│   ├── Navigation.tsx       # Header navigation
│   ├── UniversalNavigation.tsx  # Unified header
│   └── index.ts            # Barrel exports
├── app/
│   ├── styles/page.tsx     # Style guide showcase
│   └── globals.css         # Global styles & utilities
└── config/
    └── tailwind.config.js  # Design system configuration
```

### Performance Considerations
- **Framer Motion**: Selective animations, reduced motion support
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Dynamic imports for non-critical components
- **Bundle Analysis**: Regular size monitoring and optimization

## Usage Examples

### Page Header Pattern
```tsx
<motion.header className="text-center mb-16">
  <h1 className="text-3xl font-light text-gray-500 uppercase tracking-wide mb-6">
    SECTION TITLE
  </h1>
  <p className="text-lg text-gray-400 max-w-2xl mx-auto">
    Supporting description text.
  </p>
</motion.header>
```

### Glass Panel Pattern
```tsx
<div className="bg-black/50 backdrop-blur-[4px] p-6 rounded-md border border-white/10 shadow-2xl">
  {/* Content */}
</div>
```

### Button Usage
```tsx
<PrimaryButton size="lg" href="/contact">
  Get In Touch
</PrimaryButton>

<GlassButton variant="outline" icon={<Icon />}>
  Learn More
</GlassButton>
```

## Style Guide Access

The complete interactive style guide is available at `/styles` and includes:
- Live component demonstrations
- Interactive dark/light mode toggle
- Typography scale examples
- Color palette visualization
- Button variant showcase
- Layout pattern examples
- Animation demonstrations

This page is hidden from navigation but can be accessed directly for development reference and design review.
