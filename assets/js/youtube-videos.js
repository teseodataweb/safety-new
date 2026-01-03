/**
 * YouTube Videos Loader para AP Safety
 * Carga automáticamente los videos del canal de YouTube usando la API v3
 *
 * CONFIGURACIÓN:
 * 1. Obtener API Key en: https://console.cloud.google.com/
 *    - Crear proyecto > APIs y servicios > Credenciales > Crear credenciales > Clave de API
 *    - Habilitar "YouTube Data API v3" en la biblioteca de APIs
 * 2. Obtener Channel ID: Ve al canal de YouTube > Click derecho > Ver código fuente > Buscar "channelId"
 *    O usa: https://www.youtube.com/account_advanced (cuando estés logueado)
 */

const YouTubeVideos = {
    // CONFIGURACIÓN
    config: {
        apiKey: 'AIzaSyB1Qmrg0ywuIMocIQw0bw_80W_N5adsUJI',
        channelId: 'UCT4M9mOclAE24QjMzmlXixQ',
        maxResults: 12,
        containerId: 'youtube-videos-container'
    },

    // Inicializar el módulo
    init: function(customConfig = {}) {
        // Mezclar configuración personalizada
        this.config = { ...this.config, ...customConfig };

        // Verificar configuración
        if (!this.config.apiKey || !this.config.channelId) {
            console.warn('YouTube Videos: Configura tu API Key y Channel ID en youtube-videos.js');
            this.showConfigMessage();
            return;
        }

        this.loadVideos();
    },

    // Cargar videos desde la API de YouTube
    loadVideos: async function() {
        const container = document.getElementById(this.config.containerId);
        if (!container) {
            console.error('YouTube Videos: No se encontró el contenedor #' + this.config.containerId);
            return;
        }

        // Mostrar loader
        container.innerHTML = this.getLoaderHTML();

        try {
            // Primero obtener el ID de la playlist de uploads del canal
            const channelResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${this.config.channelId}&key=${this.config.apiKey}`
            );

            if (!channelResponse.ok) {
                throw new Error('Error al obtener información del canal');
            }

            const channelData = await channelResponse.json();

            if (!channelData.items || channelData.items.length === 0) {
                throw new Error('Canal no encontrado');
            }

            const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

            // Obtener los videos de la playlist de uploads
            const videosResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${this.config.maxResults}&key=${this.config.apiKey}`
            );

            if (!videosResponse.ok) {
                throw new Error('Error al obtener videos');
            }

            const videosData = await videosResponse.json();

            if (!videosData.items || videosData.items.length === 0) {
                container.innerHTML = this.getEmptyHTML();
                return;
            }

            // Renderizar los videos
            this.renderVideos(container, videosData.items);

        } catch (error) {
            console.error('YouTube Videos Error:', error);
            container.innerHTML = this.getErrorHTML(error.message);
        }
    },

    // Renderizar los videos en el contenedor
    renderVideos: function(container, videos) {
        const delays = ['100ms', '200ms', '300ms', '400ms', '500ms', '600ms'];
        const animations = ['fadeInLeft', 'fadeInUp', 'fadeInRight'];

        let html = '<div class="row">';

        videos.forEach((video, index) => {
            const snippet = video.snippet;
            const videoId = snippet.resourceId.videoId;
            const title = this.truncateText(snippet.title, 60);
            const description = this.truncateText(snippet.description, 120);
            const thumbnail = snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url;

            const delay = delays[index % delays.length];
            const animation = animations[index % animations.length];

            html += `
                <div class="col-xl-4 col-lg-4 col-md-6 wow ${animation}" data-wow-delay="${delay}">
                    <div class="blog-one__single youtube-video-card">
                        <div class="blog-one__img-box">
                            <div class="video-thumbnail" onclick="YouTubeVideos.playVideo('${videoId}', this)" style="cursor: pointer; position: relative;">
                                <img src="${thumbnail}" alt="${this.escapeHtml(title)}" style="width: 100%; height: auto; display: block;">
                                <div class="play-button" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(255,0,0,0.9); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="blog-one__content">
                            <h3 class="blog-one__title">${this.escapeHtml(title)}</h3>
                            <p>${this.escapeHtml(description)}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Agregar enlace al canal
        html += `
            <div class="text-center mt-5">
                <a href="https://www.youtube.com/@ap.safety" target="_blank" class="thm-btn" style="background: #FF0000;">
                    <i class="fab fa-youtube"></i> Ver más videos en YouTube
                </a>
            </div>
        `;

        container.innerHTML = html;

        // Reinicializar WOW.js si está disponible
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    },

    // Reproducir video (reemplaza thumbnail con iframe)
    playVideo: function(videoId, element) {
        const container = element.closest('.blog-one__img-box');
        container.innerHTML = `
            <div class="video-responsive" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
        `;
    },

    // Truncar texto
    truncateText: function(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    },

    // Escapar HTML para prevenir XSS
    escapeHtml: function(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // HTML del loader
    getLoaderHTML: function() {
        return `
            <div class="text-center py-5">
                <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-3">Cargando videos de YouTube...</p>
            </div>
        `;
    },

    // HTML cuando no hay videos
    getEmptyHTML: function() {
        return `
            <div class="text-center py-5">
                <i class="fab fa-youtube" style="font-size: 4rem; color: #ccc;"></i>
                <p class="mt-3">No se encontraron videos en el canal.</p>
                <a href="https://www.youtube.com/@ap.safety" target="_blank" class="thm-btn mt-3">
                    Visitar canal de YouTube
                </a>
            </div>
        `;
    },

    // HTML de error
    getErrorHTML: function(message) {
        return `
            <div class="text-center py-5">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ffc107;"></i>
                <p class="mt-3">Error al cargar los videos: ${this.escapeHtml(message)}</p>
                <p class="text-muted">Mientras tanto, puedes ver nuestros videos directamente en YouTube:</p>
                <a href="https://www.youtube.com/@ap.safety" target="_blank" class="thm-btn mt-3" style="background: #FF0000;">
                    <i class="fab fa-youtube"></i> Ir al canal de YouTube
                </a>
            </div>
        `;
    },

    // Mensaje cuando no está configurado
    showConfigMessage: function() {
        const container = document.getElementById(this.config.containerId);
        if (container) {
            container.innerHTML = `
                <div class="alert alert-warning text-center py-4">
                    <h4><i class="fas fa-cog"></i> Configuración requerida</h4>
                    <p>Para cargar videos automáticamente de YouTube, configura tu API Key y Channel ID en:</p>
                    <code>assets/js/youtube-videos.js</code>
                    <hr>
                    <p class="mb-0">Mientras tanto, visita nuestro canal:</p>
                    <a href="https://www.youtube.com/@ap.safety" target="_blank" class="btn btn-danger mt-2">
                        <i class="fab fa-youtube"></i> Canal de YouTube AP Safety
                    </a>
                </div>
            `;
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si existe el contenedor antes de inicializar
    if (document.getElementById('youtube-videos-container')) {
        YouTubeVideos.init();
    }
});
