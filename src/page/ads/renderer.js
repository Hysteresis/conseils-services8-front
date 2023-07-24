const { ipcRenderer } = require('electron');


function afficherDonnees(data) {
    const apiDataList = document.getElementById('apiDataList');
    apiDataList.innerHTML = ''; 

    data.forEach((item, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100');

        const cardImage = document.createElement('img');
        cardImage.src = '../../../assets/img/' + item.recruiter.company.image; 
        cardImage.alt = 'Annonce Image';
        cardImage.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = item.title; 

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = item.description; 

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer');

        const cardFooterText = document.createElement('small');
        cardFooterText.classList.add('text-muted');
        cardFooterText.textContent = 'Last updated 3 mins ago';

        const viewButton = document.createElement('button');
        viewButton.classList.add('btn', 'btn-primary');
        viewButton.textContent = 'Voir l\'annonce';
        viewButton.addEventListener('click', () => {
            navigateToAnnouncement(item.id); 
        });

        cardFooter.appendChild(cardFooterText);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardImage);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        card.appendChild(viewButton);
        cardDiv.appendChild(card);

        apiDataList.appendChild(cardDiv);
    });
}

function navigateToAnnouncement(announcementId) {
    console.log('id' + announcementId)
    ipcRenderer.send('navigate-to-announcement', announcementId);
}


function getAd() {
    const token = localStorage.getItem('token');
    console.log("token: " + token)
    fetch( 'https://localhost:8000/api/ads',{
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
        
    })
      .catch((error) => {
        console.error('Error:', error);
      });
}

getAd();

  