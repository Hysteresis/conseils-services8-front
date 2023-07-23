const { ipcRenderer } = require('electron');

// document.querySelector('#home')
//     .addEventListener('click', () => {
//         ipcRenderer.send('page-home');
//     });


console.log('====>  ad/renderer js  <====  ')


function afficherDonnees(data) {
    const apiDataList = document.getElementById('apiDataList');
    apiDataList.innerHTML = ''; // Effacer les données précédentes

    data.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Item ${index} :</strong><br>
            Titre : ${item.title}<br>
            Description : ${item.description}<br>
            Diplôme : ${item.degree.title}<br><br>
        `;
        apiDataList.appendChild(listItem);
    });
}
document.querySelector('#home')
    .addEventListener('click', () => {
        ipcRenderer.send('page-home');
    });


function getAd() {
    const token = localStorage.getItem('token');
    console.log("token: " + token)
    fetch( 'http://localhost:8000/api/ads',{
        headers: {
            'Accept': 'application/json',
            'Content': 'application/json',
            'Authorization': 'bearer ' + token
        }

    }).then((response) => {
        return response.json();

    }).then((data) => {

        console.log(data)
        afficherDonnees(data);
        // console.log(data.description)

        let title = document.querySelector('#title')
        title.innerHTML = data.title
        let description = document.querySelector('#description')
        description.innerHTML = data.description
        let degree = document.querySelector('#degree')
        degree.innerHTML = data.degree
        
    })
    .then((data) => {
        console.log(data);
        // localStorage.setItem('token', data.token);
        // ipcRenderer.send('token', data.token); // Envoie du token à la fenêtre de rendu principale
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}


getAd();

