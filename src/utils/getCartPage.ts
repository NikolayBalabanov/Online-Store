import { ICartPage } from "../components/Cart/cart"

export function getCartPage() {
    const pageLS = localStorage.getItem('page')
    if (pageLS && Array.isArray(JSON.parse(pageLS))) {
        let pageInnerArr: ICartPage[] = JSON.parse(pageLS)
        return pageInnerArr
    }
    return []
}