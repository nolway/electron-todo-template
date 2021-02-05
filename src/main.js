const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const globalShortcut = electron.globalShortcut;
const path = require('path');
const Tray = electron.Tray;
const BrowserView = electron.BrowserView;
const url = require('url');

var iconPath = path.join(__dirname, '/../assets/perroquet.jpg');

const menuRightClick = new Menu()

const MenuItem1 = new MenuItem({
    label: 'Item 1',
    click: () => { console.log('item ==> 1') }
})
menuRightClick.append(MenuItem1);

menuRightClick.append(new MenuItem({
    type: 'separator'
}));

const MenuItem2 = new MenuItem({
    label: 'Item 2',
    click: () => { console.log('item ==> 2') }
})
menuRightClick.append(MenuItem2);

function createdTray() {
    appIcon = new Tray(iconPath)
    appIcon.setToolTip('Tuto Electron Js');

    const menu = Menu.buildFromTemplate([{
        label: 'Ouvrir la Documentation',
        click: () => {
            electron.shell.openExternal('https://www.electronjs.org/docs');
        }
    },
    {
        label: 'Quitter',
        click: () => {
            app.exit();
        }
    }
    ]);
    appIcon.setContextMenu(menu);
}

function createWindow() {
    let win = new BrowserWindow({
        minWidth: 1200,
        minHeight: 800,
        maxWidth: 1500,
        maxHeight: 1000,
        frame: true,
        show: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    let template = [{
        label: 'Todo 1',
        submenu: [{
            label: 'Item 1.1',
            click: () =>{ console.log('click Item 1.1')}
        }, {
            label: 'Item 1.2',
            click: () =>{ console.log('click Item 1.2')}
        }]
    }, {
        label: 'Todo 2',
        submenu: [{
            label: 'Item 2.1',
            click: () =>{ console.log('click Item 2.1')}
        }, {
            label: 'Quitter',
            click: () => {
                app.exit();
            }
        }]
    }];
    //win.loadFile('views/home/home.html');
    win.once('ready-to-show', () => {
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
        win.show();
    });

    win.on('closed', () => {
        win = null;
    });

    return win;
}

app.whenReady().then(createWindow).then(createdTray);

app.on('browser-window-created', (event, win) => {
    win.webContents.on('context-menu', (e, params) => {
        menuRightClick.popup(win, params.x, params.y)
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/../views/home/home.html'),
        protocol: 'file',
    }));

});

app.on('ready', function () {
    globalShortcut.register('CommandOrControl + M', () => {
        console.log('CommandOrControl Crtl + M > GOOD');
    })

    globalShortcut.register('CommandOrControl + Alt + Esc', () => {
        console.log('CommandOrControl + Alt + Esc > GOOD');
        app.exit();
    })

    globalShortcut.register('CommandOrControl + Alt + H', () => {
        console.log('Show DOC');
        const winDocElectron = new BrowserWindow({
            height: 1200,
            width: 1200
        });
        winDocElectron.loadURL('https://www.electronjs.org/docs');
    });
});