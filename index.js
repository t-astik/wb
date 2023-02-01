
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
                color: 'Цвет: белый Размер:',
                size: 56,
                isSelected: true,           
            }
            ,
            {
                id: 2,
                name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
                count: 1,
                price: 10500,
                oldPrice: 11500,
                img: "./img/iphoneCase.png",
                imgGray: "./img/iphoneCaseGray.png",
                color: 'Цвет: прозрачный',
                size: '',
                isSelected: true,           
            }
            ,
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
                isSelected: true,           

            }
        ],
        isPrepaymentSelected: false,
        isSelectedAll: true
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
            isSelected: true,
            rendered: false
        }

        constructor() {
            super()
        }

        render() {
                this.innerHTML = `
                <div class="product">
                    <div class="leftPart">
                        ${
                            this.state.isSelected ? (`
                                <input type="checkbox" class="isSelectedCheckbox" checked>    
                            `) : (`
                                <input type="checkbox" class="isSelectedCheckbox">
                            `)
                        }
                        <div class="productMeta">
                            <img src=${this.state.img}>
                            <div class="productNameSection">
                                <p class="productName">${this.state.name}</p>
                                <p class="productChar">
                                    ${this.state.color}    
                                    ${this.state.size}
                                </p>
                                <p class="stock">Коледино WB</p>
                                <p class="fabrik">OOO Вайлдберриз <img src="./img/iconGray.svg" alt="iconGray" style="margin-bottom: -5px"></p>
                            </div>
                        </div>
                    </div>
                    <div class="rightPart">
                        <div class="counterWr">
                            <div class="counter">
                                <div class="decreaseCountBtn">—</div>
                                <div>${this.state.count}</div>
                                <div class="increaseCountBtn">+</div>
                            </div>
                            <div class="likeRemoveIcons">
                                <img src="./img/like.svg" alt="like"/>
                                <img src="./img/trash.svg" alt="trash"/>
                            </div>
                        </div>
                        
                        <div class="productPriceSection">
                            <p class="newPrice">${(this.state.price * this.state.count).toLocaleString()} coм</p>
                            <p class="oldPrice">${(this.state.oldPrice * this.state.count).toLocaleString()} сом</p>
                        </div>
                    </div>
                </div>

                <div class="productMob">
                    <div class="leftPart">
                        <div class="productMeta">
                            <div class="productImg" style="background-image: url(${this.state.img})">
                                ${
                                    this.state.isSelected ? (`
                                        <input type="checkbox" class="isSelectedCheckboxMob" checked>    
                                    `) : (`
                                        <input type="checkbox" class="isSelectedCheckboxMob">
                                    `)
                                }
                                ${
                                    this.state.size.length !== 0 ? (`
                                        <div class="productSizeMob">${this.state.size}</div>
                                    `) : ''
                                }
                            </div>
                            <div class="productNameSection">
                                <div class="productPriceSection">
                                    <p class="newPrice">${(this.state.price * this.state.count).toLocaleString()} coм</p>
                                    <p class="oldPrice">${(this.state.oldPrice * this.state.count).toLocaleString()} сом</p>
                                </div>
                                <p class="productName">${this.state.name}</p>
                                <p class="productChar">${this.state.color}    ${this.state.size}</p>
                                <p class="stock">Коледино WB</p>
                                <p class="fabrik">OOO Вайлдберриз <img src="./img/iconGray.svg" alt="iconGray" style="margin-bottom: -5px"></p>
                            </div>
                        </div>
                    </div>
                    <div class="rightPart">
                        <div class="counter">
                            <div class="decreaseCountBtnMob">—</div>
                            <div>${this.state.count}</div>
                            <div class="increaseCountBtnMob">+</div>
                        </div>
                        <div class="likeRemoveIcons">
                            <img src="./img/like.svg" alt="like"/>
                            <img src="./img/trash.svg" alt="trash"/>
                        </div>
                    </div>
                </div>
            `
            initModals()
        }

        addListeners() {
            const increaseCountBtn = this.getElementsByClassName('increaseCountBtn')[0]
            const increaseCountBtnMob = this.getElementsByClassName('increaseCountBtnMob')[0]

            increaseCountBtn.addEventListener('click', (e) => {
                handleUpdateProductCount(this.state.id, true)
            })
            increaseCountBtnMob.addEventListener('click', (e) => {
                handleUpdateProductCount(this.state.id, true)
            })

            const decreaseCountBtn = this.getElementsByClassName('decreaseCountBtn')[0]
            const decreaseCountBtnMob = this.getElementsByClassName('decreaseCountBtnMob')[0]

            decreaseCountBtn.addEventListener('click', (e) => {
                handleUpdateProductCount(this.state.id, false)
            })
            decreaseCountBtnMob.addEventListener('click', (e) => {
                handleUpdateProductCount(this.state.id, false)
            })

            const isSelectedCheckbox = this.getElementsByClassName('isSelectedCheckbox')[0]
            const isSelectedCheckboxMob = this.getElementsByClassName('isSelectedCheckboxMob')[0]


            isSelectedCheckbox.addEventListener('click', (e) => {
                handleUpdateProductIsSelected(this.state.id)
            })
            isSelectedCheckboxMob.addEventListener('click', (e) => {
                handleUpdateProductIsSelected(this.state.id)
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
              this.state.isSelected = this.getAttribute('isSelected') === 'false' ? false : true


              this.render()
              this.state.rendered = true

              this.addListeners()
            }
        }

        static get observedAttributes() {
            return ['count', 'isSelected']
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
                this.state.isSelected = this.getAttribute('isSelected') === 'false' ? false : true
                

                this.render()
                this.addListeners()
            }
        }
    })

    customElements.define('total-card', class extends HTMLElement {
        state = {
            rendered: false,
        }

        constructor() {
            super()
        }

        handleToggleCheck = () => {
            globalState.isPrepaymentSelected = !globalState.isPrepaymentSelected

            this.render()
            render()
            this.addListeners()
        }

        addListeners() {
            const prepaymentCheckbox = this.getElementsByClassName('prepaymentCheckbox')[0]

            prepaymentCheckbox.addEventListener('click', (e) => {
                this.handleToggleCheck()
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
                this.addListeners()
            }
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
                                <br/>
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
                                ${
                                    globalState.isPrepaymentSelected ? (`
                                        <input type="checkbox" class="prepaymentCheckbox" checked>    
                                    `) : (`
                                        <input type="checkbox" class="prepaymentCheckbox" >
                                    `)
                                }
                                <p>Списать оплату сразу</p>
                            </div>
                            <p>Спишем оплату с карты при получении</p>
                        </div>
                    </div>
                    <div class="btnSection">
                        ${
                            globalState.isPrepaymentSelected ? (`
                                <button class="orderBtn">
                                    Оплатить ${getBasketTotalPrice().toLocaleString()} сом
                                </button>    
                            `) : (`
                                <button class="orderBtn">
                                    Заказать
                                </button>
                            `)
                        }
                        <div class="agreement">
                            <img src="./img/agreement.svg" alt="agreement">
                            <p class="agreementPar">
                                Соглашаюсь с <span>правилами 
                                пользования торговой площадкой</span>
                                и возврата
                            </p>
                        </div>
                    </div>
                </div>
            `
            initModals()
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

        handleToggleIsSelectedAll = () => {
            globalState.isSelectedAll = !globalState.isSelectedAll

            const newbasketProducts = globalState.basketProducts.map((product) => {
                return ({
                    ...product,
                    isSelected: globalState.isSelectedAll 
                })
            })
    
            globalState.basketProducts = newbasketProducts
    
            this.render()
            render()
            this.addListeners()
        }

        addListeners() {
            const collapserBtn = this.getElementsByClassName('collapserBtn')[0] 

            collapserBtn.addEventListener('click', (e) => {
                this.handleToggleCollapse()
            })

            const isSelectedAll = this.getElementsByClassName('selectAllInput')[0]

            isSelectedAll.addEventListener('click', (e) => {
                this.handleToggleIsSelectedAll()
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
                                <img class="selectAllLine" src="./img/line.svg" alt="line">
                            `)
                            : (` 
                                <div class="selectAll">
                                    <div>
                                    ${
                                        globalState.isSelectedAll ? (`
                                            <input type="checkbox" class="selectAllInput" checked>    
                                        `) : (`
                                            <input type="checkbox" class="selectAllInput" >
                                        `)
                                    }
                                        Выбрать все
                                    </div>
                                    <div class="collapserBtn" style="cursor: pointer;">
                                        <img src="./img/vector.svg"  alt="vector">
                                    </div>
                                </div>
                                <img class="selectAllLine" src="./img/line.svg" alt="line" style="width: 100%">

                                <div class="productsList" id="productsList"></div>
                            `)
                    }
                </div>
            `
            renderProducts()
            initModals()
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
                <div class="productOut">
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
            initModals()
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
            initModals()
        }
    })

    customElements.define('delivery-method', class extends HTMLElement {
        state = {
            pointIssue: true,
            courier: false,
            rendered: false
        }

        constructor() {
            super()
        }

        handleTogglePointIssue = () => {
            this.state.pointIssue = !this.state.pointIssue

            this.render()
            this.addListeners()
        }

        handleToggleCourier = () => {
            this.state.courier = !this.state.courier

            this.render()
            this.addListeners()
        }

        addListeners() {
            const pointIssueBtn = this.getElementsByClassName('pointIssueBtn')[0]

            pointIssueBtn.addEventListener('click', (e) => {
                this.handleTogglePointIssue()
            })
        }

        addListeners() {
            const courierBtn = this.getElementsByClassName('courierBtn')[0]

            courierBtn.addEventListener('click', (e) => {
                this.handleToggleCourier()
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
            this.innerHTML = `
                <div class="_modal" data-modal="modal-1">
                    <div class="modal-bg">
                        <div class="modal-body">
                            <div class="modal-close"><img src="img/close.svg" alt=""></div>
                            <div class="modal-content modal-callback">
                                <div class="modal-callback__title" id="delivery">Способ доставки</div>
                                <div class="modal-callback__text">
                                    
                                    ${
                                        this.state.pointIssue ? (
                                            `
                                                <div class="deliveryModal-btns">
                                                    <div class="pointIssueBtn activeDeliveryBtn">В пункт выдачи</div>
                                                    <div class="courierBtn">Курьером</div>
                                                </div>
                                                <div class="deliveryModal-body">
                                                    <p>Мои адреса</p>
                                                    <div class="addressItem">
                                                        <div class="addressItem-left">
                                                            <input type="radio" id="Табышалиева" name="fav_language" value="Табышалиева">
                                                            <label for="html">г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1</label><br>
                                                            <div><img src="img/star.svg" alt="star">Пункт выдачи</div>
                                                        </div>
                                                        <img src="./img/trash.svg" alt="trash.svg">
                                                    </div>
                                                    <div class="addressItem">
                                                        <div class="addressItem-left">
                                                            <input type="radio" id="Жукеева-Пудовкина" name="fav_language" value="Жукеева-Пудовкина">
                                                            <label for="html">г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1</label><br>
                                                            <div><img src="img/star.svg" alt="star"><span>4.99</span>Пункт выдачи</div>
                                                        </div>
                                                        <img src="./img/trash.svg" alt="trash.svg">
                                                    </div>
                                                    <div class="addressItem">
                                                        <div class="addressItem-left">
                                                            <input type="radio" id="Ахунбаева" name="fav_language" value="Ахунбаева">
                                                            <label for="html">г. Бишкек, улица Табышалиева, д. 57</label><br>
                                                            <div><img src="img/star.svg" alt="star"><span>4.99</span>Пункт выдачи</div>
                                                        </div>
                                                        <img src="./img/trash.svg" alt="trash.svg">
                                                    </div>
                                                </div>
                                            `
                                        ) : (
                                            `
                                                <div class="deliveryModal-btns">
                                                    <div class="pointIssueBtn">В пункт выдачи</div>
                                                    <div class="courierBtn activeDeliveryBtn">Курьером</div>
                                                </div>
                                                <div class="deliveryModal-body">
                                                    <p>Мои адреса</p>
                                                    <div class="addressItem">
                                                        <div class="addressItem-left">
                                                            <input type="radio" id="Табышалиева" name="fav_language" value="Табышалиева">
                                                            <label for="html">Бишкек, улица Табышалиева, 57</label><br>
                                                        </div>
                                                        <img src="./img/trash.svg" alt="trash.svg">
                                                    </div>
                                                    <div class="addressItem">
                                                        <div class="addressItem-left">
                                                            <input type="radio" id="Жукеева-Пудовкина" name="fav_language" value="Жукеева-Пудовкина">
                                                            <label for="html">Бишкек, улица Жукеева-Пудовкина, 77/1</label><br>
                                                        </div>
                                                        <img src="./img/trash.svg" alt="trash.svg">
                                                    </div>
                                                    <div class="addressItem">
                                                        <div class="addressItem-left">
                                                            <input type="radio" id="Ахунбаева" name="fav_language" value="Ахунбаева">
                                                            <label for="html">Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1</label><br>
                                                        </div>
                                                        <img src="./img/trash.svg" alt="trash.svg">
                                                    </div>
                                                </div>
                                            `
                                        )
                                    }
                                    <div class="deliveryModal-footer">
                                        <button>
                                            Выбрать
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            renderProducts()
            initModals()
        }
    })

    const getBasketTotalPrice = () => {
        return globalState.basketProducts.reduce((total, product) => {
            if (product.isSelected) {
                return total + (product.count * product.price)
            } else {
                return total
            }
        }, 0)
    }

    const getBasketOldTotalPrice = () => {
        return globalState.basketProducts.reduce((total, product) => {
            if (product.isSelected) {
                return total + (product.count * product.oldPrice)
            } else {
                return total
            }
        }, 0)
    }

    const getBasketSale = () => {
        return globalState.basketProducts.reduce((total, product) => {
            if (product.isSelected) {
                return total + (product.count * product.oldPrice - product.count * product.price)
            } else {
                return total
            }
        }, 0)
    }

    const getProductCount = () => {
        return globalState.basketProducts.length
    }

    const handleUpdateProductIsSelected = (id) => {
        const newbasketProducts = globalState.basketProducts.map((product) => {
            if (id === product.id) {
                return ({
                    ...product,
                    isSelected: product.isSelected = !product.isSelected
                })
            }

            return product
        })

        globalState.basketProducts = newbasketProducts

        render()
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
                productCardComponent.setAttribute('isSelected', product.isSelected)
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
                productCardComponent.setAttribute('isSelected', product.isSelected)
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

    const renderDeliveryModal = () => {
        const TotalCardComponent = customElements.get('delivery-method')
        const totalCardRootElem = document.getElementById('deliveryMethod')

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
    
    


    const initModals = () => {
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
    render()
    initModals() 
}

startApp()
