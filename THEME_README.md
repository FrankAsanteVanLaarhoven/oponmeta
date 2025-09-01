# OponMeta Theme System

This document explains how to use the comprehensive theme system implemented in your OponMeta application.

## 🎨 Features

- **Three Theme Modes**: Light, Dark, and Auto (follows system preference)
- **Persistent Storage**: Theme preference is saved in localStorage
- **System Integration**: Auto theme automatically follows OS theme changes
- **Smooth Transitions**: All theme changes are animated
- **CSS Variables**: Uses CSS custom properties for consistent theming
- **Tailwind Integration**: Works seamlessly with Tailwind's dark: variants

## 🚀 Quick Start

### 1. Using the Theme Toggle

The theme toggle is now available in your navigation bar. Click on it to:
- Switch between Light, Dark, and Auto themes
- See the current active theme
- Access theme descriptions

### 2. Testing the Theme System

Visit `/theme-demo` to see a comprehensive demonstration of the theme system.

## 🛠️ For Developers

### Using the Theme Context

```tsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Is dark mode: {isDark ? 'Yes' : 'No'}</p>
      <button onClick={() => setTheme('dark')}>Switch to Dark</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

### Using Theme-Aware Colors

```tsx
import { useThemeColors } from '../hooks/useThemeColors';

const MyComponent = () => {
  const colors = useThemeColors();
  
  return (
    <div className={`${colors.bg.primary} ${colors.text.primary}`}>
      <h1 className={colors.text.primary}>Title</h1>
      <p className={colors.text.secondary}>Description</p>
      <button className={colors.button.primary}>Click me</button>
    </div>
  );
};
```

### CSS Variables

The theme system provides CSS variables that you can use in your CSS:

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}
```

### Tailwind Dark Mode

Use Tailwind's `dark:` prefix for dark mode variants:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  This will automatically adapt to the current theme
</div>
```

## 🎯 Theme Colors

### Light Theme
- **Primary Background**: `#ffffff`
- **Secondary Background**: `#f6f9fc`
- **Primary Text**: `#1a202c`
- **Secondary Text**: `#4a5568`

### Dark Theme
- **Primary Background**: `#0f172a`
- **Secondary Background**: `#1e293b`
- **Primary Text**: `#f1f5f9`
- **Secondary Text**: `#cbd5e0`

### Brand Colors (Both Themes)
- **Primary Blue**: `#0a174e`
- **Secondary Blue**: `#1a2a6b`
- **Accent Gold**: `#FFD700`

## 📱 Responsive Design

The theme toggle is available in both desktop and mobile navigation:
- **Desktop**: Located in the top navigation bar
- **Mobile**: Available in the mobile menu

## 🔧 Customization

### Adding New Theme Colors

1. Update `src/context/ThemeContext.tsx` to include new theme logic
2. Add CSS variables in `src/index.css`
3. Update `src/hooks/useThemeColors.ts` for easy access

### Custom Theme Variants

You can extend the theme system by adding more variants:

```tsx
// In ThemeContext.tsx
export type Theme = 'light' | 'dark' | 'auto' | 'custom';

// Add your custom theme logic
```

## 🐛 Troubleshooting

### Theme Not Persisting
- Check if localStorage is enabled in the browser
- Verify the ThemeProvider is wrapping your App component

### Dark Mode Not Working
- Ensure `darkMode: 'class'` is set in `tailwind.config.js`
- Check that CSS variables are properly defined

### Styling Issues
- Use the `useThemeColors` hook for consistent theming
- Prefer CSS variables over hardcoded colors
- Test both light and dark themes

## 📚 Examples

### Card Component with Theme
```tsx
const ThemedCard = ({ title, content }) => {
  const colors = useThemeColors();
  
  return (
    <div className={`${colors.bg.card} ${colors.border.primary} border rounded-lg p-4`}>
      <h3 className={`${colors.text.primary} font-bold mb-2`}>{title}</h3>
      <p className={colors.text.secondary}>{content}</p>
    </div>
  );
};
```

### Button with Theme
```tsx
const ThemedButton = ({ children, variant = 'primary' }) => {
  const colors = useThemeColors();
  
  return (
    <button className={`px-4 py-2 rounded-lg transition-colors ${colors.button[variant]}`}>
      {children}
    </button>
  );
};
```

## 🔄 Migration Guide

If you're updating existing components to use the theme system:

1. **Replace hardcoded colors** with theme-aware alternatives
2. **Use the `useThemeColors` hook** for consistent theming
3. **Add `dark:` variants** to Tailwind classes where appropriate
4. **Test both themes** to ensure proper contrast and readability

## 📞 Support

For questions or issues with the theme system:
1. Check this README first
2. Review the `/theme-demo` page
3. Examine the example components
4. Check the browser console for errors

---

**Happy Theming! 🎨✨**
