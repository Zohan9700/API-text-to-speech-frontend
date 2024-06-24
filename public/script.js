document.getElementById('listenButton').addEventListener('click', function() {
    //selectionne les element de text
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
    //collecte les element text et les filtre
    const text = Array.from(elements)
      .map(element => element.innerText)
      .filter(text => text.trim().length > 0)
      .join(' ');
    //envoie le text au serveur
    fetch('http://localhost:3001/speak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    })
    //recois une repons sous forme de fichier audio
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    })
    .catch(error => {
      console.error('Erreur:', error);
    });
  });
  