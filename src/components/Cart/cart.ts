import './cart.scss'

export class cart {
    cartContainer: HTMLDivElement | undefined

    constructor () {}

    public createCartContainer() {
        const cart = document.createElement('cart')
        const cartContainer = document.createElement('div')
        cart.classList.add('cart')
        cartContainer.classList.add('cart__container', 'container')
        cart.append(cartContainer)
        this.cartContainer = cartContainer
        return cart
    }

}