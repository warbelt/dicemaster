const { app, BrowserWindow } = require('electron')


let win // Global reference to the window so the GC does not close it

function createWindow () {
    win = new BrowserWindow({ width: 1280, height: 720 })
    win.loadURL('file://' + __dirname + '/app/www/index.html');

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)