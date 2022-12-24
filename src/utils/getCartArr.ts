import { ICartItem } from "../components/Main/main"

export function getCartArr() {
    const cartLS = localStorage.getItem('cart')
    if (cartLS && Array.isArray(JSON.parse(cartLS))) {
        let cartInnerArr: ICartItem[] = JSON.parse(cartLS)
        return cartInnerArr
    }
    return []
}