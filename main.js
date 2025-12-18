const { app, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const robot = require('robotjs');

let tray = null;

app.whenReady().then(() => {
  // Prevent app from showing in taskbar
  app.dock?.hide();

  // Create tray icon
  const iconPath = path.join(__dirname, 'icon.png');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon.resize({ width: 16, height: 16 }));

  // Set tooltip
  tray.setToolTip('PowerToys Color Picker');

  // Context menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Color Picker',
      click: () => {
        openColorPicker();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  // Single click to open color picker
  tray.on('click', () => {
    openColorPicker();
  });
});

function openColorPicker() {
  try {
    // Simulate Windows + Shift + C
    robot.keyToggle('shift', 'down');
    robot.keyToggle('command', 'down'); // 'command' maps to Windows key
    robot.keyTap('c');
    robot.keyToggle('command', 'up');
    robot.keyToggle('shift', 'up');
  } catch (error) {
    console.error('Error triggering color picker:', error);
  }
}

// Quit when all windows are closed (not applicable here, but good practice)
app.on('window-all-closed', (e) => {
  // Prevent default behavior of quitting the app
  e.preventDefault();
});

// Prevent app from quitting when windows are closed
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // We don't want this behavior.
});
