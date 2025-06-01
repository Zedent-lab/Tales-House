# Tales House Landing Page

A premium, interactive landing page for the Tales House creator collective built with React and Vite.

## Features

- ✨ Custom animated cursor
- 🌟 Shooting stars background animation
- 🎨 Beautiful gradient designs
- 📱 Fully responsive
- ⚡ Optimized performance with requestAnimationFrame
- 🎯 Smooth scroll parallax effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or create this project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── App.jsx          # Main component
  ├── main.jsx         # Entry point
  └── index.css        # Tailwind imports
```

## Customization

- Update social media links in the social icons section
- Modify button click handlers to point to your actual pages
- Adjust colors, animations, and content as needed
- Replace placeholder stats with real data

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Modern CSS animations

## Performance Notes

- Uses requestAnimationFrame for smooth cursor tracking
- Throttled scroll events for better performance
- Optimized animations with will-change property
- Efficient re-renders with useCallback hooks