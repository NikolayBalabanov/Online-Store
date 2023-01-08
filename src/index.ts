import './global.css'
import { Router } from "./router/router";

import { Header } from "./components/Header/header";
import { Footer } from './components/Footer/footer';
import { Main } from './components/Main/main';
import { Cart } from './components/Cart/cart';
import { Details } from './components/Details/details';
import { Modal } from './components/Modal/madal';

interface IFetchData {
    limit: number
    products: IProduct[]
    skip: number
    total: number 
}

export interface IProduct {
    brand: string
    category: string
    description: string
    discountPercentage: number
    id: number
    images: string[]
    price: number
    rating: number
    stock: number
    thumbnail: string
    title: string
}

export let appData: IProduct[] | null = null
export let isModalOpen = { state: false }

export const header = new Header()
const footer = new Footer()
export const main = new Main()
export const cart = new Cart()
export const details = new Details()
export const modal = new Modal()

document.body.append(header.createLayout())
document.body.append(main.createMainContainer())
//document.body.append(cart.createCartContainer())
document.body.append(footer.createLayout())
main.createProductsLayout()
async function fetchData() {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data : IFetchData = await response.json()
    appData = data.products.map(el => {
        if (el.brand === "APPle") {
            el.brand = 'Apple'
        }
        return el
    })
    switch(window.location.pathname) {
        case '/':
            main.update(appData)
            header.update()
            break
        case '/cart':
            cart.CartLayout(appData) // проба с передачей appData
            // cart.update(appData) метод, обновляющий контент карзины. Может и полностью ререндерить
            header.update()
            break
        default:
            break

    }
}
fetchData()

Router()
