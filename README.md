# PowerToys Color Picker Tray

A lightweight Windows system tray application that provides quick access to the PowerToys Color Picker via the keyboard shortcut `Win + Shift + C`.

## Features

- 🎨 **Quick Access**: Click the tray icon to instantly open PowerToys Color Picker
- 🖱️ **System Tray**: Runs quietly in your system tray
- ⌨️ **Keyboard Shortcut**: Simulates `Win + Shift + C` to trigger PowerToys
- 🪶 **Lightweight**: Minimal resource usage
- 🚀 **Auto-build**: Automated builds via GitHub Actions

## Prerequisites

- **Windows OS** (Windows 10 or later)
- **PowerToys** must be installed and running
  - Download from: https://github.com/microsoft/PowerToys/releases
  - Ensure Color Picker is enabled in PowerToys settings

## Installation

### Option 1: Download Pre-built Release (Recommended)

1. Go to the [Releases](https://github.com/YOUR_USERNAME/color-picker/releases) page
2. Download the latest `.exe` installer
3. Run the installer and follow the prompts
4. Launch the app from the Start Menu or Desktop shortcut

### Option 2: Build from Source

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/color-picker.git
   cd color-picker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate the icon:
   ```bash
   node generate-icon.js
   ```

4. Build the application:
   ```bash
   npm run build:win
   ```

5. The installer will be in the `dist` folder

## Usage

1. **Launch the app** - The app will start and appear in your system tray
2. **Click the tray icon** - Opens PowerToys Color Picker immediately
3. **Right-click for menu**:
   - "Open Color Picker" - Triggers the color picker
   - "Quit" - Exits the application

## Development

### Run in Development Mode

```bash
npm start
```

This starts the Electron app in development mode.

### Build for Windows

```bash
npm run build:win
```

Creates a Windows installer in the `dist` folder.

### Project Structure

```
color-picker/
├── main.js              # Electron main process
├── icon.png             # Tray icon (generated)
├── generate-icon.js     # Icon generation script
├── package.json         # Project configuration
└── .github/
    └── workflows/
        └── build.yml    # GitHub Actions workflow
```

## How It Works

1. The app creates a system tray icon when launched
2. When you click the tray icon (or select "Open Color Picker" from the menu)
3. The app uses robotjs to simulate the keyboard shortcut `Win + Shift + C`
4. PowerToys intercepts this shortcut and opens the Color Picker

## Troubleshooting

### Color Picker doesn't open

- Ensure PowerToys is installed and running
- Verify that the Color Picker feature is enabled in PowerToys settings
- Check that the shortcut `Win + Shift + C` is set correctly in PowerToys

### App doesn't start

- Make sure you're running Windows 10 or later
- Try running as administrator
- Check if antivirus is blocking the application

## GitHub Actions

This project uses GitHub Actions to automatically build the Windows installer on every push to the `main` branch.

### Workflow Features

- ✅ Builds on Windows runner
- ✅ Installs Node.js 20
- ✅ Generates icon automatically
- ✅ Creates Windows installer
- ✅ Uploads build artifacts
- ✅ Creates releases when tagged

### To trigger a build:

1. Push to the `main` branch, or
2. Create a pull request, or
3. Manually trigger via "Actions" tab → "Build and Release" → "Run workflow"

### Downloading Build Artifacts

1. Go to the "Actions" tab in your repository
2. Click on the latest workflow run
3. Scroll down to "Artifacts"
4. Download `powertoys-color-picker-tray-windows`

## Technologies Used

- **Electron** - Desktop application framework
- **robotjs** - Native keyboard automation
- **electron-builder** - Application packaging
- **GitHub Actions** - CI/CD automation

## License

MIT License - feel free to use and modify as needed.

## Credits

- PowerToys: https://github.com/microsoft/PowerToys
- Electron: https://www.electronjs.org/

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
