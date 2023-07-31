const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
let winArray = [];

function createMainWindow() {
    winArray['index'] = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, 'assets/img/kaamelott.jpg'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    winArray['index'].loadFile(path.join(__dirname, 'index.html')).then(r => console.log(r));
    winArray['index'].webContents.openDevTools();
}

function createAdsWindow(){
    if (winArray['ads']) {
        winArray['ads'].close();
    }
    winArray['ads'] = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, 'assets/img/kaamelott-logo.jpg'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    winArray['ads'].loadFile(path.join(__dirname, 'src/page/ads/index.html')).then(r => console.log(r));
    winArray['ads'].webContents.openDevTools();
}


  
  function createSingleAdWindow(announcementId) {
    if (winArray['singleAd']) {
        winArray['singleAd'].close();
      }
    winArray['singleAd'] = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      }
    });
  
    winArray['singleAd'].loadFile(path.join(__dirname, 'src/page/single-ad/index.html')).then(r => console.log(r));
    winArray['singleAd'].webContents.openDevTools();
    
    winArray['singleAd'].webContents.on('did-finish-load', () => {
    winArray['singleAd'].webContents.send('announcement-id', announcementId);
    });
  }

  ipcMain.on('navigate-to-announcement', (event, announcementId) => {
    createSingleAdWindow(announcementId);

  });


app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('page-ads', (event, args) => {
    createAdsWindow();
    winArray['index'].close();
});

ipcMain.on('page-home', (event, args) => {
    createMainWindow();
});



