const {app, BrowserWindow, Notification} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({
      width: 500, 
      height: 56, 
      show: false, 
      frame: false, 
      transparent: true,
      center: true, 
      backgroundColor: "rgba(255,255,255,0.5)"
    })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.once('ready-to-show', () => {
      win.show();
  });

  exports.includeResults = () => {
      win.setSize(500, 200, true);
  }

  exports.shrinkToOriginalSize = () => {
      win.setSize(500, 56, true);
  }

  //new Notification({"title":"Welcome!","body":"Nice To See You!","icon":"./icon.ico"}).show();
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})