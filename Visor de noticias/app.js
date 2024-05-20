document.addEventListener('DOMContentLoaded', () => {
    // Tu clave API de Newsdata.io
    const apiKey = 'pub_44540f39153ad3def29c8415018ce201e5a03'; 
    // Selecciona el contenedor donde se mostrarán las noticias
    const newsContainer = document.getElementById('news-container');

    // Función asíncrona para obtener noticias de la API
    async function fetchNews() {
        try {
            // Realiza una solicitud a la API de Newsdata.io con el filtro de idioma en español
            const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&language=es`);
            // Convierte la respuesta en un objeto JSON
            const data = await response.json();
            // Llama a la función para mostrar las noticias, pasando los resultados obtenidos
            displayNews(data.results);
        } catch (error) {
            // Muestra un mensaje de error en la consola si la solicitud falla
            console.error('Error fetching news:', error);
        }
    }

    // Función para mostrar las noticias en la página
    function displayNews(articles) {
        // Limpia el contenido del contenedor de noticias
        newsContainer.innerHTML = '';
        // Itera sobre cada artículo de noticias
        articles.forEach(article => {
            // Crea un elemento div para cada noticia
            const newsItem = document.createElement('div');
            // Agrega una clase CSS al div de la noticia
            newsItem.classList.add('news-item');
            // Define el contenido HTML del div, incluyendo el título, imagen, descripción y enlace
            newsItem.innerHTML = `
                <h2>${article.title}</h2>
                ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}" style="width:100%; max-width:600px; margin-bottom:10px;">` : ''}
                <p>${article.description}</p>
                <a href="${article.link}" target="_blank">Leer más</a>
            `;
            // Agrega el div de la noticia al contenedor de noticias
            newsContainer.appendChild(newsItem);
        });
    }

    // Llama a la función para obtener las noticias cuando se carga la página
    fetchNews();
});
