document.addEventListener("DOMContentLoaded", function () {
    // Cart state
    let cartTotal = 0;
    let cartItems = {};
    const cartTotalElement = document.getElementById("cartTotal");
    const shoppingCart = document.getElementById("shoppingCart");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartItemsList = document.getElementById("cartItems");
    const cartItemCount = document.getElementById("cartItemCount");

    // Function to update cart display
    function updateCartDisplay() {
        cartTotalElement.textContent = `€${cartTotal.toFixed(2)}`;
        cartItemsList.innerHTML = "";

        let totalItems = 0;
        Object.keys(cartItems).forEach(item => {
            totalItems += cartItems[item].quantity;

            const listItem = document.createElement("li");
            listItem.classList.add("d-flex", "justify-content-between", "align-items-center", "py-2", "border-bottom");
            listItem.innerHTML = `
                <span>${item}</span>
                <div>
                    <span class="badge bg-secondary">${cartItems[item].quantity}x</span>
                    <span class="fw-bold">€${(cartItems[item].quantity * cartItems[item].price).toFixed(2)}</span>
                </div>
            `;
            cartItemsList.appendChild(listItem);
        });

        // Update cart item count
        cartItemCount.textContent = totalItems;
        cartItemCount.style.display = totalItems > 0 ? "inline-block" : "none";
    }

    // Add to cart functionality
    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", function() {
            const price = parseFloat(button.dataset.price);
            const productName = button.closest(".card-body").querySelector("h3").textContent;

            cartTotal += price;
            if (cartItems[productName]) {
                cartItems[productName].quantity += 1;
            } else {
                cartItems[productName] = { quantity: 1, price: price };
            }

            updateCartDisplay();

            // Animate the cart button
            shoppingCart.classList.add("animate-cart");
            setTimeout(() => shoppingCart.classList.remove("animate-cart"), 500);

            // Show cart dropdown briefly
            cartDropdown.style.display = "block";
            setTimeout(() => { cartDropdown.style.display = "none"; }, 3000);
        });
    });

    // Toggle cart dropdown
    shoppingCart.addEventListener("click", function(e) {
        e.stopPropagation();
        cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
    });

    // Complete order function
    document.getElementById("completeOrder").addEventListener("click", function() {
        if (cartTotal > 0) {
            alert(`Order completed! Total: €${cartTotal.toFixed(2)}\nThank you for your purchase!`);
            cartTotal = 0;
            cartItems = {};
            updateCartDisplay();
            cartDropdown.style.display = "none";
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function(e) {
        if (!shoppingCart.contains(e.target)) {
            cartDropdown.style.display = "none";
        }
    });
});
