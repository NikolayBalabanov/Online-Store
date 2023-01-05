import './cart.css'

export class Сart {
    public cartContainer: HTMLDivElement | undefined
    // Кол-во и ID товаров, кол-во товаров на странице, промо коды 
    // изменение и удаление
    // предусмотреть очистку main__container при отображении
    // определение переменных

    // create cart page 
    constructor () {}
    public createCartContainer() {
        const cart = document.createElement('cart')
        const cartContainer = document.createElement('div')
        cartContainer.classList.add('cart__container')
        


        return cart
    }

}