const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

var path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 800, titleBarStyle: 'hidden-inset', backgroundColor: '#000000', title:'Youtube Music Player', icon: path.join(__dirname + '/icon.icns')})

  // and load youtube music and adjust styling for top bar.
  mainWindow.loadURL('https://music.youtube.com')
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.insertCSS('ytmusic-app:before {width: 100%;height: 36px;top: 0;display: block;content: "";background: #1b1b1b;-webkit-app-region: drag;}') 
 });
 mainWindow.setTitle('Youtube Music Player')

  mainWindow.once('ready-to-show', function (){
         newWindow.show();
     });

  //When the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

//Call whe electron has finished & has initialised
app.on('ready', createWindow)

//If all windows are closed, quit.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})