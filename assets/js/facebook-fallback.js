
document.addEventListener('DOMContentLoaded', function() {
    // Give the Facebook widget a moment to load
    setTimeout(function() {
        const fbWidget = document.querySelector('.fb-page');
        // The widget creates an iframe. If it's not there, the widget likely failed.
        if (!fbWidget || !fbWidget.querySelector('iframe')) {
            const fallbackContainer = document.getElementById('facebook-fallback-container');
            if (fallbackContainer) {
                fallbackContainer.innerHTML = `
                    <div class="card text-center">
                        <div class="card-body">
                            <h5 class="card-title">¿Problemas para ver nuestras noticias?</h5>
                            <p class="card-text">Parece que nuestro feed de Facebook no se cargó. ¡Pero no te preocupes! Puedes ver todas nuestras actualizaciones directamente en nuestra página.</p>
                            <a href="https://www.facebook.com/eacoosorno/" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                <i class="bi bi-facebook"></i> Ir a Facebook
                            </a>
                        </div>
                    </div>
                `;
            }
        }
    }, 3000); // Wait 3 seconds
});
