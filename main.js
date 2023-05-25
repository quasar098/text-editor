// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, Menu, MenuItem} = require('electron')
const path = require('path');
const fs = require('fs');

function createWindow () {

    // menu
    const fileMenu = new Menu();
    fileMenu.append(new MenuItem({label: 'Open', click: () => console.log('todo do this')}))
    fileMenu.append(new MenuItem({label: 'Exit', click: () => app.quit()}));

    const topBarMenu = new Menu();
    const fileItem = new MenuItem({label: 'File', submenu: fileMenu});
    topBarMenu.append(fileItem);

    // create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true,  // dangerous asf but i dont care
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        title: "Text Editor"
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    mainWindow.setMenu(topBarMenu);
    mainWindow.setBackgroundColor('#282a36')

    mainWindow.webContents.openDevTools()
}

// init ready
app.whenReady().then(() => {
    createWindow();

    globalShortcut.register("CmdOrCtrl+-", () => false);
    globalShortcut.register("Ctrl+S", () => {
        console.log("123");
        return false;
    })

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
