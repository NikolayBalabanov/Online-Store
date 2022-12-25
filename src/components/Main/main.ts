import { header, IProduct } from "../../index"
import { getCartArr } from "../../utils/getCartArr"
import './main.scss'

export interface ICartItem {
    id: number
    price: number
}

export class Main {
    price: HTMLDivElement | undefined
    priceInfo: HTMLDivElement | undefined
    priceStart: HTMLInputElement | undefined
    priceFinish: HTMLInputElement | undefined
    stockInfo: HTMLDivElement | undefined
    stockStart: HTMLInputElement | undefined
    stockFinish: HTMLInputElement | undefined
    mainContainer: HTMLDivElement | undefined
    cardsContainer: HTMLDivElement | undefined
    constructor() {}

    public createMainContainer() {
        const main = document.createElement('main')
        const mainContainer = document.createElement('div')
        main.classList.add('main')
        mainContainer.classList.add('main__container', 'container')
        main.append(mainContainer)
        this.mainContainer = mainContainer
        return main
    }

    public createProductsLayout() {
        const filters = this.createFiltersContainer()
        const products = this.createProductsContainer()
        if (this.mainContainer) {
            this.mainContainer.append(filters, products)
        }
    }
    private createFiltersContainer() {
        const filtersWrap = document.createElement('div')
        filtersWrap.classList.add('main__filters', 'filters')
        const filtersControls = this.createFilterControls()
        const categoryFilterWrap = this.createFilterWrap('category')
        const brandFilterWrap = this.createFilterWrap('brand')
        const priceSliderWrap = this.createPriceSliderWrap()
        const stockSliderWrap = this.createStockSliderWrap()

        filtersWrap.append(filtersControls, categoryFilterWrap, brandFilterWrap, priceSliderWrap, stockSliderWrap)

        return filtersWrap
    }
    private createFilterControls() {
        const controlsWrap = document.createElement('div')
        const resetFilters = document.createElement('a')
        const copyURL = document.createElement('button')

        controlsWrap.classList.add('filters__controls')
        resetFilters.classList.add('main__btn')
        copyURL.classList.add('main__btn')

        controlsWrap.append(resetFilters, copyURL)
        resetFilters.href = '/'
        resetFilters.textContent = 'Reset Filters'
        copyURL.textContent = 'Copy Link'

        copyURL.addEventListener('click', () => {
            console.log()
            navigator.clipboard.writeText(window.location.href)
            copyURL.textContent = 'Copied!'
            setTimeout(() => {copyURL.textContent = 'Copy Link'}, 400)
        })

        return controlsWrap
    }
    private createFilterWrap(filter: string) {
        const wrap = document.createElement('div')
        const title = document.createElement('h3')
        const list = document.createElement('ul')

        wrap.classList.add(`filters__${filter}`, `${filter}`)
        title.classList.add(`${filter}__title`)
        list.classList.add(`${filter}__list`, 'list-reset')
        
        wrap.append(title, list)
        title.textContent = `${filter[0].toUpperCase() + filter.slice(1)}`

        return wrap
    }
    private createPriceSliderWrap() {
        const wrap = document.createElement('div')
        const title = document.createElement('h3')
        const valueInfo = document.createElement('div')
        const sliderContainer = document.createElement('div')
        const startInputRange = document.createElement('input')
        const finishInputRange = document.createElement('input')

        wrap.classList.add(`filters__slider`, `slider`)
        title.classList.add(`slider__title`)
        valueInfo.classList.add(`slider__info`)
        sliderContainer.classList.add('slider__ranges')
        startInputRange.classList.add('slider__range')
        finishInputRange.classList.add('slider__range')
        this.priceInfo = valueInfo
        this.priceStart = startInputRange
        this.priceFinish = finishInputRange
        
        wrap.append(title, valueInfo, sliderContainer)
        sliderContainer.append(startInputRange, finishInputRange)
        title.textContent = 'Price'
        valueInfo.textContent = 'NOT FOUND'
        startInputRange.type = 'range'
        startInputRange.min = '0'
        startInputRange.max = '-1'
        finishInputRange.type = 'range'
        finishInputRange.min = '0'
        finishInputRange.max = '-1'

        return wrap
    }
    private createStockSliderWrap() {
        const wrap = document.createElement('div')
        const title = document.createElement('h3')
        const valueInfo = document.createElement('div')
        const sliderContainer = document.createElement('div')
        const startInputRange = document.createElement('input')
        const finishInputRange = document.createElement('input')

        wrap.classList.add(`filters__slider`, `slider`)
        title.classList.add(`slider__title`)
        valueInfo.classList.add(`slider__info`)
        sliderContainer.classList.add('slider__ranges')
        startInputRange.classList.add('slider__range')
        finishInputRange.classList.add('slider__range')
        this.stockInfo = valueInfo
        this.stockStart = startInputRange
        this.stockFinish = finishInputRange
        
        wrap.append(title, valueInfo, sliderContainer)
        sliderContainer.append(startInputRange, finishInputRange)
        title.textContent = 'Stock'
        valueInfo.textContent = 'NOT FOUND'
        startInputRange.type = 'range'
        startInputRange.min = '0'
        startInputRange.max = '-1'
        finishInputRange.type = 'range'
        finishInputRange.min = '0'
        finishInputRange.max = '-1'

        return wrap
    }
    private createProductsContainer() {
        const main = document.createElement('div')
        const mainContainer = document.createElement('div')
        const productsControls = this.createProductsControls()
        const productsCardsWrap = this.createProductsItemsWrap()
        const productsNotFound = this.createProductsNotFound()
        main.classList.add('main__products', 'products')
        mainContainer.classList.add('products__container')
        main.append(mainContainer)
        mainContainer.append(productsControls, productsCardsWrap, productsNotFound)
        return main
    }
    private createProductsControls() {
        const controlsWrap = document.createElement('div')

        const sortWrap = document.createElement('div')
        const sortSelect = document.createElement('select')
        const optionPlaceholder = document.createElement('option')
        const optionPriceASC = document.createElement('option')
        const optionPriceDESC = document.createElement('option')
        const optionRatingASC = document.createElement('option')
        const optionRatingDESC = document.createElement('option')
        const optionDiscountASC = document.createElement('option')
        const optionDiscountDESC = document.createElement('option')

        const found = document.createElement('div')
        const searchBar = document.createElement('div')
        const searchInput = document.createElement('input')

        const viewSwitchers = document.createElement('div')
        const viewSmall = document.createElement('div')
        const viewBig = document.createElement('div')

        controlsWrap.classList.add('products__controls', 'controls')

        sortWrap.classList.add('controls__sort-wrap')
        sortSelect.classList.add('controls__sort')
        optionPlaceholder.classList.add('controls__placeholder')

        found.classList.add('controls__found') //TODO: common css class for text?
        searchBar.classList.add('controls__search-bar')
        searchInput.classList.add('controls__search')

        viewSwitchers.classList.add('controls__switchers')
        viewSmall.classList.add('controls__view')
        viewBig.classList.add('controls__view', 'controls__view--active')

        controlsWrap.append(sortWrap, found, searchBar, viewSwitchers)

        sortWrap.append(sortSelect)
        sortSelect.append(optionPlaceholder, optionPriceASC, optionPriceDESC, optionRatingASC, optionRatingDESC, optionDiscountASC, optionDiscountDESC)
        optionPlaceholder.textContent = 'Sort options'
        optionPlaceholder.selected = true
        optionPlaceholder.disabled = true
        optionPriceASC.value = 'price-ASC'
        optionPriceASC.textContent = 'Sort by price ASC'
        optionPriceDESC.value = 'price-DESC'
        optionPriceDESC.textContent = 'Sort by price DESC'
        optionRatingASC.value = 'rating-ASC'
        optionRatingASC.textContent = 'Sort by rating-ASC'
        optionRatingDESC.value = 'rating-DESC'
        optionRatingDESC.textContent = 'Sort by rating DESC'
        optionDiscountASC.value = 'discount-ASC'
        optionDiscountASC.textContent = 'Sort by discount ASC'
        optionDiscountDESC.value = 'discount-DESC'
        optionDiscountDESC.textContent = 'Sort by discount DESC'

        found.textContent = 'Found: 0'
        searchBar.append(searchInput)
        searchInput.type = 'search'
        searchInput.placeholder = 'Search product'

        viewSwitchers.append(viewSmall, viewBig)
        for (let i = 0; i < 36; i++) {
            const decorItem = document.createElement('div')
            decorItem.classList.add('view-item')
            viewSmall.append(decorItem)
        }
        for (let i = 0; i < 16; i++) {
            const decorItem = document.createElement('div')
            decorItem.classList.add('view-item')
            viewBig.append(decorItem)
        }

        sortSelect.addEventListener('change', () => {
            // запустить функцию перерисовки контента продуктов
            // с учётом обновления URL
            // с учётом состояния URL
            // Обновляются:
            // карточки(их порядок)
            // состояние селекта
            // состояние всех элемонтов фильтрации
            // состояние кнопок размера контента
            // состояние корзины и тоталпрайса
            // Где будет эта функция и как она до всего достучится.
            // appUpdate()
        })

        searchInput.addEventListener('input', () => {
            // appUpdate()
            // перерисовка контента карточек
            // сохранить стейт поиска в URL
        })
        viewSmall.addEventListener('click', () => {
            // снять подсветку
            // подсветить кликнутую кнопку
            // повесить класс на карочки
        })
        viewBig.addEventListener('click', () => {
            // снять подсветку
            // подсветить кликнутую кнопку
            // снять класс на карочках
        })

        return controlsWrap
    }
    private createProductsItemsWrap() {
        const productsCards = document.createElement('div')
        productsCards.classList.add('products__cards', 'cards')
        this.cardsContainer = productsCards
        return productsCards
    }
    private createProductsNotFound() {
        const notFoundWrap = document.createElement('div')
        notFoundWrap.classList.add('products__not-found')
        notFoundWrap.textContent = 'No products found 😏'
        return notFoundWrap
    }
    private fillCategoryesFilter() {
        // получает массив объектов [
        // {category: string. current: string, stock: string, checked: boolean}
        // ]
    }
    private fillBrandsFilters() {
        // получает массив объектов [
        // {brand: string, current: string, stock: string, checked: boolean}
        // ]
    }
    private setPriceSlider() {
        // хз
    }
    private setStockSlider() {
        // хз
    }
    private createCard() {
        // получает объект { isInCart: boolean, isBig: boolean, data: ICardData }
    }
    private setSort() {
        // получает значение сортировки и устанавливает ее
    }
    private setFound() {
        // получает значение количества товаров и устанавливает его в this.found
    }
    private setSearch() {
        // получает значение сортировки и устанавливает его в поле сортировки
    }
    private changeSize() {
        // принимает false/true и устанавливает/снимает класс размера у this.cards
    }
    private renderCards(newData: IProduct[]) {
        newData.forEach((el: IProduct) => {
            const card = document.createElement('div')
            const cardWrap = document.createElement('div')
            const cardTextContent = document.createElement('div')
            const cardTitle = document.createElement('h3')
            const cardInfo = document.createElement('div')
            const cardCategory = document.createElement('p')
            const cardCategoryAttr = document.createElement('span')
            const cardBrand = document.createElement('p')
            const cardBrandAttr = document.createElement('span')
            const cardPrice = document.createElement('p')
            const cardPriceAttr = document.createElement('span')
            const cardDiscount = document.createElement('p')
            const cardDiscountAttr = document.createElement('span')
            const cardRating = document.createElement('p')
            const cardRatingAttr = document.createElement('span')
            const cardStock = document.createElement('p')
            const cardStockAttr = document.createElement('span')
            const cardControls = document.createElement('div')
            const cardCartBtn = document.createElement('button')
            const cardDetails = document.createElement('a')

            card.classList.add('card')
            cardWrap.classList.add('card__wrap')
            cardTextContent.classList.add('card__text-content')
            cardTitle.classList.add('card__title')
            cardInfo.classList.add('card__info')
            cardCategory.classList.add('card__text')
            cardBrand.classList.add('card__text')
            cardPrice.classList.add('card__text')
            cardDiscount.classList.add('card__text')
            cardRating.classList.add('card__text')
            cardStock.classList.add('card__text')
            cardControls.classList.add('card__btns')
            cardCartBtn.classList.add('card__add')
            cardDetails.classList.add('card__details')
            cardCategoryAttr.classList.add('card__attrebute')
            cardBrandAttr.classList.add('card__attrebute')
            cardPriceAttr.classList.add('card__attrebute')
            cardDiscountAttr.classList.add('card__attrebute')
            cardRatingAttr.classList.add('card__attrebute')
            cardStockAttr.classList.add('card__attrebute')

            card.append(cardWrap)
            cardWrap.append(cardTextContent, cardControls)
            cardWrap.style.background = `url(${el.thumbnail}) 0% 0% / cover`
            cardTextContent.append(cardTitle, cardInfo)
            cardTitle.textContent = el.title
            cardInfo.append(cardCategory, cardBrand, cardPrice, cardDiscount, cardRating, cardStock)
            cardCategory.append(cardCategoryAttr)
            cardBrand.append(cardBrandAttr)
            cardPrice.append(cardPriceAttr)
            cardDiscount.append(cardDiscountAttr)
            cardRating.append(cardRatingAttr)
            cardStock.append(cardStockAttr)
            cardCategory.textContent = el.category
            cardBrand.textContent = el.brand
            cardPrice.textContent = `€${el.price.toString()}.00`
            cardDiscount.textContent = `${el.discountPercentage.toString()}%`
            cardRating.textContent = el.rating.toString()
            cardStock.textContent = el.stock.toString()
            cardControls.append(cardCartBtn, cardDetails)
            cardCategoryAttr.textContent = 'Category:'
            cardBrandAttr.textContent = 'Brand:'
            cardPriceAttr.textContent = 'Price:'
            cardDiscountAttr.textContent = 'Discount:'
            cardRatingAttr.textContent = 'Rating:'
            cardStockAttr.textContent = 'Stock:'
            cardDetails.textContent = 'DETAILS'
            cardDetails.href = `/product-details/${el.id}`
            const isExist = (element: ICartItem) => element.id === el.id
            const cartArr = getCartArr()
            cardCartBtn.textContent = cartArr.find(isExist) ? 'DROP FROM CART' : 'ADD TO CART'
            // add/remove class cardCartBtn
            cardCartBtn.addEventListener('click', () => {
                let cartArr = getCartArr()
                if (cartArr.length > 0) {
                    if (cartArr.find(isExist)) {
                        cartArr = cartArr.filter((element) => element.id !== el.id)
                        localStorage.setItem('cart', JSON.stringify(cartArr))
                        cardCartBtn.textContent = 'ADD TO CART'
                        // remove class cardCartBtn
                        header.update()
                        return
                    }
                    cartArr.push({ id: el.id, price: el.price })
                    localStorage.setItem('cart', JSON.stringify(cartArr))
                } else {
                    cartArr.push({ id: el.id, price: el.price })
                    localStorage.setItem('cart', JSON.stringify(cartArr))
                }
                cardCartBtn.textContent = 'DROP FROM CART'
                    // add class cardCartBtn
                header.update()
            })

            this.cardsContainer?.append(card)
        });
    }

    public update(data: IProduct[] | null) {
        console.log('тут будет код для обновления')
        console.log(data)
        if (data) {
            let  newData = data.slice()
            this.renderCards(newData)
        }
    }
}