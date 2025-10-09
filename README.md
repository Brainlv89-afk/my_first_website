# Website Selling One Products 

## Overview

This project is a modular, object-oriented JavaScript web application for an online timber marketplace.  
It features product browsing, search, shopping cart, enquiry form, and order confirmation—all organized using handler classes for maintainability and scalability.

## Features

- **Watch Promo Button:** Scrolls to and plays the promotional video.
- **Order Now Button:** Scrolls to the pricing/order section.
- **Product Scroller:** Smoothly scrolls to product sections from navigation buttons.
- **Enquiry Handler:** Validates and handles email enquiries.
- **Product Search Bar:** Live product search with dropdown and scroll-to-product.
- **Buy Handler:** Manages shopping cart, purchase notifications, and order confirmation emails.

## Structure

```
my_first_website/
│
├── classes/
│   ├── WatchButtonHandler.js
│   ├── OrderButtonHandler.js
│   ├── ProductScroller.js
│   ├── EnquiryHandler.js
│   ├── ProductSearchBar.js
│   └── BuyHandler.js
│
├── index.html
├── main.js
└── images/
```

## Usage

1. All handler classes are loaded via `<script>` tags in `index.html`.
2. `main.js` initializes each handler after the DOM is loaded:

    ```javascript
    document.addEventListener("DOMContentLoaded", function () {
        new WatchButtonHandler();
        new OrderButtonHandler();
        new ProductScroller();
        new EnquiryHandler();
        new ProductSearchBar();
        new BuyHandler();
    });
    ```

3. Each handler class manages its own feature, keeping code modular and easy to maintain.

## How to Run

- Open `index.html` in your browser.
- All features will be available and interactive.

## Contributing

- Fork the repository and create a new branch for your changes.
- Add new features as handler classes in the `classes/` folder.
- Submit a pull request with a clear description of your changes.

## License

MIT License
