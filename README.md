# Plate Generator System

A responsive web application for configuring and visualizing custom wall plates.
Built with React + Webpack, optimized for both desktop and mobile devices.

---

## Features

### Core Requirements

* Initial Plate Generation

  * On load, one default plate is created with predefined dimensions and motif.
  * Configuration is persisted using browser 'localStorage'.

* Plate Dimensions Input

  * Custom width (20–300 cm) and height (30–128 cm).
  * Supports both English (`.`) and German (`,`) locales for decimal inputs.
  * Invalid inputs trigger styled warnings without auto-correction.
  * On blur, invalid values are reverted to the last valid state.

* Plate Management

  * Between 1–10 plates can exist.
  * Users can add or remove plates (except the last one).
  * Each plate is individually resizable.

* Dual-Canvas UI**

  * Left panel: realistic visual preview (scales 1 cm = 1 px).
  * Right panel: input controls.
  * Fully responsive and touch-friendly.

* Image Rendering on Plates

  * Shared motif image split proportionally across plates.
  * Cropping from the center outward for mismatched aspect ratios.
  * Plates display exactly their portion of the motif.

* Image Extension (Mirroring)

  * If total width > 300 cm, the motif extends seamlessly via horizontal mirroring.

### Extara Features

* Upload custom motif image.
* Export canvas as PNG.
* Drag & drop plate reordering.
* Toggle between cm/inches.
* Animated transitions.

---

## Tech Stack

* Framework: React + Webpack
* Styling: CSS (responsive, mobile-first)
* State Persistence: localStorage
* Build Tool: Webpack

---

## Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/mileesonani/Plate_Generator_System.git
cd Plate_Generator_System
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Live Demo

Deployed on Netlify: [Demo Link](https://chic-pavlova-675670.netlify.app/)

---

## Known Limitations / Assumptions

* Only tested with the provided initial motif image.
* Input validation currently focused on numeric + locale detection.
* Advanced bonus features may not yet be implemented.


---

## License

For assessment purposes only.