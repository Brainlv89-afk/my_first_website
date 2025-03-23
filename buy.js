document.addEventListener("DOMContentLoaded", function () {
    let cartTotal = 0; // Stores total price
    let cartItems = {}; // Stores items added to the cart
    const cartTotalElement = document.getElementById("cartTotal");
    const shoppingCart = document.getElementById("shoppingCart");

    // Create cart dropdown
    let cartDropdown = document.createElement("div");
    cartDropdown.id = "cartDropdown";
    cartDropdown.style.display = "none";
    cartDropdown.innerHTML = `<ul id="cartItemsList"></ul><button id="completeOrder">Complete Order</button>`;
    document.body.appendChild(cartDropdown);

    // Function to update cart display
    function updateCartDisplay() {
        cartTotalElement.textContent = `€${cartTotal.toFixed(2)}`;

        let cartItemsList = document.getElementById("cartItemsList");
        cartItemsList.innerHTML = ""; // Clear the list

        Object.keys(cartItems).forEach((item) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${cartItems[item].quantity}x</strong> ${item} - €${(cartItems[item].quantity * cartItems[item].price).toFixed(2)}`;
            cartItemsList.appendChild(listItem);
        });

        cartDropdown.style.display = "block"; // Show dropdown when an item is added
    }

    // Add event listener to all "Buy Now" buttons
    document.querySelectorAll(".buy-now").forEach((button) => {
        button.addEventListener("click", function () {
            let price = parseFloat(button.getAttribute("data-price"));
            let productName = button.closest(".card-body").querySelector("h3").textContent;

            cartTotal += price;

            if (cartItems[productName]) {
                cartItems[productName].quantity += 1;
            } else {
                cartItems[productName] = { quantity: 1, price: price };
            }

            updateCartDisplay();
            
            // Make the shopping cart "float"
            shoppingCart.classList.add("floating");
        });
    });

    // Show cart dropdown when cart is clicked
    shoppingCart.addEventListener("click", function () {
        cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
    });

    // Handle order completion
    document.getElementById("completeOrder").addEventListener("click", function () {
        alert("Thank you for your order!");
        cartTotal = 0;
        cartItems = {};
        updateCartDisplay();
        cartDropdown.style.display = "none";
    });
});
