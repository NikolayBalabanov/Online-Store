import { header, IProduct } from "../../index"
import { getCartArr } from "../../utils/getCartArr"
import { ICartItem } from "../Main/main"

export class Details {
    productContainer: HTMLDivElement | undefined
    constructor() {}
    render(container: HTMLElement | undefined) {
        if (container) {
            container.innerHTML = ''
            const productContainer = document.createElement('div')
            productContainer.classList.add('product')
            this.productContainer = productContainer
            // сохранить контейнер?
            container.append(productContainer)
            productContainer.append(this.createLayout(this.urlParse()))
            this.fetchProduct(this.urlParse())
        }
    }
    createLayout(id: string, data?: IProduct) {
        if (data) {
            const wrapper = document.createElement('div')
            const legend = this.createLegend(data)
            const details = this.createDetails(data)
            wrapper.append(legend, details)
            return wrapper
        } else {
            const productNutFound = document.createElement('div')
            productNutFound.innerHTML = `Product number <span>${id}</span> not found`
            return productNutFound
        }
    }
    urlParse() {
        // const [path, id] = window.location.pathname.slice(1).split('/')
        // return id
        return '2'
    }
    async fetchProduct(id: string) {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`)
            const data: IProduct = await res.json()
            if (this.productContainer) {
                this.productContainer.innerHTML = ''
                this.productContainer.append(this.createLayout(id, data))
            }
        } catch (error) {
            console.log('fail to fetch', error)
        }
    }
    createLegend(product: IProduct) {
        const legend = document.createElement('div')
        const storeLink = document.createElement('a')
        const category = document.createElement('a')
        const brand = document.createElement('a')
        const title = document.createElement('a')
        const arraw = document.createElement('span')

        legend.classList.add('product__legend')
        storeLink.classList.add('product__link')
        category.classList.add('product__link')
        brand.classList.add('product__link')
        title.classList.add('product__link')
        arraw.classList.add('product__arrow')
        
        legend.append(storeLink, arraw, category, arraw, brand, arraw, title)
        storeLink.textContent = 'STORE'
        storeLink.href = '/'
        category.textContent = `${product.category.toUpperCase()}`
        brand.textContent = `${product.brand.toUpperCase()}`
        title.textContent = `${product.title.toUpperCase()}`
        arraw.textContent = ' >> '

        return legend
    }
    createDetails(product: IProduct) {
        const details = document.createElement('div')
        const title = document.createElement('h2')
        const info = document.createElement('div')

        details.classList.add('product__details', 'details')
        title.classList.add('details__title')
        info.classList.add('details__info')
        const slider = this.createSlider(product)
        const descr = this.createProductDescr(product)
        const add = this.createProductAddTo(product)

        info.append(slider, descr, add)
        details.append(title, info)
        title.textContent = product.title

        return details
        
    }
    createSlider(product: IProduct) {
        const slider = document.createElement('div')
        const previewsWrap = document.createElement('div')
        const sliderMainView = document.createElement('div')
        const mainView = document.createElement('img')
        
        slider.classList.add('slider')
        previewsWrap.classList.add('slider__previews')
        sliderMainView.classList.add('slider__scene')
        mainView.classList.add('slider__main-view')
        mainView.src = product.images[0]
        mainView.alt = product.title
        console.log('product.images', product.images)
        product.images.forEach((el, ind) => {
            const preview = document.createElement('img')
            preview.classList.add('slider__preview')
            preview.src = product.images[ind]
            preview.alt = product.title
            previewsWrap.append(preview)

            preview.addEventListener('click', () => {
                if (mainView.src !== preview.src) {
                    mainView.src = preview.src
                }
            })
        })

        slider.append(previewsWrap, sliderMainView)
        sliderMainView.append(mainView)

        return slider
    }
    createProductDescr(product: IProduct) {
        const wrap = document.createElement('div')
        const descrWrap = document.createElement('div')
        const descrTitle = document.createElement('h3')
        const descrText = document.createElement('span')
        const discountWrap = document.createElement('div')
        const discountTitle = document.createElement('h3')
        const discountText = document.createElement('span')
        const raitingWrap = document.createElement('div')
        const raitingTitle = document.createElement('h3')
        const raitingText = document.createElement('span')
        const stockWrap = document.createElement('div')
        const stockTitle = document.createElement('h3')
        const stockText = document.createElement('span')
        const brandWrap = document.createElement('div')
        const brandTitle = document.createElement('h3')
        const brandText = document.createElement('span')
        const categoryWrap = document.createElement('div')
        const categoryTitle = document.createElement('h3')
        const categoryText = document.createElement('span')

        wrap.classList.add('descr')
        descrWrap.classList.add('descr__wrap')
        descrTitle.classList.add('descr__title')
        descrText.classList.add('descr__text')
        discountWrap.classList.add('descr__wrap')
        discountTitle.classList.add('descr__title')
        discountText.classList.add('descr__text')
        raitingWrap.classList.add('descr__wrap')
        raitingTitle.classList.add('descr__title')
        raitingText.classList.add('descr__text')
        stockWrap.classList.add('descr__wrap')
        stockTitle.classList.add('descr__title')
        stockText.classList.add('descr__text')
        brandWrap.classList.add('descr__wrap')
        brandTitle.classList.add('descr__title')
        brandText.classList.add('descr__text')
        categoryWrap.classList.add('descr__wrap')
        categoryTitle.classList.add('descr__title')
        categoryText.classList.add('descr__text')

        wrap.append(descrWrap, discountWrap, raitingWrap, stockWrap, brandWrap, categoryWrap)
        descrWrap.append(descrTitle, descrText)
        descrTitle.textContent = 'Description:'
        descrText.textContent = product.description
        discountWrap.append(discountTitle, discountText)
        discountTitle.textContent = 'Discount Percentage:'
        discountText.textContent = `${product.discountPercentage}`
        raitingWrap.append(raitingTitle, raitingText)
        raitingTitle.textContent = 'Rating:'
        raitingText.textContent = `${product.rating}`
        stockWrap.append(stockTitle, stockText)
        stockTitle.textContent = 'Stock:'
        stockText.textContent = `${product.stock}`
        brandWrap.append(brandTitle, brandText)
        brandTitle.textContent = 'Brand:'
        brandText.textContent = product.brand
        categoryWrap.append(categoryTitle, categoryText)
        categoryTitle.textContent = 'Category:'
        categoryText.textContent = product.category

        return wrap
    }
    createProductAddTo(product: IProduct) {
        const wrap = document.createElement('div')
        const content = document.createElement('div')
        const price = document.createElement('h3')
        const addToCart = document.createElement('button')
        const buy = document.createElement('a')
        
        wrap.classList.add('add-to')
        content.classList.add('add-to__content')
        price.classList.add('add-to__price')
        addToCart.classList.add('add-to__cart')
        buy.classList.add('add-to__buy')

        let cartArr = getCartArr()
        const isExist = (element: ICartItem) => element.id === product.id
        let isInCart = cartArr.find(isExist)
        wrap.append(content)
        content.append(price, addToCart, buy)
        price.textContent = `€${product.price}.00`
        addToCart.textContent = isInCart ? 'DROP FROM CART' : 'ADD TO CART'
        buy.textContent = 'BUY NOW'
        buy.href = '/cart'

        addToCart.addEventListener('click', () => {
            isInCart = cartArr.find(isExist)
            if (cartArr.length > 0) {
                if (isInCart) {
                    cartArr = cartArr.filter((element) => element.id !== product.id)
                    localStorage.setItem('cart', JSON.stringify(cartArr))
                    addToCart.textContent = 'ADD TO CART'
                    header.update()
                    return
                }
                cartArr.push({ id: product.id, price: product.price })
                localStorage.setItem('cart', JSON.stringify(cartArr))
            } else {
                cartArr.push({ id: product.id, price: product.price })
                localStorage.setItem('cart', JSON.stringify(cartArr))
            }
            addToCart.textContent = 'DROP FROM CART'
            header.update()
        })

        return wrap
    }
    update() {}
}