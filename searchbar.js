document.addEventListener("DOMContentLoaded", function () {
    let products = [
        "Decking",
        "Timber",
        "Boards",
        "Roof Battens",
        "Wood Pellets",
        "Wood Logs",
        "Prefabricated Wall Panels"
    ];

    let searchInput = document.getElementById("search-input");
    let searchButton = document.getElementById("search-btn");
    let resultsDropdown = document.getElementById("search-results");
    let currentFocus = -1;

    function scrollToProduct(productName) {
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
            // Add temporary highlight effect
            productCard.style.transition = 'background-color 1s';
            productCard.style.backgroundColor = '#fff3cd';
            setTimeout(() => {
                productCard.style.backgroundColor = '';
            }, 1000);
        }
    }

    function searchProducts() {
        let searchText = searchInput.value.toLowerCase();
        resultsDropdown.innerHTML = "";
        currentFocus = -1;

        if (searchText === "") {
            resultsDropdown.classList.remove("show");
            return [];
        }

        let filteredProducts = products.filter(product =>
            product.toLowerCase().includes(searchText)
        );

        if (filteredProducts.length === 0) {
            resultsDropdown.innerHTML = `<button class="dropdown-item text-muted" disabled>No products found.</button>`;
        } else {
            filteredProducts.forEach((product, index) => {
                let item = document.createElement("button");
                item.classList.add("dropdown-item");
                item.textContent = product;
                item.addEventListener("click", function () {
                    searchInput.value = product;
                    resultsDropdown.classList.remove("show");
                    scrollToProduct(product);
                });
                resultsDropdown.appendChild(item);
            });
        }

        resultsDropdown.classList.add("show");
        return filteredProducts;
    }

    // Handle keyboard navigation
    searchInput.addEventListener("keydown", function(e) {
        const items = resultsDropdown.getElementsByClassName("dropdown-item");
        
        if (e.key === "Enter") {
            e.preventDefault();
            if (currentFocus > -1 && items.length > 0) {
                items[currentFocus].click();
            } else {
                const filteredProducts = searchProducts();
                if (filteredProducts.length > 0) {
                    scrollToProduct(filteredProducts[0]);
                }
            }
        } else if (e.key === "ArrowDown") {
            currentFocus = Math.min(currentFocus + 1, items.length - 1);
            updateActiveItem(items);
        } else if (e.key === "ArrowUp") {
            currentFocus = Math.max(currentFocus - 1, -1);
            updateActiveItem(items);
        } else if (e.key === "Escape") {
            resultsDropdown.classList.remove("show");
        }
    });

    function updateActiveItem(items) {
        Array.from(items).forEach(item => item.classList.remove("active"));
        if (currentFocus >= 0 && currentFocus < items.length) {
            items[currentFocus].classList.add("active");
            items[currentFocus].scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }

    // Handle Enter key in search input
    searchInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const filteredProducts = searchProducts();
            if (filteredProducts.length > 0) {
                scrollToProduct(filteredProducts[0]);
            }
        }
    });

    // Handle search button click
    searchButton.addEventListener("click", function() {
        const filteredProducts = searchProducts();
        if (filteredProducts.length > 0) {
            scrollToProduct(filteredProducts[0]);
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !resultsDropdown.contains(event.target)) {
            resultsDropdown.classList.remove("show");
        }
    });

    // Handle input changes
    searchInput.addEventListener("input", function() {
        currentFocus = -1;
        searchProducts();
    });
});