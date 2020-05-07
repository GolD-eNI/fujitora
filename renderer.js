const ipc = require('electron').ipcRenderer
const { 
    app,
    BrowserWindow
} = require('electron').remote;
const path = require('path')

ipc.send('put-in-tray')

// Tray removed from context menu on icon
ipc.on('tray-removed', function () {
    ipc.send('remove-tray')
})


var winButtonClose = document.getElementById('winButtonClose'),
    winButtonMin = document.getElementById('winButtonMin'),
    winButtonMax = document.getElementById('winButtonMax');

function closeWindow () {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
}   
function minimizeWindow () {  
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();
}
function maximizeWindow () {
    var window = BrowserWindow.getFocusedWindow();
    window.setFullScreen(!window.isFullScreen());
}
winButtonClose.addEventListener('click', closeWindow)
winButtonMin.addEventListener('click', minimizeWindow)
winButtonMax.addEventListener('click', maximizeWindow)


const notification = {
  title: 'Coucou Toi!',
  body: "J'espere que tu m'a pas oublié...",
  icon: path.join(__dirname, 'icon.ico')
}

// setTimeout(function() {
//     const myNotification = new window.Notification(notification.title, notification)

//     myNotification.onclick = () => {
//         console.log('Notification clicked')
//     }
// }, 5000);