import { getCartArr } from '../../utils/getCartArr'
import './header.scss'

export class Header {
    price: HTMLSpanElement | undefined
    cartCnt: HTMLSpanElement | undefined
    
    constructor() {}
    public createLayout() {
        const header = document.createElement('header')
        const headerContainer = document.createElement('div')
        headerContainer.classList.add('container', 'header__container')
        header.classList.add('header')
        headerContainer.append(this.createBradLinkItem(), this.createTotalPriceItem(), this.createCartItem())
        header.append(headerContainer)

        return header
    }
    public createBradLinkItem() {
        const link = document.createElement('a')
        const logo = document.createElement('div')
        const brand = document.createElement('h1')

        link.classList.add('header__link')
        logo.classList.add('header__logo')
        brand.classList.add('header__brand')

        link.href = '/'
        logo.textContent = '🛍'
        brand.textContent = 'Online Store'

        link.append(logo, brand)

        return link
    }
    public createTotalPriceItem() {
        const priceWrap = document.createElement('div')
        const priceText = document.createElement('span')
        const priceValue = document.createElement('span')
        this.price = priceValue

        priceWrap.classList.add('header__total-price')
        priceText.classList.add('header__text')
        priceValue.classList.add('header__price')

        priceWrap.append(priceText, priceValue)
        priceText.textContent = 'Cart total:'
        priceValue.textContent = ' €0.00 '
        
        return priceWrap
    }
    public createCartItem() {
        const cartWrap = document.createElement('a')
        const cartCnt = document.createElement('span')
        this.cartCnt = cartCnt

        cartWrap.classList.add('header__cart')
        cartCnt.classList.add('header__cart-cnt')

        cartWrap.href = '/cart'
        cartWrap.append(cartCnt)
        cartCnt.textContent = '0'

        return cartWrap
    }
    public update() {
        const cartArr = getCartArr()
        if (this.price && this.cartCnt && cartArr.length > 0) {
            const cnt = cartArr.reduce((acc, cur) => acc + cur.count, 0).toString()
            const price = cartArr.reduce((acc, cur) => acc + cur.price * cur.count, 0).toString()
            this.price.textContent = `€${price}.00`
            this.cartCnt.textContent = `${cnt}`
        } else {
            if (this.price && this.cartCnt && cartArr.length === 0) {
                this.price.textContent = '€0.00'
                this.cartCnt.textContent = '0'
            } 
        }
    }
}