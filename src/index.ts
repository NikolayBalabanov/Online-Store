import './global.css'
import { Router } from "./router/router";

import { Header } from "./components/Header/header";
import { Footer } from './components/Footer/footer';
import { Main } from './components/Main/main';
import { Details } from './components/Details/details';

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

export const header = new Header()
const footer = new Footer()
export const main = new Main()
export const details = new Details()

document.body.append(header.createLayout())
document.body.append(main.createMainContainer())
document.body.append(footer.createLayout())
main.createProductsLayout()
async function fetchData() {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data : IFetchData = await response.json()
    console.log(data)
    appData = data.products.map(el => {
        if (el.brand === "APPle") {
            el.brand = 'Apple'
        }
        return el
    })
    main.update(appData)
    // header.update()
}
fetchData()

Router()
