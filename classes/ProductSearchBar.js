class ProductSearchBar {
    constructor() {
        this.products = [
            "Decking",
            "Timber",
            "Boards",
            "Roof Battens",
            "Wood Pellets",
            "Wood Logs",
            "Prefabricated Wall Panels"
        ];
        this.searchInput = document.getElementById("search-input");
        this.searchButton = document.getElementById("search-btn");
        this.resultsDropdown = document.getElementById("search-results");
        this.currentFocus = -1;

        this.init();
    }

    init() {
        if (!this.searchInput || !this.searchButton || !this.resultsDropdown) return;

        this.searchInput.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.searchInput.addEventListener("keypress", (e) => this.handleKeyPress(e));
        this.searchInput.addEventListener("input", () => this.handleInput());
        this.searchButton.addEventListener("click", () => this.handleSearchButton());
        document.addEventListener("click", (event) => this.handleDocumentClick(event));
    }

    scrollToProduct(productName) {
        const productHeadings = Array.from(document.querySelectorAll('.card h3'));
        const matchingHeading = productHeadings.find(heading =>
            heading.textContent.trim() === productName
        );
        if (matchingHeading) {
            const productCard = matchingHeading.closest('.col-md-4');
            productCard.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            productCard.style.transition = 'background-color 1s';
            productCard.style.backgroundColor = '#fff3cd';
            setTimeout(() => {
                productCard.style.backgroundColor = '';
            }, 1000);
        }
    }

    searchProducts() {
        let searchText = this.searchInput.value.toLowerCase();
        this.resultsDropdown.innerHTML = "";
        this.currentFocus = -1;

        if (searchText === "") {
            this.resultsDropdown.classList.remove("show");
            return [];
        }

        let filteredProducts = this.products.filter(product =>
            product.toLowerCase().includes(searchText)
        );

        if (filteredProducts.length === 0) {
            this.resultsDropdown.innerHTML = `<button class="dropdown-item text-muted" disabled>No products found.</button>`;
        } else {
            filteredProducts.forEach((product, index) => {
                let item = document.createElement("button");
                item.classList.add("dropdown-item");
                item.textContent = product;
                item.addEventListener("click", () => {
                    this.searchInput.value = product;
                    this.resultsDropdown.classList.remove("show");
                    this.scrollToProduct(product);
                });
                this.resultsDropdown.appendChild(item);
            });
        }

        this.resultsDropdown.classList.add("show");
        return filteredProducts;
    }

    handleKeyDown(e) {
        const items = this.resultsDropdown.getElementsByClassName("dropdown-item");

        if (e.key === "Enter") {
            e.preventDefault();
            if (this.currentFocus > -1 && items.length > 0) {
                items[this.currentFocus].click();
            } else {
                const filteredProducts = this.searchProducts();
                if (filteredProducts.length > 0) {
                    this.scrollToProduct(filteredProducts[0]);
                }
            }
        } else if (e.key === "ArrowDown") {
            this.currentFocus = Math.min(this.currentFocus + 1, items.length - 1);
            this.updateActiveItem(items);
        } else if (e.key === "ArrowUp") {
            this.currentFocus = Math.max(this.currentFocus - 1, -1);
            this.updateActiveItem(items);
        } else if (e.key === "Escape") {
            this.resultsDropdown.classList.remove("show");
        }
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const filteredProducts = this.searchProducts();
            if (filteredProducts.length > 0) {
                this.scrollToProduct(filteredProducts[0]);
            }
        }
    }

    handleInput() {
        this.currentFocus = -1;
        this.searchProducts();
    }

    handleSearchButton() {
        const filteredProducts = this.searchProducts();
        if (filteredProducts.length > 0) {
            this.scrollToProduct(filteredProducts[0]);
        }
    }

    handleDocumentClick(event) {
        if (!this.searchInput.contains(event.target) && !this.resultsDropdown.contains(event.target)) {
            this.resultsDropdown.classList.remove("show");
        }
    }

    updateActiveItem(items) {
        Array.from(items).forEach(item => item.classList.remove("active"));
        if (this.currentFocus >= 0 && this.currentFocus < items.length) {
            items[this.currentFocus].classList.add("active");
            items[this.currentFocus].scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }
}