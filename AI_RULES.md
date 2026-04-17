# AI Rules for Mozambique Government Entrepreneurship Portal

## Tech Stack

- **React 19.2.3** - Main UI framework for building the application
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS 4.1.17** - Utility-first CSS framework for styling
- **Framer Motion 12.38.0** - Animation library for smooth transitions and interactions
- **Lucide React 1.7.0** - Icon library for consistent UI icons
- **Vite 7.2.4** - Build tool and development server
- **React Router** - Client-side routing (keep routes in src/App.tsx)
- **shadcn/ui** - Pre-built UI components (already installed, use when appropriate)

## Library Usage Rules

### UI Components
- **Use shadcn/ui components** when available for consistent government styling
- **Use Tailwind CSS classes** for all custom styling and layouts
- **Use Lucide React icons** for all icon needs
- **Create custom components** in `src/components/` folder when shadcn/ui doesn't have what you need

### Styling
- **Always use Tailwind CSS** - no custom CSS files unless absolutely necessary
- **Use the government color scheme**: `#005a32` (primary green), `#FFD700` (gold/yellow), and neutral grays
- **Make all designs responsive** - use responsive Tailwind classes
- **Follow the existing design patterns** in the app for consistency

### Animation
- **Use Framer Motion** for all animations and transitions
- **AnimatePresence** for component entering/exiting animations
- **motion.div** for individual element animations
- **Keep animations subtle and professional** - this is a government portal

### State Management
- **Use React useState** for local component state
- **Use React useEffect** for side effects and data fetching
- **Consider React Context** only for global state that affects multiple components
- **Avoid complex state management libraries** unless specifically requested

### Routing
- **Keep all routes in src/App.tsx**
- **Use React Router** for navigation between pages
- **Create pages in src/pages/ folder**
- **Use lazy loading** for page components to improve performance

### File Organization
- **Components go in src/components/**
- **Pages go in src/pages/**
- **Utilities go in src/utils/**
- **Keep files focused and small** - aim for under 100 lines per component
- **Use descriptive file names** - use PascalCase for components, camelCase for utilities

### Code Quality
- **Use TypeScript** for all new code
- **Follow existing code patterns** in the codebase
- **Write clean, readable code** with proper indentation and spacing
- **Add comments** for complex business logic
- **Test components** when adding new functionality

### Performance
- **Use React.memo** for expensive components that don't change often
- **Use useCallback/useMemo** for expensive calculations
- **Optimize images** and use appropriate formats
- **Minimize re-renders** by keeping component trees shallow

### Accessibility
- **Use semantic HTML** elements
- **Add proper ARIA labels** for interactive elements
- **Ensure keyboard navigation** works
- **Provide good color contrast** for text readability
- **Test with screen readers** when possible