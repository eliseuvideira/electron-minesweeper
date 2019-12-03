import { app, BrowserWindow } from 'electron';
import url from 'url';
import path from 'path';

let browserWindow: BrowserWindow | null = null;

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    show: false,
  });
  win.loadURL(
    url.format({
      protocol: 'file',
      slashes: true,
      pathname: path.join(__dirname, '..', '..', 'renderer', 'index.html'),
    }),
  );
  win.on('ready-to-show', () => {
    win.show();
  });
  return win;
};

app.on('ready', () => {
  browserWindow = createWindow();
  browserWindow.on('closed', () => {
    browserWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!browserWindow) {
    browserWindow = createWindow();
    browserWindow.on('closed', () => {
      browserWindow = null;
    });
  }
});
