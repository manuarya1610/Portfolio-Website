# Portfolio Rewrite History & Changelog

## Version 3.0: The "Awwwards" Refactor
**Date:** January 2026
**Goal:** Transform the portfolio from a standard static site to a high-fidelity, motion-rich experience.

### 1. Architecture Overhaul
| Feature | Legacy System (v2) | Modern System (v3) |
| :--- | :--- | :--- |
| **Core HTML** | `index.html` | `index-new.html` |
| **Styling** | `style.css` (Standard CSS) | `styles-new.css` (CSS Variables, Adv. Layouts) |
| **Scripting** | `script.js` (jQuery) | `animations-new.js` (GSAP + Vanilla JS) |
| **Scrolling** | Built-in Browser Scroll | **Lenis** Smooth Scroll |
| **Fonts** | Monument Extended | Sofia Sans Condensed + Spline Sans Mono |

### 2. Major Feature Additions

#### A. The "Evolving" Hero Section
- **Old**: Static text blocks with simple slide-in animations.
- **New**: 
    - Massive, screen-filling typography.
    - **"Evolving Text"**: Letters (A, I, E, S) transform into iconographic representations on hover/load.
    - Integrated "Ghosting" effect where original letters fade but remain visible behind icons.
    - Expanding pill shapes for "SYSTEMS".

#### B. Advanced Preloader
- **Old**: Basic fade-out or none.
- **New**: 
    - **Odometer Counter**: Rolling numbers from 000 to 100%.
    - **Rotating Circular Text**: SVG text path spinning around the counter.
    - **Seamless Handoff**: Preloader timeline flows directly into the Hero Master Reveal timeline without stutter.

#### C. Micro-Interactions
- **Magnetic Elements**: Buttons, navigation links, and the logo now physically attract to the mouse cursor.
- **Text Scramble**: Navigation links (e.g., `[ABOUT]`) scramble their characters (`!@#$%`) on hover before settling.
- **Custom Cursor**: A small dot with a lagging follower circle that expands on interactive elements.

#### D. Visual Depth & Atmosphere
- **Vignette Overlay**: Fixed `div` creating a "film" look with darkened edges.
- **Spotlight**: Radial gradient that tracks mouse movement to light up dark sections.
- **Noise Texture**: Subtle SVG noise filter for texture.
- **Theme Switching**: Background color transitions smoothly from Light (Hero) to Dark (Expertise/Work) based on scroll position.

### 3. File-Specific Changes

#### `index-new.html` vs `index.html`
- **Structure**: Moved from detailed, nested `div` soups to semantic `<section>` tags (`#hero`, `#about`, `#work`).
- **Typography**: Replaced image-based text or standard headings with optimized Google Fonts.
- **Centering**: Moved `.scroll-indicator` out of corner containers to ensure perfect center alignment.

#### `styles-new.css` vs `style.css`
- **Variables**: Introduced comprehensive `:root` variables for colors, spacing, and timing functions.
- **Layout**: Heavy usage of Flexbox and absolute positioning for "Magazine" style layouts.
- **Reset**: Removed default margins/padding and set `cursor: none` globally to support the custom cursor.

#### `animations-new.js` vs `script.js`
- **Logic**: Complete move from jQuery (`$`) to vanilla JS + GSAP.
- **Performance**: Used `requestAnimationFrame` for cursor and lenis loops.
- **Modularity**: Code split into clear initialization functions (`initPreloader`, `initCursor`, etc.).

### 4. Recent Fixes
- **Scroll Indicator**: Fixed alignment issue where the scroll text was off-center due to being nested in a corner `div`. It is now a direct child of the Hero section.
- **Font Loading**: Added `preconnect` and specific font weights to ensure fast LCP (Largest Contentful Paint).
