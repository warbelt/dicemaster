const { app, BrowserWindow } = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win // Global referenceto the window so the GC does not close it

function createWindow () {
    win = new BrowserWindow({ width: 1280, height: 720 })
    win.loadURL('file://' + __dirname + '/app/www/index.html');

    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

app.on('ready', createWindow)