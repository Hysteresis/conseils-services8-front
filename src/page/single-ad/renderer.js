const { ipcRenderer } = require('electron');

console.log('sing-ad/renderer')
// ipcRenderer.on('announcement-id', (event, announcementId) => {
//   getSingleAd(announcementId);
// });
// Fonction pour récupérer une seule annonce depuis l'API en fonction de son ID


// Fonction pour afficher les détails de l'annonce unique
function afficherAnnonce(annonce) {
  const apiDataSingleAd = document.getElementById('apiDataSingleAd');
  apiDataSingleAd.innerHTML = ''; // Effacer les données précédentes

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('col');

  const card = document.createElement('div');
  card.classList.add('card', 'h-100');

  const cardImage = document.createElement('img');
  cardImage.src = annonce.imageURL; 
  cardImage.alt = 'Annonce Image';
  cardImage.classList.add('card-img-top');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = annonce.title; 

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = annonce.description; 

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardImage);
  card.appendChild(cardBody);
  cardDiv.appendChild(card);

  apiDataSingleAd.appendChild(cardDiv);
}

function getSingleAd(announcementId) {
  const token = localStorage.getItem('token');
  console.log("token: " + token);
  fetch(`https://localhost:8000/api/ads/${announcementId}`, {
    headers: {
      'Accept': 'application/json',
      'Content': 'application/json',
      'Authorization': 'bearer ' + token
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.table(data)
      afficherAnnonce(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
// Le reste de votre code pour la récupération des annonces depuis l'API et l'affichage initial
// ...
ipcRenderer.on('announcement-id', (event, announcementId) => {
  getSingleAd(announcementId);
});