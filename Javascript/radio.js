const podcastURL = new Map([
    ['Otra educación es posible', 'g2XTpCa9qlw'], // de todo esta url https://www.youtube.com/watch?v=//////g2XTpCa9qlw////
    ['episodio2', 'AQUI_OTRO_ID']                                  ///solo lo que va detras del = del watch
  ]);
  
  const selectElement = document.getElementById('episodioPodcast');
  const video_container = document.querySelector('.video-container');
  
  for (const [key] of podcastURL) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    selectElement.appendChild(option);
  }
  
  function CargarPodcast() {
    const selectedValue = selectElement.value;
    const videoID = podcastURL.get(selectedValue);
    video_container.innerHTML = `
            <iframe 
        src="https://www.youtube.com/embed/${videoID}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>`;
  }
  
  selectElement.addEventListener('change', CargarPodcast);
  CargarPodcast();