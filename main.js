// Initialize all feature handlers after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Handles "Watch Promo" button functionality
    new WatchButtonHandler();
    // Handles "Order Now" button functionality
    new OrderButtonHandler();
    // Enables smooth scrolling to product sections
    new ProductScroller();
    // Manages enquiry form and email validation
    new EnquiryHandler();
    // Adds live product search and scroll-to-product features
    new ProductSearchBar();
    // Manages shopping cart, purchase notifications, and order confirmation emails
    new BuyHandler();
});