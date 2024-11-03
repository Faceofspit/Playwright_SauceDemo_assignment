class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProductNameSelector = '.cart_item .inventory_item_name';
        this.cartProductPriceSelector = '.cart_item .inventory_item_price';
    }

    async getCartProductDetails() {
        const cartProductName = await this.page.textContent(this.cartProductNameSelector);
        const cartProductPrice = await this.page.textContent(this.cartProductPriceSelector);
        return { cartProductName: cartProductName.trim(), cartProductPrice: cartProductPrice.trim() };
    }
}

module.exports = CartPage;
