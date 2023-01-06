import './cart.css'

export class Cart {
    public cartContainer: HTMLDivElement | undefined
    // Кол-во и ID товаров, кол-во товаров на странице, промо коды 
    // изменение и удаление
    // предусмотреть очистку main__container при отображении
    // определение переменных

    // create cart page 
    constructor () {}
    public createCartContainer() {
        const cartContainer = document.createElement('div')
        const cartWrapper = document.createElement('div')
        cartWrapper.classList.add('cart__wrapper')
        cartContainer.classList.add('cart__container')
        cartContainer.append(cartWrapper)
        cartWrapper.append(this.createProductsContainer(),
        this.createSummaryContainer())
             
        return cartContainer
    }

    public createProductsContainer() {
        const productsContainer = document.createElement('div')
        productsContainer.classList.add('products__container')
        productsContainer.append(this.createProductControl(), 
        this.createProductsItems())

        return productsContainer
    }
    
    public createSummaryContainer() {
        const summaryContainer = document.createElement('div')
        summaryContainer.classList.add('summary__container')

        return summaryContainer

    }

    public createProductControl() {
        const productControl = document.createElement('div')
        const titleName = document.createElement('h2')
        const pageControl = document.createElement('div')
        const limitPages = document.createElement('div')
        const limitName = document.createElement('span')
        const limitInput = document.createElement('input')
        const pageNumberContainer = document.createElement('div')
        const pageName = document.createElement('span')
        const pageButtonLeft = document.createElement('button')
        const pageButtonRight = document.createElement('button')
        const pageNumber = document.createElement('span')

        productControl.classList.add('product__control')
        pageControl.classList.add('pages__control')
        limitPages.classList.add('limit__pages')
        limitInput.classList.add('limit_page_input', 'limit_input')
        pageNumberContainer.classList.add('page__number')
        pageButtonLeft.classList.add('limit_page_input', 'limit_button1')
        pageButtonRight.classList.add('limit_page_input', 'limit_button2')
        pageNumber.classList.add('page_number')
      
        // Присвоить переменную для ввода input +
        // pageNumber - число страниц товаров

        titleName.textContent = 'Products In Cart'
        limitName.textContent = 'LIMIT: '
        limitInput.placeholder = '1'
        limitInput.min ='1'
        limitInput.type = 'number'
        pageName.textContent = ' PAGE: '
        pageButtonLeft.textContent = ' < '
        pageButtonRight.textContent = ' > '
        pageNumber.textContent = ' 1 '
      
        productControl.append(titleName, pageControl)
        pageControl.append(limitPages)
        limitPages.append(limitName, limitInput)
        pageControl.append(pageNumberContainer)
        pageNumberContainer.append(pageName, pageButtonLeft, pageNumber, pageButtonRight)

        return productControl
    }
// - - -      тут заполнить items товары - - -
    public createProductsItems () {
        const productsItems = document.createElement('div')
        productsItems.classList.add('product__items')
        productsItems.append(this.createCartItem(),
        this.createCartItem(),
        this.createCartItem())

        return productsItems
    }
// заполняем строку товара
    public createCartItem () {
        const cartItem = document.createElement('div')
        const item_i = document.createElement('div')
        const itemNumber = document.createElement('span')

        cartItem.classList.add('cart__item')
        item_i.classList.add('item_i')
        itemNumber.textContent = '1'

        cartItem.append(item_i)
        item_i.append(itemNumber)
        cartItem.append(this.createItemInfo())

        return cartItem
    }

    public createItemInfo () {
        const itemInfo = document.createElement('div')
        const itemImage = document.createElement('img')

        itemInfo.classList.add('item_info')
        itemImage.classList.add('item_image')
        itemImage.alt = 'image'
        itemImage.src = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg' // присвоить переменную

        itemInfo.append(itemImage)

        return itemInfo
    }

}