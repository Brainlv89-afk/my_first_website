class OrderButtonHandler {
    constructor() {
        this.setupOrderButton();
    }

    setupOrderButton() {
        const orderBtn = document.getElementById("ordernow");
        if (orderBtn) {
            orderBtn.addEventListener("click", () => {
                const pricingCards = document.getElementById("Prircing-cards");
                if (pricingCards) {
                    pricingCards.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        }
    }
}

