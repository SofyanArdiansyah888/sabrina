# Wedding Invitation Website

A beautiful digital wedding invitation website for Riang Sabrina & Yudha built with React, Tailwind CSS, shadcn/ui, and Three.js.

## Features

- ✨ **Interactive 3D Background** - Animated particles and heart shapes using Three.js
- 🎨 **Modern UI Design** - Clean and elegant design with Tailwind CSS
- 📱 **Responsive Design** - Optimized for all devices
- ⏰ **Countdown Timer** - Real-time countdown to the wedding date
- 📸 **Photo Gallery** - Interactive image gallery with modal view
- 📝 **RSVP Form** - Guest confirmation system
- 🎭 **Smooth Animations** - Framer Motion animations throughout
- 🎵 **Glass Morphism Effects** - Modern glass-like design elements

## Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Three.js** - 3D graphics and animations
- **Framer Motion** - Animation library
- **Vite** - Build tool

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wedding-invitation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Customization

### Wedding Details
Update the wedding information in the following files:
- `src/components/HeroSection.tsx` - Couple names and main details
- `src/components/WeddingDetails.tsx` - Event details, venue, and timing
- `src/components/CountdownTimer.tsx` - Wedding date

### Styling
- Colors and themes can be customized in `tailwind.config.js`
- Custom styles are in `src/index.css`
- Font families can be changed in the Google Fonts import in `index.html`

### Images
Replace the sample images in `src/components/GallerySection.tsx` with your actual photos.

### RSVP Form
The RSVP form currently logs to console. To make it functional:
1. Set up a backend API endpoint
2. Update the `handleSubmit` function in `src/components/RSVPSection.tsx`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This project is created for Riang Sabrina & Yudha's wedding. Please respect their privacy and do not use their personal information without permission.

## Support

For any questions or support, please contact the development team.
