export default {
    data() {
        return {
            products: [],
            product: {
                category_id: '',
                name: '',
                number: '',
                description: '',
                sell_price: 0,
                buy_price: 0,
                stock: 0,
                stock_min: 0,
                stock_max: 0,
                unit: '',
                active: true,
                type: '',
                barcode: '',
                sku: '',
                tax: '',
            },
        }
    },

    created() {
        this.getUnits()
        this.getTaxes()
        this.getCurrencies()
    },

    methods: {
        /**
         * Save product
         * @returns {void}
         */
        saveProduct() {
            this.makeHttpRequest('POST', '/api/products', this.product).then((response) => {
                this.showToast(response.data.message)
                this.$router.push({ name: 'products' })
            })
        },

        /**
         * Get product
         * @param {string} id uuid of product
         * @returns {void}
         */
        getProduct(id) {
            this.makeHttpRequest('GET', '/api/products/' + id)
                .then((response) => {
                    this.product = response.data.data
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        this.showToast(this.$t('errors.not_found_item'), '', 'error')
                        this.$router.push({ name: 'products' })
                    }
                })
        },

        /**
         * Get all products
         * @returns {void}
         **/
        getProducts() {
            this.makeHttpRequest('GET', '/api/products')
                .then((response) => {
                    this.products = response.data.data
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        this.showToast(this.$t('errors.not_found_item'), '', 'error')
                        this.$router.push({ name: 'products' })
                    }
                })
        },

        /**
         * Update product
         * @param {string} id uuid of product
         * @returns {void}
         */
        updateProduct(id) {
            this.makeHttpRequest('PUT', '/api/products/' + id, this.product).then((response) => {
                this.showToast(response.data.message)
                this.$router.push({ name: 'view-product', params: { id: id } })
            })
        },

        /**
         * Delete product
         * @param {string} id uuid of product
         * @returns {void}
         */
        deleteProduct(id) {
            this.makeHttpRequest('DELETE', '/api/products/' + id).then((response) => {
                this.showToast(response.data.message)
                this.$router.push({ name: 'products' })
            })
        },

        /**
         * Ask for confirmation before deleting product
         * @param {string} id  uuid of product
         * @returns {void}
         */
        deleteProductAsk(id) {
            this.$confirm.require({
                message: this.$t('product.delete_product_confirmation'),
                header: this.$t('basic.confirmation'),
                icon: 'fa fa-circle-exclamation',
                accept: () => {
                    this.deleteProduct(id)
                },
            })
        },

        /**
         * Get product number
         *
         * @returns {void}
         */
        getProductNumber() {
            this.makeHttpRequest('GET', '/api/product/product_number').then((response) => {
                this.product.number = response.data.data
            })
        },
    },
}
