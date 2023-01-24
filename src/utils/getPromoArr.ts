export type TPromo = string[]

export function getPromoArr() {
    const promoLS = localStorage.getItem('promo')
    if (promoLS && Array.isArray(JSON.parse(promoLS))) {
        let promoInnerArr: TPromo = JSON.parse(promoLS)
        return promoInnerArr
    }
    return []
}