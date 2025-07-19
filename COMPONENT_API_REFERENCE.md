# Component API Reference

## Table of Contents
1. [UniversalNavigation](#universalnavigation)
2. [Hero](#hero)
3. [ProjectGrid](#projectgrid)
4. [Footer](#footer)
5. [Contact Page](#contact-page)
6. [Type Definitions](#type-definitions)
7. [Hooks & Utilities](#hooks--utilities)

---

## UniversalNavigation

### Overview
Responsive navigation header with sticky positioning, scroll progress indicator, and adaptive styling.

### Props
```typescript
interface UniversalNavigationProps {
  hideOnHomepage?: boolean;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideOnHomepage` | `boolean` | `true` | Whether to hide navigation on homepage route |

### State Management
```typescript
const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
const [isScrolled, setIsScrolled] = useState<boolean>(false);
const [scrollProgress, setScrollProgress] = useState<number>(0);
const [isHeaderShrunk, setIsHeaderShrunk] = useState<boolean>(false);
```

### Key Features

#### Scroll States
| Scroll Position | State Changes |
|----------------|---------------|
| `0-20px` | `isScrolled: false`, header transparent |
| `20-100px` | `isScrolled: true`, dark background applied |
| `100px+` | `isHeaderShrunk: true`, height reduces to 60px |

#### Responsive Behavior
```typescript
// Header height animation
height: isHeaderShrunk ? '60px' : '80px'

// Logo scaling
scale: isHeaderShrunk ? 0.85 : 1

// Button sizing
className={isHeaderShrunk ? 'w-10 h-10' : 'w-12 h-12'}
```

### Usage Examples

#### Basic Implementation
```tsx
// Automatic inclusion in layout
import UniversalNavigation from '@/components/UniversalNavigation';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <UniversalNavigation />
        {children}
      </body>
    </html>
  );
}
```

#### Custom Configuration
```tsx
// Show on all pages including homepage
<UniversalNavigation hideOnHomepage={false} />
```

### Accessibility Features
- **ARIA labels**: Descriptive labels for all interactive elements
- **Keyboard navigation**: Full keyboard support with Escape key handling
- **Focus management**: Proper focus return after menu closure
- **Screen reader support**: Menu state announcements

### CSS Classes
```css
/* Key utility classes used */
.z-header         /* z-index: 100 */
.z-modal          /* z-index: 1000 */
.z-overlay        /* z-index: 80 */
.dark-blur-darkest /* background: rgba(0,0,0,0.9) + backdrop-blur */
```

---

## Hero

### Overview
Full-screen hero section with image slideshow, timeline content, and responsive navigation.

### Key State
```typescript
const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
const [isScrolled, setIsScrolled] = useState<boolean>(false);
const [isScrollMenuOpen, setIsScrollMenuOpen] = useState<boolean>(false);
const [scrollProgress, setScrollProgress] = useState<number>(0);
```

### Configuration
```typescript
// Image slideshow configuration
import { heroImages, heroConfig } from '@/config/hero-images';

// Auto-advance timing
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, heroConfig.autoAdvanceInterval);
  
  return () => clearInterval(interval);
}, []);
```

### Scroll Features

#### Progress Calculation
```typescript
const handleScroll = useCallback(() => {
  const container = scrollContainerRef.current;
  const { scrollTop, scrollHeight, clientHeight } = container;
  
  // Calculate scroll progress (0-100)
  const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  setScrollProgress(Math.min(progress, 100));
}, []);
```

#### Bounce Animation
```typescript
// Bottom bounce effect
if (isBottom && !isAtBottom) {
  setIsAtBottom(true);
  container.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    container.style.transform = 'translateY(0)';
  }, 150);
}
```

### Layout Structure
```tsx
<div className="relative w-full h-screen overflow-hidden">
  {/* Background Slideshow */}
  <div className="absolute inset-0 z-0">
    <AnimatePresence mode="wait">
      <motion.div key={currentImageIndex}>
        <Image src={heroImages[currentImageIndex].src} />
      </motion.div>
    </AnimatePresence>
  </div>
  
  {/* Main Content Grid */}
  <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-3">
    {/* Left Panel - Branding */}
    <motion.div className="lg:col-span-1">
      <StudioBranding />
      <NavigationMenu />
    </motion.div>
    
    {/* Right Panel - Timeline */}
    <motion.div className="lg:col-span-2">
      <TimelineContent />
    </motion.div>
  </div>
</div>
```

### Mobile Adaptations
- **Responsive grid**: Stacks vertically on mobile
- **Touch navigation**: Optimized menu interactions  
- **Hidden scrollbars**: `hide-scrollbar` utility class
- **Gradient fades**: Top and bottom content transitions

---

## ProjectGrid

### Overview
Responsive masonry-style grid for displaying project portfolio with enhanced readability.

### Props
```typescript
interface ProjectGridProps {
  projects: Project[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  location: string;
  images: Array<{
    src: string;
    thumbnail: string;
    alt: string;
  }>;
  thumbnail: {
    src: string;
    thumbnail: string;
    alt: string;
  } | null;
  slug: string;
}
```

### Responsive Layout
```css
/* Grid configuration */
.project-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: single column */
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr); /* Large: two columns */
    gap: 2rem;
  }
}

@media (min-width: 1920px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr); /* Ultra-wide: three columns */
    gap: 3rem;
  }
}
```

### Enhanced Information Overlay

#### Previous Implementation (Cramped)
```css
.info-box-old {
  min-width: 5rem;    /* 80px */
  max-width: 8rem;    /* 128px */
  padding: 0.75rem;   /* 12px */
}
```

#### New Implementation (Readable)
```css
.info-box-new {
  min-width: 8rem;     /* 128px - Mobile */
  min-width: 10rem;    /* 160px - Tablet */
  min-width: 12rem;    /* 192px - Desktop */
  max-width: 12rem;    /* 192px - Mobile */
  max-width: 14rem;    /* 224px - Tablet */
  max-width: 16rem;    /* 256px - Desktop */
  padding: 1rem 1.25rem; /* 16px 20px */
}
```

### Animation Variants
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};
```

### Accessibility Enhancements
```tsx
<motion.article
  role="article"
  aria-labelledby={`project-${project.id}-title`}
>
  <Link
    href={`/projects/${project.slug}`}
    aria-describedby={`project-${project.id}-desc`}
    className="focus:outline-none focus:ring-2 focus:ring-white/50"
  >
    <div 
      role="img"
      aria-labelledby={`project-${project.id}-title`}
    >
      <Image
        alt={`${project.title} project thumbnail from ${project.year}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  </Link>
</motion.article>
```

---

## Footer

### Overview
Comprehensive site footer with contact information, navigation, and social links.

### Props
```typescript
interface FooterProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'project';
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `variant` | `'default' \| 'minimal' \| 'project'` | `'default'` | Footer layout variant |

### Variants

#### Default Variant
Full three-column layout with complete information:
```tsx
<footer className="dark-blur-darkest">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <StudioInformation />
    <NavigationAndLinks />
    <SocialAndNewsletter />
  </div>
</footer>
```

#### Minimal Variant
Simplified single-line footer:
```tsx
<footer className="py-8 dark-blur-darker border-t border-white/10">
  <div className="container mx-auto px-4 text-center">
    <p className="text-white/60 text-sm font-light">
      © {currentYear} TALAAT STUDIO. All rights reserved.
    </p>
  </div>
</footer>
```

### Content Structure

#### Column 1: Studio Information
```tsx
<div className="space-y-6">
  <div>
    <h3>TALAAT STUDIO</h3>
    <p>Studio description...</p>
  </div>
  <ContactInfo />
</div>
```

#### Column 2: Navigation
```tsx
<div className="grid grid-cols-2 gap-8">
  <NavigationLinks />
  <QuickLinks />
</div>
```

#### Column 3: Social & Newsletter
```tsx
<div className="space-y-8">
  <SocialLinks />
  <NewsletterSignup />
</div>
```

### Social Links Configuration
```typescript
const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: <InstagramIcon />
  },
  {
    name: 'LinkedIn', 
    href: '#',
    icon: <LinkedInIcon />
  },
  {
    name: 'Email',
    href: 'mailto:info@talaatstudio.com',
    icon: <EmailIcon />
  }
];
```

---

## Contact Page

### Overview
Hero-inspired contact page with comprehensive project inquiry form and contact information.

### State Management
```typescript
interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const [formData, setFormData] = useState<FormData>(initialFormData);
const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
const [errors, setErrors] = useState<Record<string, string>>({});
```

### Form Validation

#### Validation Rules
```typescript
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};
  
  // Required field validation
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  
  // Message validation
  if (!formData.message.trim()) {
    newErrors.message = 'Message is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

#### Real-time Error Clearing
```typescript
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  
  // Update form data
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
};
```

### Form Fields

#### Text Inputs
```tsx
<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleInputChange}
  className={`
    w-full px-4 py-3 
    bg-white/5 border rounded-md 
    text-white placeholder-white/40 
    focus:outline-none focus:ring-2 focus:ring-white/50
    ${errors.name ? 'border-red-500/50' : 'border-white/20'}
  `}
  placeholder="Your full name"
/>
```

#### Select Inputs
```tsx
<select
  name="projectType"
  value={formData.projectType}
  onChange={handleInputChange}
  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md"
>
  <option value="" className="bg-gray-800">Select project type</option>
  <option value="residential" className="bg-gray-800">Residential</option>
  <option value="commercial" className="bg-gray-800">Commercial</option>
  <option value="renovation" className="bg-gray-800">Renovation</option>
  <option value="consultation" className="bg-gray-800">Consultation</option>
  <option value="other" className="bg-gray-800">Other</option>
</select>
```

### Contact Information Display
```typescript
const contactInfo = [
  {
    label: 'Email',
    value: 'info@talaatstudio.com',
    href: 'mailto:info@talaatstudio.com',
    icon: <EmailIcon />
  },
  {
    label: 'Phone',
    value: '(123) 456-7890',
    href: 'tel:+1234567890',
    icon: <PhoneIcon />
  },
  {
    label: 'Office',
    value: '123 Architecture Lane\nDesign District, NY 10001',
    href: 'https://maps.google.com',
    icon: <LocationIcon />
  }
];
```

### Submission Handling
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  setSubmitStatus('idle');
  
  try {
    // API call would go here
    const response = await submitForm(formData);
    
    if (response.ok) {
      setSubmitStatus('success');
      resetForm();
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Type Definitions

### Core Types
```typescript
// Project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'unbuilt';
  year: number;
  location: string;
  images: ProjectImage[];
  thumbnail: ProjectImage | null;
  slug: string;
}

interface ProjectImage {
  src: string;
  thumbnail: string;
  alt: string;
}

// Navigation menu item
interface MenuItem {
  name: string;
  href: string;
  description?: string;
}

// Contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

// Hero configuration
interface HeroConfig {
  autoAdvanceInterval: number;
  transitionDuration: number;
  pauseOnHover?: boolean;
}

interface HeroImage {
  src: string;
  alt: string;
}
```

### Component Props
```typescript
// Reusable component props
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface AnimatedComponentProps extends BaseComponentProps {
  initial?: object;
  animate?: object;
  transition?: object;
  delay?: number;
}

interface ResponsiveComponentProps extends BaseComponentProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  variant?: string;
}
```

---

## Hooks & Utilities

### Custom Hooks

#### useScrollPosition
```typescript
function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return { scrollPosition, scrollDirection };
}
```

#### useMediaQuery
```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
}

// Usage examples
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');
```

#### useFormValidation
```typescript
function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  
  const validateField = (name: keyof T, value: any): boolean => {
    const rule = validationRules[name];
    const error = rule ? rule(value) : null;
    
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
    
    return !error;
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isValid = true;
    
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key as keyof T](formData[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const updateField = (name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };
  
  const resetForm = () => {
    setFormData(initialData);
    setErrors({} as Record<keyof T, string>);
  };
  
  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    isValid: Object.values(errors).every(error => !error)
  };
}
```

### Utility Functions

#### Responsive Helpers
```typescript
// Breakpoint utilities
export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920
} as const;

export function getBreakpoint(width: number): keyof typeof breakpoints {
  if (width >= breakpoints['3xl']) return '3xl';
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

export function isMobile(width: number): boolean {
  return width < breakpoints.md;
}

export function isTablet(width: number): boolean {
  return width >= breakpoints.md && width < breakpoints.lg;
}

export function isDesktop(width: number): boolean {
  return width >= breakpoints.lg;
}
```

#### Animation Helpers
```typescript
// Common animation variants
export const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const slideInVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

// Transition configurations
export const transitions = {
  smooth: { duration: 0.6, ease: "easeOut" },
  quick: { duration: 0.3, ease: "easeOut" },
  slow: { duration: 1.0, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 100, damping: 10 }
};
```

#### Form Helpers
```typescript
// Validation functions
export const validationRules = {
  required: (value: string) => 
    !value.trim() ? 'This field is required' : null,
    
  email: (value: string) => {
    if (!value.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
    return null;
  },
  
  phone: (value: string) => {
    if (!value.trim()) return null; // Optional field
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) return 'Phone format: (123) 456-7890';
    return null;
  },
  
  minLength: (min: number) => (value: string) =>
    value.length < min ? `Minimum ${min} characters required` : null,
    
  maxLength: (max: number) => (value: string) =>
    value.length > max ? `Maximum ${max} characters allowed` : null
};

// Format utilities
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  } else if (digits.length >= 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return digits;
}

export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, char => char.toUpperCase());
}
```

---

*This API reference provides detailed technical specifications for all components in the TALAAT STUDIO mobile optimization implementation. Use this documentation for component integration, customization, and extension.*