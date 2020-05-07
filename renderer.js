const ipc = require('electron').ipcRenderer
const path = require('path')

ipc.send('put-in-tray')

// Tray removed from context menu on icon
ipc.on('tray-removed', function () {
    ipc.send('remove-tray')
})

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