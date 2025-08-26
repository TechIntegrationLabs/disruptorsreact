# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a React website for Disruptors Media, built as a Create React App (CRA) project:
- Main React app is located in the `public/` directory
- Built production assets are in the root directory and `static/` folder
- The working directory for development is `/public/`

## Development Commands

**Navigate to the React app directory first:**
```bash
cd public/
```

### Core Commands
- **Start development server**: `npm start` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Eject from CRA**: `npm run eject` (one-way operation - avoid unless necessary)

### Testing
- Uses standard Create React App testing setup with Jest and React Testing Library
- Test files follow `*.test.js` naming convention
- Run `npm test` for interactive test runner

## Architecture Overview

### React App Structure
The application uses a page-based component architecture with React Router v6:

**Core Application Components:**
- `App.js` - Main application with routing, loading states, and API integration
- `header.js` - Navigation component with API-driven menu data
- `footer.js` - Footer component
- `Analytics.js` - Handles Google Analytics and Search Console script injection

**Page Components:**
- `Home.js` - Homepage
- `about.js` - About page
- `work.js` - Work portfolio page
- `case-study.js` - Dynamic case study pages (route: `/work/:slug`)
- `services.js` - Services page
- `contact.js` - Contact page
- `gallery.js` - Gallery page
- `podcast.js` - Podcast page
- `faq.js` - FAQ page
- `privacy.js` / `terms.js` - Legal pages
- `Notfound.js` - 404 page

**Specialized Components:**
- `TypeformComponent.js` - Typeform integration
- `WhatWeDoSlider.js` / `WhatWeDoSliderBtm.js` - Content sliders
- `WorksSlickSlider.js` - Work portfolio slider using React Slick
- `SwipeSlider.js` - Touch/swipe functionality
- `MasonryComponent.js` - Masonry grid layout

### Key Features
- **Smooth Scrolling**: Uses `@studio-freight/react-lenis` for smooth scroll behavior
- **Animations**: GSAP (GreenSock) integration for animations with business license
- **Loading Screen**: Cookie-based loading screen with animated counter (0-100%)
- **API Integration**: Fetches header data, menu items, and analytics from backend API
- **Dynamic Content**: Header logo and menu items are API-driven

### Environment Configuration
- **Backend API**: Set `REACT_APP_BASE_URL` environment variable for API endpoint
- **Analytics**: Google Analytics and Search Console scripts loaded dynamically via API
- **State Management**: Uses React hooks and cookies for session state

### Route Structure
- `/` - Home page
- `/about` - About page
- `/work` - Work portfolio listing
- `/work/:slug` - Individual case studies
- `/services` - Services page
- `/contact` - Contact page
- `/gallery` - Gallery page
- `/podcast` - Podcast page
- `/faq` - FAQ page
- `/privacy-policy` - Privacy policy
- `/terms-conditions` - Terms and conditions

### Asset Organization
- **Fonts**: Custom fonts (OT Neue Montreal, PP Supply Mono) in `/fonts/`
- **Images**: Static images in `/images/`
- **Videos**: Video assets in `/video/` (background videos, gallery content)
- **CSS**: Bootstrap + custom styling in `/css/`

## Key Dependencies

### Core Framework
- **React 18.2.0** - Core framework
- **React Router DOM 6.21.2** - Client-side routing with slug-based dynamic routes

### Animation & Interaction
- **GSAP** - Business license animation library
- **@studio-freight/react-lenis** - Smooth scrolling
- **React Slick** - Carousel/slider functionality
- **React Transition Group** - Page transitions

### Backend Integration
- **Axios** - HTTP client for API calls
- **js-cookie** - Cookie management for loading states

### Form Integration
- **@typeform/embed** - Typeform integration for contact forms

### Layout & UI
- **masonry-layout** - Grid layout system
- **intersection-observer** - Lazy loading and scroll triggers

## Development Notes

### API Integration Pattern
- Header component fetches menu data and logo from `/api/header-data` and `/api/header-menu`
- Analytics component loads tracking scripts from `/api/seo-analytics`
- All API calls use the `REACT_APP_BASE_URL` environment variable

### Loading State System
- Uses cookie-based loading detection (`hasloaded` cookie)
- Animated counter from 0-100% with scramble text effects
- Loading screen hides after 3.5 seconds and sets cookie

### Animation System
- GSAP animations initialized after API data is loaded
- Custom scramble text animations on loading screen
- Smooth scroll behavior wrapped around entire app with ReactLenis

### Mobile Responsiveness
- Bootstrap-based responsive grid system
- Separate mobile menu implementation
- Custom responsive breakpoints and mobile-specific styling

The codebase follows Create React App conventions and uses modern React patterns including hooks, functional components, and React Router v6 for navigation.