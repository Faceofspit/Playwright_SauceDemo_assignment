class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productNameSelector = '.inventory_item_name';
        this.productPriceSelector = '.inventory_item_price';
        this.addToCartButton = '.btn_primary';
        this.cartLink = '.shopping_cart_link';
    }

    async getFirstProductDetails() {
        const productName = await this.page.textContent(this.productNameSelector);
        const productPrice = await this.page.textContent(this.productPriceSelector);
        return { productName: productName.trim(), productPrice: productPrice.trim() };
    }

    async addFirstProductToCart() {
        await this.page.click(this.addToCartButton);
    }

    async navigateToCart() {
        await this.page.click(this.cartLink);
    }
}

export default ProductsPage;
