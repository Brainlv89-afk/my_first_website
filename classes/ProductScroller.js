class ProductScroller {
    constructor() {
        this.productCards = document.querySelectorAll('.col-md-4.d-flex');
        this.assignCardIds();
        this.setupButtonHandlers();
    }

    assignCardIds() {
        this.productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            card.id = `${title}-section`;
        });
    }

    scrollToProduct(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    setupButtonHandlers() {
        document.querySelectorAll('.scroll-to-product').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.querySelector('.h5').textContent.trim().toLowerCase().replace(/\s+/g, '-');
                this.scrollToProduct(`${productName}-section`);
            });
        });
    }
}