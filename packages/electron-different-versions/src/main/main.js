'use strict';

const moduleA = require('moduleA');
const moduleB = require('moduleB');

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');


const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow();

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  window.loadURL(url.format({
    pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  window.on('closed', () => {
    mainWindow = null
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus()
    })
  });

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();

  ipcMain.on('getMessageA', (event) => {
    event.sender.send('messageA', moduleA.version);
  });


  ipcMain.on('getMessageB', (event) => {
    event.sender.send('messageB', moduleB.version);
  });
});
