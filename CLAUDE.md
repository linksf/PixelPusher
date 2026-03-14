# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at localhost:3000
npm test         # Run tests (interactive watch mode)
npm test -- --watchAll=false  # Run tests once (CI mode)
npm run build    # Production build to /build
```

## Architecture

PixelPusher is a React pixel art editor built with Create React App. All state lives in a single React Context (`src/context/StateContext.js`) — there is no Redux or other state management library.

### State (`src/context/StateContext.js`)
The `StateProvider` wraps the entire app and exposes:
- `frames` — array of frames, each a flat `number[]` of length `width * height`. Value `0` = transparent; non-zero values are palette indices.
- `currentFrameIndex` — which frame is active
- `palette` — array of hex color strings; index 0 is unused (transparent slot)
- `currentColorIndex` — palette index being drawn with
- `tool` — `"draw" | "erase" | "fill" | "eyeDropper"`
- `toolActive` — boolean for whether mouse/touch is currently held down
- `brushSize` — integer 1–10 (square brush)
- `showPreviousFrame` — onion-skin toggle
- `config` — static object `{ width: 24, height: 24, scale: 20 }` (grid size and pixel scale in px)

### Grid (`src/components/Grid.jsx`)
The core drawing surface is an HTML5 `<canvas>` element. Pixel data is stored in `frames` (context state), not on the canvas itself. On every state change the canvas is redrawn from scratch via a `useEffect`. The grid re-renders when `currentFrameIndex`, `frames`, `palette`, or `scale` changes.

Pixel coordinate helpers:
- `getIndexFromColRow(col, row)` → flat array index
- `getColRowFromIndex(index)` → `{ col, row }`

The checkerboard pattern (alternating `#aaa`/`#ccc`) represents transparent pixels. When `showPreviousFrame` is true, the previous frame's painted pixels are shown at `55` (33%) opacity as onion-skin.

### HUD Components
- **ToolHud** — tool selector (draw/erase/fill/eyeDropper) + BrushSizeChanger
- **ColorHud** — shows first 5 palette colors as swatches + ColorPicker for editing the active color
- **FrameHud** — frame selector strip with add-frame button
- **TitleHud** — app title bar

### Styling
All styling uses `styled-components`. No CSS modules or Tailwind. Global styles are minimal (`src/App.css`, `src/index.css`).

### Firebase
`src/firebase.js` initializes Firebase (Analytics only). The `firebase.json` hosting config points to the `public/` folder — note this would need to point to `build/` for production deploys of the React app.
