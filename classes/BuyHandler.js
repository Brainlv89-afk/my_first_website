class BuyHandler {
    constructor() {
        this.cartTotal = 0;
        this.cartItems = {};
        this.cartTotalElement = document.getElementById("cartTotal");
        this.shoppingCart = document.getElementById("shoppingCart");
        this.cartDropdown = document.getElementById("cartDropdown");
        this.cartItemsList = document.getElementById("cartItems");
        this.purchaseNotification = document.getElementById("purchaseNotification");
        this.closeNotification = document.getElementById("closeNotification");
        this.completeOrderButton = document.getElementById("completeOrder");
        this.orderEmailInput = document.getElementById("orderEmail");

        this.init();
    }

    init() {
        this.updateCartDisplay();

        document.querySelectorAll(".buy-now").forEach(button => {
            button.addEventListener("click", () => this.handleBuyNow(button));
        });

        if (this.closeNotification) {
            this.closeNotification.addEventListener("click", () => {
                this.purchaseNotification.classList.add("d-none");
            });
        }

        if (this.shoppingCart) {
            this.shoppingCart.addEventListener("click", (e) => {
                e.stopPropagation();
                this.cartDropdown.style.display = this.cartDropdown.style.display === "block" ? "none" : "block";
            });
        }

        if (this.cartDropdown) {
            this.cartDropdown.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }

        if (this.completeOrderButton) {
            this.completeOrderButton.addEventListener("click", () => this.handleCompleteOrder());
        }

        document.addEventListener("click", (e) => {
            if (!this.shoppingCart.contains(e.target) && !this.cartDropdown.contains(e.target)) {
                this.cartDropdown.style.display = "none";
            }
        });
    }

    updateCartDisplay() {
        this.cartTotalElement.textContent = `€${this.cartTotal.toFixed(2)}`;
        document.getElementById("cartTotalDropdown").textContent = `€${this.cartTotal.toFixed(2)}`;
        this.cartItemsList.innerHTML = "";

        Object.keys(this.cartItems).forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "mb-2");
            listItem.innerHTML = `
                <div class="me-3">
                    <span class="item-name">${item}</span>
                    <div class="d-flex align-items-center gap-2">
                        <span class="item-price">€${this.cartItems[item].price.toFixed(2)}</span>
                        <span class="item-quantity badge bg-secondary">x${this.cartItems[item].quantity}</span>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm remove-item" 
                        data-product="${item}" aria-label="Remove item">
                    ×
                </button>
            `;
            this.cartItemsList.appendChild(listItem);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = button.dataset.product;
                const itemTotal = this.cartItems[productName].quantity * this.cartItems[productName].price;

                this.cartTotal -= itemTotal;
                delete this.cartItems[productName];
                this.updateCartDisplay();

                e.stopPropagation();
            });
        });
    }

    handleBuyNow(button) {
        const price = parseFloat(button.dataset.price);
        const productName = button.closest(".card-body").querySelector("h3").textContent;

        if (this.cartItems[productName]) {
            this.cartItems[productName].quantity += 1;
        } else {
            this.cartItems[productName] = { quantity: 1, price: price };
        }
        this.cartTotal += price;

        this.updateCartDisplay();

        // Show the purchase notification
        this.purchaseNotification.classList.remove("d-none");
        setTimeout(() => {
            this.purchaseNotification.classList.add("d-none");
        }, 3000);

        this.shoppingCart.classList.add("animate-cart");
        setTimeout(() => this.shoppingCart.classList.remove("animate-cart"), 500);

        this.cartDropdown.style.display = "block";
    }

    handleCompleteOrder() {
        const userEmail = this.orderEmailInput.value;

        if (this.cartTotal > 0 && userEmail) {
            this.sendConfirmationEmail(userEmail);

            alert(`Order completed! Total: €${this.cartTotal.toFixed(2)}
A confirmation email has been sent to ${userEmail}.
Our customer representative will contact you within 48 hours to finalize delivery fees and transportation details.`);

            this.cartTotal = 0;
            this.cartItems = {};
            this.updateCartDisplay();
            this.cartDropdown.style.display = "none";
            this.orderEmailInput.value = '';
        } else {
            alert("Please enter a valid email and add items to your cart.");
        }
    }

    sendConfirmationEmail(userEmail) {
        const orderId = Math.floor(Math.random() * 1000000);

        const orders = Object.keys(this.cartItems).map(itemName => {
            return {
                name: itemName,
                units: this.cartItems[itemName].quantity,
                price: (this.cartItems[itemName].price * this.cartItems[itemName].quantity).toFixed(2),
            };
        });

        const emailParams = {
            email: userEmail,
            order_id: orderId,
            orders: orders,
            cost: {
                shipping: "TBD",
                tax: "0.00",
                total: this.cartTotal.toFixed(2)
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
}