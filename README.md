# jQuery Shopping Cart Project

This project is a simple shopping cart application built using **jQuery**, **AJAX**, and **localStorage**. Users can browse products, add them to the cart, update quantities, and remove items. The total price of the cart updates dynamically as items are added or removed.

## Features

- **Product Listing**: Displays a paginated list of products fetched from the [FakeStore API](https://fakestoreapi.com/).
- **Add to Cart**: Users can add products to the shopping cart, and the cart updates accordingly.
- **Update Cart**: The quantity of each item in the cart can be adjusted. Removing a product reduces the quantity, and if the quantity is 1, the product is removed from the cart.
- **LocalStorage**: The cart data is persisted in `localStorage`, allowing users to retain their cart even after a page reload.
- **Dynamic Total Price**: The total price of the items in the cart is updated dynamically as items are added or removed.
- **Pagination**: The product listing is paginated, with controls for navigating between pages.

## Technologies Used

- **HTML/CSS**: For structuring and styling the application.
- **jQuery**: For DOM manipulation, event handling, and AJAX requests.
- **AJAX**: To fetch product data from the FakeStore API.
- **localStorage**: To persist cart data across page reloads.
- **Bootstrap**: For responsive layout and styling (optional, if used).

## How It Works

1. **Fetching Products**: When the page loads, a request is made to the FakeStore API to fetch the list of products. These products are displayed in a card format with an image, title, price, and an "Add to Cart" button.
2. **Adding to Cart**: Clicking the "Add to Cart" button adds the selected product to the shopping cart. If the product is already in the cart, its quantity is increased.
3. **Updating Cart**: The cart displays the title, price, and quantity of each item. Users can remove items, which reduces the quantity or removes the item entirely if the quantity reaches zero.
4. **Total Price**: The total price is updated in real-time as items are added or removed.
5. **LocalStorage**: The cart and total price are stored in `localStorage` so that the cart data persists even if the page is reloaded.

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/your-username/jquery-shopping-cart.git
    ```

2. Open the project directory:
    ```bash
    cd jquery-shopping-cart
    ```

3. Open `index.html` in your browser to see the application in action.

## Usage

1. Browse the products listed on the page.
2. Click the "Add to Cart" button to add a product to your cart.
3. View your cart on the right-hand side of the page.
4. Adjust the quantity or remove items from your cart.
5. Check the dynamically updated total price.

## Code Structure

- **index.html**: The main HTML file that structures the page layout and includes links to CSS, JS, and libraries.
- **script.js**: Contains all the JavaScript code, including event listeners, cart logic, and API calls.
- **styles.css**: Custom CSS for styling the project (optional if you're using a framework like Bootstrap).
- **localStorage**: Used to store and retrieve cart data.

## API

This project uses the [FakeStore API](https://fakestoreapi.com/) to simulate product data. 

**Example API Request**:
```bash
GET https://fakestoreapi.com/products
```

The API returns product information in the following format:
```json
{
    "id": 1,
    "title": "Product Title",
    "price": 29.99,
    "description": "Product Description",
    "category": "Category",
    "image": "https://fakestoreapi.com/image.jpg"
}
```

## Future Enhancements

- **User Authentication**: Add user login and registration.
- **Checkout System**: Implement a checkout system with payment integration.
- **Wishlist**: Add a wishlist feature to save items for later.
- **Search/Filter**: Implement a search bar or filter functionality for better product navigation.

