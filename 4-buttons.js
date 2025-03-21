
document.addEventListener("DOMContentLoaded", function() {
    // Add IDs to product cards
    const productCards = document.querySelectorAll('.col-md-4.d-flex');
    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.trim().toLowerCase().replace(/\s+/g, '-');
        card.id = `${title}-section`;
    });

    // Scroll function
    function scrollToProduct(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });    
        }
    }

    // Button click handlers
    document.querySelectorAll('.scroll-to-product').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.querySelector('.h5').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            scrollToProduct(`${productName}-section`);
        });
    });
});