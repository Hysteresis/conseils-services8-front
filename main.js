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
        // Si la fenêtre singleAd existe déjà, on la ferme avant d'en créer une nouvelle
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
        // Si la fenêtre singleAd existe déjà, on la ferme avant d'en créer une nouvelle
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
    
    // Envoi de l'ID de l'annonce à la fenêtre de l'annonce unique
    winArray['singleAd'].webContents.on('did-finish-load', () => {
    winArray['singleAd'].webContents.send('announcement-id', announcementId);
    });
  }

  ipcMain.on('navigate-to-announcement', (event, announcementId) => {
    createSingleAdWindow(announcementId);
    // winArray['page-ads'].close();
  });

// Cette méthode sera appelée quand Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quant cet événement est émit.
app.whenReady().then(() => {
    createMainWindow()

    app.on('activate', () => {
        // Sur macOS il est commun de re-créer une fenêtre  lors
        // du click sur l'icone du dock et qu'il n'y a pas d'autre fenêtre ouverte.
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })
})

// Quitter quand toutes les fenêtres sont fermées, sauf sur macOS. Dans ce cas il est courant
// que les applications et barre de menu restents actives jusqu'à ce que l'utilisateur quitte 
// de manière explicite par Cmd + Q.
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

// ipcMain.on('announcement-id', (event, announcementId) => {
//     getSingleAd(announcementId);
//   });

