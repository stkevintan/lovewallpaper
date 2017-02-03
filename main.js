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
    if (type === 'maximize') mainWindow.maximize();
    else if (type === 'minimize') mainWindow.minimize();
    else if (type === 'restore') mainWindow.restore();
    else if (type === 'unmaximize') mainWindow.unmaximize();
    else if (type === 'close') mainWindow.close();
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
      .catch((err) => { console.log(err); e.sender.send('message', 'Loading Failed  Σ(;ﾟдﾟ)'); })
    );
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
  listeners();
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
