const electron = require('electron');

const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const wallpaper = require('./wallpaper');

const API = require('./api');

const api = new API();

let mainWindow;

function listeners() {
  ipcMain.on('control-window', (e, type) => {
    if (!mainWindow) return;
    if (type === 'maximize') mainWindow.maximize();
    else if (type === 'minimize') mainWindow.minimize();
    else if (type === 'restore') mainWindow.restore();
    else if (type === 'unmaximize') mainWindow.unmaximize();
    else if (type === 'close' && mainWindow) mainWindow.close();
    else if (type === 'reload')mainWindow.reload();
    else if (type === 'quit') app.quit();
  });
  ipcMain.on('load-metadata', (e) => {
    const screenSize = electron.screen.getPrimaryDisplay().size;
    api.load(screenSize).then(json => e.sender.send('load-metadata-reply', json));
  });

  ipcMain.on('load-list', (e, destUrl) => {
    console.log('load-list, url: ', destUrl);
    api.fetch(destUrl)
      .then(json => e.sender.send('load-list-reply', json))
      .catch((err) => { console.log(err); e.sender.send('message', 'Loading Failed  Σ(;ﾟдﾟ)'); });
  });
  ipcMain.on('load-more', (e, destUrl) => {
    console.log('load-more, url: ', destUrl);
    api.fetch(destUrl)
      .then(json => e.sender.send('load-more-reply', json))
      .catch((err) => { console.log(err); e.sender.send('message', 'Loading Failed  Σ(;ﾟдﾟ)'); });
  });

  ipcMain.on('download-image', (e, imageUrl) => {
    console.log('download image from: ', imageUrl);
    api.download(imageUrl)
      .then(filePath => e.sender.send('message', `Downloaded at ${filePath} (•ㅂ•)/`))
      .catch((err) => { console.log(err); e.sender.send('message', 'Downloading Failed  Σ(;ﾟдﾟ)'); });
  });

  ipcMain.on('set-wallpaper', (e, imageUrl) => {
    console.log('download image from: ', imageUrl);
    api.download(imageUrl)
    .catch((err) => { console.log(err); e.sender.send('message', 'Loading Failed  Σ(;ﾟдﾟ)'); })
    .then(filePath => wallpaper.set(filePath)
      .then(() => e.sender.send('message', 'Wallpaper has been set (•ㅂ•)/'))
      .catch((err) => { console.log(err); e.sender.send('message', 'Loading Failed  Σ(;ﾟдﾟ)'); }));
  });
}


function createWindow() {
  const size = { width: 290 * 4 + 40, height: 800 };
  let suffix = 'png';
  if (process.platform === 'win32') suffix = 'ico';
  if (process.platform === 'darwin')suffix = 'icns';
  const screenSize = electron.screen.getPrimaryDisplay().size;
  size.height = size.width * screenSize.height / screenSize.width; // aspect ratio.
  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    // position windows by hand instead of center, to suit multiple display
    x: (screenSize.width - size.width) / 2,
    y: (screenSize.height - size.height) / 2,
    title: 'LoveWallpaperHD',
    icon: `./appicons/appicon@128.${suffix}`,
    autoHideMenuBar: true,
    frame: false,
  });
  // mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  listeners();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
