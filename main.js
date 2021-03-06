'use strict';
const path = require('path')
const {
  ipcMain,
  app,
  BrowserWindow,
  Menu,
  Tray,
  shell
} = require('electron')
// var discordBot = require('./src/discordbot.js')

// Nécessaire pour l'icone dans la barre des taches
let appIcon = null

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    center: true,
    icon: "./icon.ico",
    title: "Fujitora",
    frame: false,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
}
var ready = function () {
  createWindow()
}

app.on('ready', ready)

// Icone dans la barre des taches
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
  // discordBot.killDiscordBot("kill");
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
  // discordBot.killDiscordBot();
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Code Bot Discord

// ipcMain.on('start-discordbot', () => {
//   discordBot.runDiscordBot();
// })


