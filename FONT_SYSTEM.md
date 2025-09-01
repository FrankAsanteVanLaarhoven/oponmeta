# OponMeta LMS Global Font System

## Overview

This document outlines the comprehensive global font system implemented across the entire OponMeta LMS platform. The system ensures consistent typography, branding, and readability across all pages, components, and routes.

## Font Families

### Primary Fonts
- **Montserrat**: Used for headings, hero text, navigation, and buttons
- **Open Sans**: Used for body text, paragraphs, and general content
- **Roboto**: Used for footer text, small text, and as a fallback

### Font Hierarchy

#### Headings (Montserrat)
- **H1/Hero**: 3.5rem (56px) - Bold (700) - Used for main page titles
- **H2**: 2.5rem (40px) - Bold (700) - Used for section headers
- **H3**: 2rem (32px) - Semi-bold (600) - Used for subsection headers
- **H4**: 1.5rem (24px) - Semi-bold (600) - Used for card titles
- **H5**: 1.25rem (20px) - Semi-bold (600) - Used for small headers
- **H6**: 1.125rem (18px) - Semi-bold (600) - Used for micro headers

#### Body Text (Open Sans)
- **Body Large**: 1.25rem (20px) - Regular (400) - Used for important content
- **Body**: 1.125rem (18px) - Regular (400) - Default body text
- **Small/Caption**: 0.875rem (14px) - Regular (400) - Used for metadata

#### Interactive Elements (Montserrat)
- **Buttons**: Semi-bold (600) with letter-spacing for better readability
- **Navigation**: Medium (500) with letter-spacing for clear hierarchy

## Implementation

### CSS Classes

The system provides semantic CSS classes that automatically apply the correct fonts:

```css
/* Heading classes */
.hero-title, .text-hero          /* H1 styling */
.text-heading-2                   /* H2 styling */
.text-heading-3                   /* H3 styling */
.text-heading-4                   /* H4 styling */
.text-heading-5                   /* H5 styling */
.text-heading-6                   /* H6 styling */

/* Body text classes */
.text-body                        /* Default body text */
.text-body-large                  /* Large body text */
.text-caption                     /* Small text/captions */

/* Element-specific classes */
.text-button                      /* Button text styling */
.text-nav                         /* Navigation text styling */
.text-footer                      /* Footer text styling */
.text-link                        /* Link text styling */
.text-code                        /* Code/monospace text */
```

### Tailwind CSS Classes

The system is also integrated with Tailwind CSS for convenience:

```jsx
// Font families
font-montserrat    // Montserrat font
font-open-sans     // Open Sans font
font-roboto        // Roboto font
font-hero          // Hero text (Montserrat)
font-body          // Body text (Open Sans)
font-nav           // Navigation (Montserrat)
font-button        // Button text (Montserrat)
font-footer        // Footer text (Roboto)

// Font sizes
text-hero          // 3.5rem (56px)
text-heading-2     // 2.5rem (40px)
text-heading-3     // 2rem (32px)
text-heading-4     // 1.5rem (24px)
text-heading-5     // 1.25rem (20px)
text-heading-6     // 1.125rem (18px)
text-body          // 1.125rem (18px)
text-body-large    // 1.25rem (20px)
text-caption       // 0.875rem (14px)
```

## Usage Examples

### React Components

```jsx
// Hero section with proper typography
<div className="text-center">
  <h1 className="hero-title text-white mb-4">
    Welcome to OponMeta
  </h1>
  <p className="text-body text-white/90">
    Your gateway to world-class education and professional development
  </p>
</div>

// Card with consistent typography
<div className="bg-white rounded-lg p-6">
  <h3 className="text-heading-4 text-gray-900 mb-2">
    Course Title
  </h3>
  <p className="text-body text-gray-600 mb-4">
    Course description with proper body text styling
  </p>
  <button className="font-button bg-blue-600 text-white px-4 py-2 rounded">
    Enroll Now
  </button>
</div>

// Navigation with proper font
<nav className="font-nav">
  <a href="/courses" className="text-gray-700 hover:text-blue-600">
    Browse Courses
  </a>
</nav>
```

### CSS Implementation

```css
/* Using semantic classes */
.hero-section h1 {
  @apply hero-title text-white;
}

.course-card h3 {
  @apply text-heading-4 text-gray-900;
}

.course-description {
  @apply text-body text-gray-600;
}

.action-button {
  @apply font-button bg-blue-600 text-white;
}
```

## Responsive Design

The font system automatically adjusts for different screen sizes:

- **Desktop**: Full font sizes as specified
- **Tablet (≤768px)**: Reduced heading sizes for better mobile experience
- **Mobile (≤480px)**: Further optimized sizes for small screens

## Theme Integration

The font system works seamlessly with the existing theme system:

- **Light Theme**: Dark text on light backgrounds
- **Dark Theme**: Light text on dark backgrounds
- **Color Variables**: Uses CSS custom properties for consistent theming

## Best Practices

### Do's
- ✅ Use semantic HTML elements (h1, h2, h3, etc.)
- ✅ Apply appropriate CSS classes for consistent styling
- ✅ Use Tailwind classes for quick prototyping
- ✅ Maintain proper heading hierarchy (h1 → h2 → h3)
- ✅ Test readability across different screen sizes

### Don'ts
- ❌ Don't override font families in individual components
- ❌ Don't use inline styles for typography
- ❌ Don't skip heading levels in the hierarchy
- ❌ Don't use overly specific selectors that break the cascade

## Accessibility

The font system includes several accessibility features:

- **High Contrast**: Proper color contrast ratios
- **Readable Sizes**: Minimum 16px base font size
- **Clear Hierarchy**: Distinct visual differences between heading levels
- **Screen Reader Friendly**: Semantic HTML structure
- **Scalable**: Font sizes use rem units for user preference respect

## Performance

- **Google Fonts**: Optimized loading with display=swap
- **Font Display**: Prevents layout shifts during font loading
- **Fallbacks**: Multiple fallback fonts ensure text is always visible
- **CSS Variables**: Efficient theming without duplication

## Troubleshooting

### Font Not Loading
1. Check internet connection for Google Fonts
2. Verify CSS import is in the correct location
3. Check browser console for errors

### Inconsistent Styling
1. Ensure CSS classes are applied correctly
2. Check for conflicting Tailwind classes
3. Verify component-specific overrides aren't interfering

### Theme Issues
1. Check CSS custom properties are defined
2. Verify theme context is properly set up
3. Ensure dark mode classes are applied correctly

## Future Enhancements

- **Variable Fonts**: Support for modern variable font technology
- **Custom Font Loading**: Optimized font loading strategies
- **Typography Scale**: More granular font size options
- **Component Library**: Pre-built typography components

## Support

For questions or issues with the font system:
1. Check this documentation first
2. Review the CSS implementation in `src/index.css`
3. Check Tailwind configuration in `tailwind.config.js`
4. Consult the design team for brand consistency questions
