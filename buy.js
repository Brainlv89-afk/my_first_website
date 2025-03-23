document.addEventListener("DOMContentLoaded", function () {
    let cartTotal = 0;
    let cartItems = {};
    const cartTotalElement = document.getElementById("cartTotal");
    const shoppingCart = document.getElementById("shoppingCart");
    const cartDropdown = document.getElementById("cartDropdown");
    const cartItemsList = document.getElementById("cartItems");

    function updateCartDisplay() {
        cartTotalElement.textContent = `€${cartTotal.toFixed(2)}`;
        document.getElementById("cartTotalDropdown").textContent = `€${cartTotal.toFixed(2)}`;
        cartItemsList.innerHTML = "";

        Object.keys(cartItems).forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "mb-2");
            listItem.innerHTML = `
                <div class="me-3">
                    <span class="item-name">${item}</span>
                    <div class="d-flex align-items-center gap-2">
                        <span class="item-price">€${cartItems[item].price.toFixed(2)}</span>
                        <span class="item-quantity badge bg-secondary">x${cartItems[item].quantity}</span>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm remove-item" 
                        data-product="${item}"
                        aria-label="Remove item">
                    ×
                </button>
            `;
            cartItemsList.appendChild(listItem);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function (e) {
                const productName = this.dataset.product;
                const itemTotal = cartItems[productName].quantity * cartItems[productName].price;

                cartTotal -= itemTotal;
                delete cartItems[productName];
                updateCartDisplay();

                e.stopPropagation(); // Prevent dropdown from closing
            });
        });
    }

    document.querySelectorAll(".buy-now").forEach(button => {
        button.addEventListener("click", function () {
            const price = parseFloat(button.dataset.price);
            const productName = button.closest(".card-body").querySelector("h3").textContent;

            if (cartItems[productName]) {
                cartItems[productName].quantity += 1;
            } else {
                cartItems[productName] = { quantity: 1, price: price };
            }
            cartTotal += price;

            updateCartDisplay();
            shoppingCart.classList.add("animate-cart");
            setTimeout(() => shoppingCart.classList.remove("animate-cart"), 500);

            cartDropdown.style.display = "block";
        });
    });

    shoppingCart.addEventListener("click", function (e) {
        e.stopPropagation();
        cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
    });

    cartDropdown.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    document.getElementById("completeOrder").addEventListener("click", function () {
        const userEmail = document.getElementById("orderEmail").value;

        if (cartTotal > 0 && userEmail) {
            sendConfirmationEmail(userEmail); // Call EmailJS function

            alert(`Order completed! Total: €${cartTotal.toFixed(2)}
A confirmation email has been sent to ${userEmail}.
Our customer representative will contact you within 48 hours to finalize delivery fees and transportation details.`);
            
            cartTotal = 0;
            cartItems = {};
            updateCartDisplay();
            cartDropdown.style.display = "none";
            document.getElementById('orderEmail').value = '';
        } else {
            alert("Please enter a valid email and add items to your cart.");
        }
    });

    document.addEventListener("click", function (e) {
        if (!shoppingCart.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.style.display = "none";
        }
    });

    function sendConfirmationEmail(userEmail) {
        const orderId = Math.floor(Math.random() * 1000000); // Random order ID

        // Convert cartItems object into an array of item objects expected by EmailJS
        const orders = Object.keys(cartItems).map(itemName => {
            return {
                name: itemName,
                units: cartItems[itemName].quantity,
                price: (cartItems[itemName].price * cartItems[itemName].quantity).toFixed(2),
                image_url: "https://via.placeholder.com/64" // Replace with real product images if you have them
            };
        });

        const emailParams = {
            email: userEmail,
            order_id: orderId,
            orders: orders,
            cost: {
                shipping: "TBD", // Delivery fees will be finalized later
                tax: "0.00",     
                total: cartTotal.toFixed(2)
            },
            message: `Thank you for your order! Our customer representative will contact you within 48 hours to finalize delivery fees and transportation details.`
        };

        emailjs.send("service_edjpflq", "template_sli2rr8", emailParams)
            .then(response => {
                console.log("✅ Email sent successfully!", response);
            })
            .catch(error => {
                console.error("❌ Email failed to send!", error);
                alert("There was a problem sending the confirmation email.");
            });
    }
});
