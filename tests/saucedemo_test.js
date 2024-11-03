const { chromium } = require('playwright');
const fs = require('fs');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage').default;
const CartPage = require('../pages/CartPage');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to the site
    await loginPage.goto();

    // Step 2: Login to the site
    await loginPage.login('standard_user', 'secret_sauce');

    // Step 3: Verify successful login
    await page.waitForSelector('.product_label'); // Wait for the Products page to load

    // Step 4: Get the first product item name and price
    const { productName, productPrice } = await productsPage.getFirstProductDetails();

    // Store it in a text file
    fs.writeFileSync('product_info.txt', `Product Name: ${productName}\nPrice: ${productPrice}`);

    // Step 5: Click on the add cart
    await productsPage.addFirstProductToCart();

    // Step 6: Navigate to the cart and verify it contains the product
    await productsPage.navigateToCart();
    const { cartProductName, cartProductPrice } = await cartPage.getCartProductDetails();

    // Verify that the cart contains the added product
    if (cartProductName === productName && cartProductPrice === productPrice) {
        console.log('Product successfully added to the cart!');
    } else {
        console.log('Product not found in the cart.');
    }

    // Step 7: Logout
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    // Close the browser
    await browser.close();
})();
