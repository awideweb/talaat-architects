# Hero Image Configuration Guide

## Overview

The hero section uses a simple configuration file system that allows you to easily change the background images, timing, and settings without touching any code.

## Configuration File

Edit the file: `frontend/src/config/hero-images.ts`

## Adding/Changing Images

### 1. Update the heroImages array:

```typescript
export const heroImages: HeroImage[] = [
  {
    src: '/projects/your-project/image1.jpg',
    alt: 'Descriptive alt text',
    caption: 'Optional caption text'
  },
  {
    src: '/projects/your-project/image2.jpg',
    alt: 'Another description',
    caption: 'Another caption'
  }
  // Add more images as needed
];
```

### 2. Image Requirements:

- **Format**: JPG, PNG, or WebP
- **Size**: Minimum 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9 recommended for best results
- **Location**: Place images in `frontend/public/projects/[project-name]/`

### 3. Configuration Options:

```typescript
export const heroConfig = {
  autoAdvanceInterval: 5000,    // Time between slides (milliseconds)
  transitionDuration: 1500,     // Fade transition speed (milliseconds)
  showDots: true,              // Show navigation dots
  showScrollIndicator: true,    // Show scroll indicator
  overlayOpacity: 0.4          // Dark overlay opacity (0-1)
};
```

## Configuration Options Explained

### `autoAdvanceInterval`
- **Default**: 5000 (5 seconds)
- **Range**: 3000-10000 recommended
- **Purpose**: How long each image displays before automatically advancing

### `transitionDuration`
- **Default**: 1500 (1.5 seconds)
- **Range**: 500-3000 recommended
- **Purpose**: Speed of the fade transition between images

### `showDots`
- **Default**: true
- **Options**: true/false
- **Purpose**: Show/hide the navigation dots at the bottom

### `showScrollIndicator`
- **Default**: true
- **Options**: true/false
- **Purpose**: Show/hide the scroll indicator in bottom-right

### `overlayOpacity`
- **Default**: 0.4
- **Range**: 0-1 (0 = transparent, 1 = black)
- **Purpose**: Darkness of overlay to ensure text readability

## Quick Start Examples

### Example 1: Fast-changing slideshow
```typescript
export const heroConfig = {
  autoAdvanceInterval: 3000,  // 3 seconds
  transitionDuration: 800,    // 0.8 seconds
  showDots: true,
  showScrollIndicator: true,
  overlayOpacity: 0.5
};
```

### Example 2: Slow, elegant transitions
```typescript
export const heroConfig = {
  autoAdvanceInterval: 8000,  // 8 seconds
  transitionDuration: 2000,   // 2 seconds
  showDots: false,
  showScrollIndicator: true,
  overlayOpacity: 0.3
};
```

### Example 3: Minimal, clean look
```typescript
export const heroConfig = {
  autoAdvanceInterval: 6000,
  transitionDuration: 1000,
  showDots: false,
  showScrollIndicator: false,
  overlayOpacity: 0.2
};
```

## Adding New Images

1. **Copy image files** to `frontend/public/projects/[project-name]/`
2. **Edit the config file** at `frontend/src/config/hero-images.ts`
3. **Add new entries** to the `heroImages` array
4. **Save the file** - changes will appear immediately in development
5. **Rebuild** for production: `npm run build`

## Best Practices

- **Use high-quality images** that represent your best work
- **Keep consistent lighting** across images for smooth transitions
- **Test on mobile devices** to ensure images look good on all sizes
- **Limit to 5-7 images** for optimal user experience
- **Use descriptive alt text** for accessibility

## Troubleshooting

### Images not loading?
- Check file paths are correct
- Ensure images are in the `public` folder
- Verify file extensions match the config

### Transitions too fast/slow?
- Adjust `autoAdvanceInterval` for timing between images
- Adjust `transitionDuration` for fade speed

### Text hard to read?
- Increase `overlayOpacity` for darker background
- Choose images with less busy backgrounds

## File Structure

```
frontend/
├── public/
│   └── projects/
│       └── [project-name]/
│           ├── image1.jpg
│           ├── image2.jpg
│           └── ...
├── src/
│   ├── config/
│   │   └── hero-images.ts    # ← Edit this file
│   └── components/
│       └── Hero.tsx          # ← Uses the config
```