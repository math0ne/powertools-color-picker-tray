# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PowerToys Color Picker Tray is a lightweight Electron-based Windows system tray application that provides quick access to PowerToys Color Picker via keyboard simulation (Win + Shift + C).

## Key Commands

### Development
```bash
npm start                    # Run app in development mode
```

### Building
```bash
npm run build:win            # Build portable Windows exe to dist/ folder
npm run build                # Generic electron-builder command
node create-exe-icon.js      # (Optional) Regenerate icon.png if you updated tray-icon.png
```

### Installation
```bash
npm install                  # Install dependencies (includes native robotjs module)
```

## Architecture

### Main Components

1. **main.js** - Electron main process
   - Creates headless system tray application (no windows)
   - Uses `robotjs` to simulate Win + Shift + C keyboard shortcut
   - Tray icon click triggers `openColorPicker()` function
   - Context menu provides "Open Color Picker" and "Quit" options
   - Important: `app.dock?.hide()` prevents taskbar visibility on macOS (if applicable)

2. **icon.png** - Application .exe icon
   - 256x256 PNG image used for the Windows .exe file icon
   - Created by `create-exe-icon.js` from tray-icon.png (centers 16x16 icon in 256x256 canvas)
   - Used by electron-builder for .exe packaging

3. **tray-icon.png** - System tray icon
   - 16x16 PNG image displayed in Windows system tray at runtime
   - Loaded via `path.join(__dirname, 'tray-icon.png')` in main.js:12
   - Not resized (used at native resolution for crisp display)

4. **Keyboard Simulation** (main.js:46-57)
   - Uses `robotjs.keyToggle()` to simulate key presses
   - Sequence: Shift down → Windows down → C tap → Windows up → Shift up
   - Note: `'command'` key maps to Windows key in robotjs

### Utilities

- **create-exe-icon.js** - Creates 256x256 icon.png from 16x16 tray-icon.png
- **generate-icon.js** - Legacy gradient icon generator (can be deleted)

### Dependencies

- **electron** - Desktop app framework
- **robotjs** - Native keyboard automation (requires node-gyp for compilation)
- **electron-builder** - Configured for portable Windows exe output
- **canvas** (devDep) - Used for icon creation/manipulation

### Build Configuration (package.json)

```json
"build": {
  "win": {
    "target": ["portable"],      // Creates portable exe, no installer
    "icon": "icon.png"           // 256x256 icon for .exe file
  },
  "portable": {
    "artifactName": "PowerToysColorPickerTray.exe"
  },
  "files": [
    "main.js",
    "icon.png",                  // 256x256 .exe icon
    "tray-icon.png"              // 16x16 system tray icon
  ]
}
```

## CI/CD

GitHub Actions workflow (.github/workflows/build.yml) runs on:
- Push to main branch
- Pull requests
- Manual workflow_dispatch

**Build process:**
1. Runs on windows-latest runner (required for robotjs native compilation)
2. Installs Node.js 20
3. Builds with `npm run build:win` (uses icon.png from repository)
4. Uploads exe artifact (30 day retention)
5. Creates timestamped GitHub release with exe attached

## Important Notes

- **Windows-only**: App requires Windows OS and PowerToys to be installed/running
- **Native dependencies**: robotjs requires native compilation, so builds must run on Windows or with cross-compilation toolchain
- **Icons**: Uses separate icons - tray-icon.png (16x16 for system tray) and icon.png (256x256 for .exe file)
- **Portable exe**: Build outputs single exe file with no installation required
- **Headless app**: No Electron BrowserWindow created, only system tray icon
