const {app, BrowserWindow} = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        minWidth: 1200,
        minHeight: 800,
        maxWidth: 1500,
        maxHeight: 1000,
        frame: false,
        show: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('views/home/home.html');
    win.once('ready-to-show', () => {
        win.show();
    });
    
    win.on('closed', () => {
        win = null;
    });

    return win;
}

app.whenReady().then(createWindow);