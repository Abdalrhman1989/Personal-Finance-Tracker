const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click() {
          dialog.showMessageBox({
            type: 'info',
            title: 'About',
            message: 'This is a personal finance tracker built with Electron.',
            buttons: ['OK'],
          });
        },
      },
    ],
  },
];

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
