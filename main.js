const path = require('path')
const {
  ipcMain,
  app,
  Menu,
  Tray,
  BrowserWindow,
  shell
} = require('electron')

let appIcon = null

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./icon.ico",
    title: "Fujitora",
    frame: false,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
var ready = function () {
  createWindow()
}

app.on('ready', ready)

ipcMain.on('put-in-tray', (event) => {
  const iconName = process.platform === 'win32' ? 'icon.ico' : 'icon.ico'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit Fujitora',
      click: () => {
        event.sender.send('tray-removed')
      }
    },
    {
      label: 'Repositorie',
      click: () => {
        shell.openExternal('https://github.com/GolD-eNI/fujitora');
      }
    },
  ])

  appIcon.setToolTip('Fujitora')
  appIcon.setTitle("Fujitora")
  appIcon.setContextMenu(contextMenu)
})

ipcMain.on('remove-tray', () => {
  appIcon.destroy();
  app.quit();
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (appIcon) appIcon.destroy()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

