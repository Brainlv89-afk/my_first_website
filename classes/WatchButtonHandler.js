class WatchButtonHandler {
    constructor() {
        this.setupWatchButton();
    }

    setupWatchButton() {
        const watchBtn = document.getElementById("watch-promo-btn");
        if (watchBtn) {
            watchBtn.addEventListener("click", () => {
                const iframe = document.getElementById("promo-iframe");
                if (iframe) {
                    iframe.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                    iframe.src = "https://www.youtube.com/embed/OgzeQf5i7TY?autoplay=1";
                }
            });
        }
    }
}