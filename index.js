
const startApp = () => {
    let globalState = {
        basketProducts: [
            {
                id: 1,
                name: 'Футболка UZcotton мужская',
                count: 1,
                price: 522,
                oldPrice: 1051,
                img: "./img/t-shirt.png",
                imgGray: "./img/t-shirtGray.png",
                color: 'Цвет: белый',
                size: 'Размер: 56',
            },
            {
                id: 2,
                name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
                count: 1,
                price: 2100047,
                oldPrice: 2300047,
                img: "./img/iphoneCase.png",
                imgGray: "./img/iphoneCaseGray.png",
                color: 'Цвет: прозрачный',
                size: '',
            },
            {
                id: 3,
                name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
                count: 1,
                price: 494,
                oldPrice: 1976,
                img: "./img/pencils.png",
                imgGray: "./img/pencilsGray.png",
                color: '',
                size: '',
            }
        ]
    }

    customElements.define('product-card', class extends HTMLElement {
        state = {
            id: undefined,
            name: undefined,
            price: undefined,
            oldPrice: undefined,
            count: undefined,
            img: undefined,
            imgGray: undefined,
            color: undefined,
            size: undefined,
            rendered: false
        }

        constructor() {
            super()
        }

        render() {
                this.innerHTML = `
                <div class="product">
                    <div class="leftPart">
                        <input type="checkbox">
                        <div class="productMeta">
                            <img src=${this.state.img}>
                            <div class="productNameSection">
                                <p class="productName">${this.state.name}</p>
                                <p class="productChar">${this.state.color}    ${this.state.size}</p>
                                <p class="stock">Коледино WB</p>
                                <p class="fabrik">OOO Вайлдберриз <img src="./img/iconGray.svg" alt="iconGray" style="margin-bottom: -5px"></p>
                            </div>
                        </div>
                    </div>
                    <div class="rightPart">
                        <div class="counter">
                            <div class="decreaseCountBtn">—</div>
                            <div>${this.state.count}</div>
                            <div class="increaseCountBtn">+</div>
                        </div>
                        <div class="productPriceSection">
                            <p class="newPrice">${(this.state.price * this.state.count).toLocaleString()} coм</p>
                            <p class="oldPrice">${(this.state.oldPrice * this.state.count).toLocaleString()} сом</p>
                        </div>
                    </div>
                </div>
            `
        }

        addListeners() {
            const increaseCountBtn = this.getElementsByClassName('increaseCountBtn')[0]

            increaseCountBtn.addEventListener('click', (e) => {
                handleUpdateProductCount(this.state.id, true)
            })

            const decreaseCountBtn = this.getElementsByClassName('decreaseCountBtn')[0]

            decreaseCountBtn.addEventListener('click', (e) => {
                handleUpdateProductCount(this.state.id, false)
            })
        }

        connectedCallback() {
            if (!this.state.rendered) {
              this.state.id = +this.getAttribute('id')
              this.state.name = this.getAttribute('name')
              this.state.price = +this.getAttribute('price')
              this.state.oldPrice = +this.getAttribute('oldPrice')
              this.state.count = +this.getAttribute('count')
              this.state.color = this.getAttribute('color')
              this.state.size = this.getAttribute('size')
              this.state.img = this.getAttribute('img')
              this.state.imgGray = this.getAttribute('imgGray')


              this.render()
              this.state.rendered = true

              this.addListeners()
            }
        }

        static get observedAttributes() {
            return ['count']
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.state.rendered) {
                this.state.id = +this.getAttribute('id')
                this.state.name = this.getAttribute('name')
                this.state.price = +this.getAttribute('price')
                this.state.oldPrice = +this.getAttribute('oldPrice')
                this.state.count = +this.getAttribute('count')
                this.state.color = this.getAttribute('color')
                this.state.size = this.getAttribute('size')
                this.state.img = this.getAttribute('img')
                this.state.imgGray = this.getAttribute('imgGray')
                

                this.render()
                this.addListeners()
            }
        }
    })

    customElements.define('total-card', class extends HTMLElement {
        state = {
            rendered: false
        }

        constructor() {
            super()
        }

        render() {
            this.innerHTML = `
                <div class="totalCard">
                    <div class="totalPriceSection">
                        <div class="price">
                            <p>Итого</p><p>${getBasketTotalPrice().toLocaleString()} сом</p>
                        </div>
                        <div class="products">
                            <p>4 товара</p><p>${getBasketOldTotalPrice().toLocaleString()} сом</p>
                        </div>
                        <div class="discount">
                            <p>Скидка</p><p>-${getBasketSale().toLocaleString()} сом</p>
                        </div>
                        <div class="delivery">
                            <p>Доставка</p><p>бесплатно</p>
                        </div>
                    </div>
                    <div class="deliverySection">
                        <div class="deliveryTitle">
                            <p>Доставка в пункт выдачи</p>
                            <img src="./img/pen.svg" alt="pen" class="modal__btn _modal-open" data-modal-open="modal-1"/>
                        </div>
                        <p class="address">
                            Бишкек, улица Ахматбека Суюмбаева,<br/>
                            12/1
                        </p>
                        <p class="dates">
                            5–8 фев
                        </p>
                        <div class="purchaseReturns">
                            <img src="./img/priceShipping.svg" alt="priceShipping"/>
                            <p class="deliveryTerms">
                                Обратная доставка товаров на склад при отказе —
                                <span>бесплатно</span>
                            </p>
                        </div>
                    </div>
                    <div class="paymentSection">
                        <div class="paymentTitle">
                            <p>Оплата картой</p>
                            <img src="./img/pen.svg" alt="pen" class="modal__btn _modal-open" data-modal-open="modal-2"/>
                        </div>
                        <div class="paymentSystem">
                            <img src="./img/mir.svg" alt="mir">
                            <p>1234 12•• •••• 1234</p>
                        </div>
                        <div class="prepayment">
                            <div class="checkboxBlock">
                                <input type="checkbox">
                                <p>Списать оплату сразу</p>
                            </div>
                            <p>Спишем оплату с карты при получении</p>
                        </div>
                    </div>
                    <div class="btnSection">
                        <button class="orderBtn">
                            Заказать
                        </button>
                        <div class="agreement">
                            <img src="./img/agreement.svg" alt="agreement">
                            <p>
                                Соглашаюсь с <span>правилами<br/> 
                                пользования торговой площадкой</span><br/>
                                и возврата
                            </p>
                        </div>
                    </div>
                </div>
            `
        }

        addListeners() {
        }

        connectedCallback() {
            if (!this.state.rendered) {
              this.render()
              this.state.rendered = true

              this.addListeners()
            }
        }

        static get observedAttributes() {
            return []
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.state.rendered) {
                this.render()
                this.addListeners()
            }
        }
    })


    customElements.define('products-in-basket', class extends HTMLElement {
        state = {
            isCollapsed: false,
            rendered: false
        }

        constructor() {
            super()
        }

        handleToggleCollapse = () => {
            this.state.isCollapsed = !this.state.isCollapsed

            this.render()
            this.addListeners()
        }

        addListeners() {
            const collapserBtn = this.getElementsByClassName('collapserBtn')[0]

            collapserBtn.addEventListener('click', (e) => {
                this.handleToggleCollapse()
            })
        }

        connectedCallback() {
            if (!this.state.rendered) {
              this.render()
              this.state.rendered = true

              this.addListeners()
            }
        }

        static get observedAttributes() {
            return []
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.state.rendered) {
                this.render()
                renderProducts()
                this.addListeners()
            }
        }

        render() {
            console.log('this.state.isCollapsed', this.state.isCollapsed)
            this.innerHTML = `
                <div class="productsInBasket ">
                <div class="productsSectionTitle">Корзина</div>
                <div class="collapserBtnSection">
                    ${
                        this.state.isCollapsed
                            ? (`
                                <div class="selectAll" style="display: flex; justify-content: space-between">
                                    <div style="font-size: 16px; line-height: 24px;">
                                        ${getProductCount()} товаров · ${getBasketTotalPrice().toLocaleString()} сом
                                    </div>
                                    <div class="collapserBtn" style="cursor: pointer;">
                                        <img style="transform: rotate(180deg);" src="./img/vector.svg" alt="vector">
                                    </div>
                                </div>
                                <img src="./img/line.svg" alt="line" style="width: 100%;">
                            `)
                            : (` 
                                <div class="selectAll">
                                    <div>
                                        <input class="selectAllInput" type="checkbox">
                                        Выбрать все
                                    </div>
                                    <div class="collapserBtn" style="cursor: pointer;">
                                        <img src="./img/vector.svg"  alt="vector">
                                    </div>
                                </div>
                                <img src="./img/line.svg" alt="line" style="width: 100%">

                                <div class="productsList" id="productsList"></div>
                            `)
                    }
                </div>
            `
            renderProducts()
        }
    })

    customElements.define('product-out', class extends HTMLElement {
        state = {
            id: undefined,
            name: undefined,
            img: undefined,
            color: undefined,
            size: undefined,
            rendered: false
        }

        constructor() {
            super()
        }

        render() {
            this.innerHTML = `
                <div class="product">
                    <div class="leftPart">
                        <div class="productMeta">
                            <img src=${this.state.imgGray}>
                            <div class="productNameSection">
                                <p class="productName">${this.state.name}</p>
                                <p class="productChar">${this.state.color}    ${this.state.size}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        connectedCallback() {
            if (!this.state.rendered) {
              this.state.id = +this.getAttribute('id')
              this.state.name = this.getAttribute('name')
              this.state.color = this.getAttribute('color')
              this.state.size = this.getAttribute('size')
              this.state.imgGray = this.getAttribute('imgGray')

              this.render()
              this.state.rendered = true

              this.addListeners()
            }
        }

        static get observedAttributes() {
            return ['count']
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.state.rendered) {
                this.state.id = +this.getAttribute('id')
                this.state.name = this.getAttribute('name')
                this.state.color = this.getAttribute('color')
                this.state.size = this.getAttribute('size')
                this.state.imgGray = this.getAttribute('imgGray')

                this.render()
                this.addListeners()
            }
        }
    })

    customElements.define('products-out', class extends HTMLElement {
        state = {
            isCollapsed: false,
            rendered: false
        }

        constructor() {
            super()
        }

        handleToggleCollapse = () => {
            this.state.isCollapsed = !this.state.isCollapsed

            this.render()
            this.addListeners()
        }

        addListeners() {
            const collapserBtn = this.getElementsByClassName('collapserBtnOut')[0]

            collapserBtn.addEventListener('click', (e) => {
                this.handleToggleCollapse()
            })
        }

        connectedCallback() {
            if (!this.state.rendered) {
              this.render()
              this.state.rendered = true

              this.addListeners()
            }
        }

        static get observedAttributes() {
            return []
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (this.state.rendered) {
                this.render()
                renderProductsOutOfStock()
                this.addListeners()
            }
        }

        render() {
            console.log('this.state.isCollapsed', this.state.isCollapsed)
            this.innerHTML = `
            <div class="productsOutStock"> 
                ${
                    this.state.isCollapsed
                        ? (`
                            <div class="productsOutStockTitle">
                                <div class="sectionToggler" style="width: 100%">
                                    <div style="display: flex; justify-content: space-between">
                                        <p style="color: #000000;">Отсутствуют · 3 товара</p>
                                        <div class="collapserBtnOut" style="cursor: pointer;">
                                            <img src="./img/vector.svg" alt="vector" style="transform: rotate(180deg);">
                                        <div/>
                                    </div>
                                </div>
                            </div>
                        `)
                        : (`
                            <div class="productsOutStockTitle">
                                <div class="sectionToggler" style="width: 100%">
                                    <div style="display: flex; justify-content: space-between">
                                        <p style="color: #000000;">Отсутствуют · 3 товара</p>
                                        <div class="collapserBtnOut" style="cursor: pointer;">
                                            <img src="./img/vector.svg" alt="vector">
                                        <div/>
                                    </div>
                                </div>
                            </div>
                            <img src="./img/line.svg" alt="line" style="width: 100%;">
                            <div class="productsOutofStockList" id="productsOutofStockList"></div>
                        `)
                }
                </div>
            `
            renderProductsOutOfStock()
        }
    })

    const getBasketTotalPrice = () => {
        return globalState.basketProducts.reduce((total, product) => {
            return total + (product.count * product.price)
        }, 0)
    }

    const getBasketOldTotalPrice = () => {
        return globalState.basketProducts.reduce((total, product) => {
            return total + (product.count * product.oldPrice)
        }, 0)
    }

    const getBasketSale = () => {
        return globalState.basketProducts.reduce((total, product) => {
            return total + (product.count * product.oldPrice - product.count * product.price)
        }, 0)
    }

    const getProductCount = () => {
        return globalState.basketProducts.length
    }

    const handleUpdateProductCount = (id, isIncrease = false) => {
        const newbasketProducts = globalState.basketProducts.map((product) => {
            if (id === product.id) {
                return ({
                    ...product,
                    count: isIncrease ? product.count + 1 : product.count - 1
                })
            }

            return product
        })

        globalState.basketProducts = newbasketProducts

        render()
    }

    const renderProductsInBasket = () => {
        const ProductsInBasketComponent = customElements.get('products-in-basket')
        const productsListElem = document.getElementById('productsInBasketRoot')

        while (productsListElem.firstChild) {
            productsListElem.removeChild(productsListElem.firstChild)
        }

        productsListElem.append(new ProductsInBasketComponent())
    }

    const renderProducts = () => {
        const ProductCardComponent = customElements.get('product-card')
        const productsListElem = document.getElementById('productsList')

        if (!productsListElem) return

        const productsListNodes = Array.from(productsListElem.childNodes)

        globalState.basketProducts.forEach(product => {
            let productCardComponent = productsListNodes.find(node => +node.getAttribute('id') === product.id)

            if (productCardComponent) { // update already existed product elements
                productCardComponent.setAttribute('id', product.id)
                productCardComponent.setAttribute('name', product.name)
                productCardComponent.setAttribute('count', product.count)
                productCardComponent.setAttribute('price', product.price)
                productCardComponent.setAttribute('oldPrice', product.oldPrice)
                productCardComponent.setAttribute('color', product.color)
                productCardComponent.setAttribute('size', product.size)
                productCardComponent.setAttribute('img', product.img)
            } else { // create new product
                const productCardComponent = new ProductCardComponent()
                productCardComponent.setAttribute('id', product.id)
                productCardComponent.setAttribute('name', product.name)
                productCardComponent.setAttribute('count', product.count)
                productCardComponent.setAttribute('price', product.price)
                productCardComponent.setAttribute('oldPrice', product.oldPrice)
                productCardComponent.setAttribute('color', product.color)
                productCardComponent.setAttribute('size', product.size)
                productCardComponent.setAttribute('img', product.img)
                productsListElem.append(productCardComponent)
            }
        })
    }

    const renderProductsOutOfStockInBasket = () => {
        const ProductsInBasketComponent = customElements.get('products-out')
        const productsListElem = document.getElementById('productsOutStockRoot')

        while (productsListElem.firstChild) {
            productsListElem.removeChild(productsListElem.firstChild)
        }

        productsListElem.append(new ProductsInBasketComponent())
    }

    const renderProductsOutOfStock = () => {
        const ProductCardComponent = customElements.get('product-out')
        const productsListElem = document.getElementById('productsOutofStockList')

        if (!productsListElem) return

        const productsListNodes = Array.from(productsListElem.childNodes)

        globalState.basketProducts.forEach(product => {
            let productCardComponent = productsListNodes.find(node => +node.getAttribute('id') === product.id)

            if (productCardComponent) { // update already existed product elements
                productCardComponent.setAttribute('id', product.id)
                productCardComponent.setAttribute('name', product.name)
                productCardComponent.setAttribute('color', product.color)
                productCardComponent.setAttribute('size', product.size)
                productCardComponent.setAttribute('imgGray', product.imgGray)
            } else { // create new product
                const productCardComponent = new ProductCardComponent()
                productCardComponent.setAttribute('id', product.id)
                productCardComponent.setAttribute('name', product.name)
                productCardComponent.setAttribute('color', product.color)
                productCardComponent.setAttribute('size', product.size)
                productCardComponent.setAttribute('imgGray', product.imgGray)
                productsListElem.append(productCardComponent)
            }
        })
    }

    const renderTotalCard = () => {
        const TotalCardComponent = customElements.get('total-card')
        const totalCardRootElem = document.getElementById('totalCardRoot')

        while (totalCardRootElem.firstChild) {
            totalCardRootElem.removeChild(totalCardRootElem.firstChild)
        }

        totalCardRootElem.append(new TotalCardComponent())
    }

    const render = () => {
        renderProductsInBasket()
        renderProductsOutOfStockInBasket()
        renderTotalCard()
    }
    
    render()

    const modalBtns = document.querySelectorAll('._modal-open');
    const modals = document.querySelectorAll('._modal');

    const body = document.body;

    function openModal(elem) {
        elem.classList.add('_active');
        body.classList.add('_locked')
    }

    function closeModal(e) {
        if (e.target.classList.contains('modal-close') || e.target.closest('.modal-close') || e.target.classList.contains('modal-bg')) {
            e.target.closest('._modal').classList.remove('_active');
            body.classList.remove('_locked')
        }
    }

    modalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let data = e.target.dataset.modalOpen;

            modals.forEach(modal => {
                if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('._modal-open').dataset.modalOpen) {
                    openModal(modal)
                }
            })
        })
    })

    modals.forEach(modal => {
        modal.addEventListener('click', e => closeModal(e))
    })

    window.addEventListener('keydown', e => {
        modals.forEach(modal => {
            if (e.key === "Escape" && modal.classList.contains('_active')) {
                modal.classList.remove('_active');
                body.classList.remove('_locked');
            }
        })
    })
}

startApp()
