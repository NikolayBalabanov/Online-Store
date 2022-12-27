import { header, IProduct } from "../../index"
import { getCartArr } from "../../utils/getCartArr"
import './main.scss'

enum QueryOptions {
    category = 'category',
    brand = 'brand',
    price = 'price',
    stock = 'stock',
    sort = 'sort',
    search = 'search',
    big = 'big'
}

enum Sorts {
    priseUp = 'price-ASC',
    priseDwn = 'price-DESC',
    ratingUp = 'rating-ASC',
    ratingDwn = 'rating-DESC',
    discountUp = 'discount-ASC',
    discountDwn = 'discount-DESC',
}

enum FiltersFields {
    'category' = 'category',
    'brand' = 'brand'
}

export interface ICartItem {
    id: number
    price: number
}

interface ICategory {
    [n: string]: TCategoryCnt
}

type IQueryObj = {
    [QueryOptions.big]?: string
    [QueryOptions.brand]?: string[]
    [QueryOptions.category]?: string[]
    [QueryOptions.price]?: number[]
    [QueryOptions.search]?: string
    [QueryOptions.stock]?: number[]
    [QueryOptions.sort]?: string
}

type TCategoryCnt = {
    available: number
    total: number
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
    parentData: IProduct[] | null
    curData: IProduct[] | null
    categoryFilterList: HTMLUListElement | undefined
    brandFilterList: HTMLUListElement | undefined
    priceSliderList: HTMLDivElement | undefined
    stockSliderList: HTMLDivElement | undefined
    sortSelect: HTMLSelectElement | undefined
    viewSmall: HTMLDivElement | undefined
    viewBig: HTMLDivElement | undefined
    constructor() {
        this.parentData = null
        this.curData = null
    }

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
        this.categoryFilterList = categoryFilterWrap.list
        this.brandFilterList = brandFilterWrap.list
        this.priceSliderList = priceSliderWrap
        this.stockSliderList = stockSliderWrap

        filtersWrap.append(filtersControls, categoryFilterWrap.wrap, brandFilterWrap.wrap, priceSliderWrap, stockSliderWrap)

        return filtersWrap
    }
    private createFilterControls() {
        const controlsWrap = document.createElement('div')
        const resetFilters = document.createElement('a')
        const copyURL = document.createElement('button')

        controlsWrap.classList.add('filters__controls')
        resetFilters.classList.add('main__btn', 'filters__btn')
        copyURL.classList.add('main__btn', 'filters__btn')

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

        return {wrap, list}
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
        viewSmall.classList.add('controls__view', 'controls__view-small')
        viewBig.classList.add('controls__view', 'controls__view-big')
        this.viewSmall = viewSmall
        this.viewBig = viewBig

        controlsWrap.append(sortWrap, found, searchBar, viewSwitchers)

        sortWrap.append(sortSelect)
        sortSelect.append(optionPlaceholder, optionPriceASC, optionPriceDESC, optionRatingASC, optionRatingDESC, optionDiscountASC, optionDiscountDESC)
        optionPlaceholder.textContent = 'Sort options:'
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

        this.sortSelect = sortSelect

        sortSelect.addEventListener('change', () => {
            console.log(sortSelect.value)
            this.updateURL(sortSelect.value, 'sort')
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
            viewBig.classList.remove('controls__view--active')
            viewSmall.classList.add('controls__view--active')
            this.updateURL('false', 'big')
        })
        viewBig.addEventListener('click', () => {
            // снять подсветку
            // подсветить кликнутую кнопку
            // снять класс на карочках
            viewSmall.classList.remove('controls__view--active')
            viewBig.classList.add('controls__view--active')
            this.updateURL('true', 'big')
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
    private fillFilter(selector: FiltersFields, checked: string[] = []) {
        // получает массив строк элементов которые чекнуты
        const filterItems: HTMLDivElement[] = []
        if (this.parentData && this.curData) {
            const selectors: ICategory = {}
            this.parentData.forEach(el => {
                if (selectors[el[selector]]) {
                    selectors[el[selector]].total += 1
                } else {
                    selectors[el[selector]] = { available: 0, total: 1 }
                }
            })
            this.curData.forEach(el => {
                if (selectors[el[selector]]) {
                    selectors[el[selector]].available += 1
                }
            })
            console.log('selectors', selectors)
            Object.entries(selectors).forEach(([elem, elemObj]) => {
                const checkWrap = document.createElement('div')
                const checkbox = document.createElement('input')
                const label = document.createElement('label')
                const text = document.createElement('span')

                checkWrap.classList.add('checkbox-item')
                if (elemObj.available > 0 && checked.length === 0) checkWrap.classList.add('checkbox-item--active')
                if (elemObj.available > 0 && checked.includes(elem)) checkWrap.classList.add('checkbox-item--active')
                else checkWrap.classList.add('checkbox-item--inactive')
                checkbox.classList.add('checkbox-item__checkbox')
                if (checked?.includes(elem.toLowerCase())) checkbox.checked = true
                label.classList.add('checkbox-item__label')
                text.classList.add('checkbox-item__text')

                checkWrap.append(checkbox, label, text)
                checkbox.type = 'checkbox'
                checkbox.id = `${elem}`
                label.textContent = elem
                label.htmlFor = elem
                text.textContent = `(${elemObj.available.toString()}/${elemObj.total.toString()})`
                filterItems.push(checkWrap)

                checkbox.addEventListener('click', (e) => {
                    if (checked.includes(elem.toLowerCase())) {
                        checked = checked.filter(el => el !== elem.toLowerCase())
                    } else {
                        checked.push(elem.toLowerCase())
                    }
                    
                    let selectorItemsStr = checked.join('↕')
                    this.updateURL(selectorItemsStr, selector)
                })
            })
           
        }
        return filterItems
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
    private setFound() {
        // получает значение количества товаров и устанавливает его в this.found
    }
    private setSearch() {
        // получает значение сортировки и устанавливает его в поле сортировки
    }
    private updateURL(queryStr: string, selector: string) {
        const url = new URL(window.location.href);
        if (queryStr.length > 0) {
            url.searchParams.set(selector, queryStr);
        } else {
            url.searchParams.delete(selector);
        }
        window.history.pushState({}, '', url);
        this.update(this.parentData)
    }
    private renderCards(newData: IProduct[], isBig: boolean) {
        let cartArr = getCartArr()
        if (this.cardsContainer) this.cardsContainer.innerHTML = ''
        newData.forEach((el: IProduct) => {
            const isExist = (element: ICartItem) => element.id === el.id
            let isInCart = cartArr.find(isExist)
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
            isBig ? card.classList.add('card-big') : ''
            isInCart ? card.classList.add('in-cart') : '' 
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
            cardCartBtn.classList.add('card__add', 'main__btn')
            cardDetails.classList.add('card__details', 'main__btn')
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
            cardCategory.textContent = el.category
            cardBrand.textContent = el.brand
            cardPrice.textContent = `€${el.price.toString()}.00`
            cardDiscount.textContent = `${el.discountPercentage.toString()}%`
            cardRating.textContent = el.rating.toString()
            cardStock.textContent = el.stock.toString()
            cardCategory.prepend(cardCategoryAttr)
            cardBrand.prepend(cardBrandAttr)
            cardPrice.prepend(cardPriceAttr)
            cardDiscount.prepend(cardDiscountAttr)
            cardRating.prepend(cardRatingAttr)
            cardStock.prepend(cardStockAttr)
            cardControls.prepend(cardCartBtn, cardDetails)
            cardCategoryAttr.textContent = 'Category: '
            cardBrandAttr.textContent = 'Brand: '
            cardPriceAttr.textContent = 'Price: '
            cardDiscountAttr.textContent = 'Discount: '
            cardRatingAttr.textContent = 'Rating: '
            cardStockAttr.textContent = 'Stock: '
            cardDetails.textContent = 'DETAILS'
            cardDetails.href = `/product-details/${el.id}`
            
            cardCartBtn.textContent = isInCart ? 'DROP FROM CART' : 'ADD TO CART'
            cardCartBtn.addEventListener('click', () => {
                isInCart = cartArr.find(isExist)
                if (cartArr.length > 0) {
                    if (isInCart) {
                        cartArr = cartArr.filter((element) => element.id !== el.id)
                        localStorage.setItem('cart', JSON.stringify(cartArr))
                        cardCartBtn.textContent = 'ADD TO CART'
                        card.classList.remove('in-cart')
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
                card.classList.add('in-cart')
                    // add class cardCartBtn
                header.update()
            })

            this.cardsContainer?.append(card)
        });
    }
    private urlParse() {
        const queryObj: IQueryObj = {}
        const url = new URLSearchParams(window.location.search);
        for (const [key, value] of url) {
            switch(key) {
                case QueryOptions.big:
                    queryObj[QueryOptions.big] = value
                    break
                case QueryOptions.brand:
                    queryObj[QueryOptions.brand] = value.split('↕')
                    break
                case QueryOptions.category:
                    queryObj[QueryOptions.category] = value.split('↕')
                    break
                case QueryOptions.price:
                    queryObj[QueryOptions.price] = value.split('↕').map(el => Number(el))
                    break
                case QueryOptions.search:
                    queryObj[QueryOptions.search] = value
                    break
                case QueryOptions.stock:
                    queryObj[QueryOptions.stock] = value.split('↕').map(el => Number(el))
                    break
                case QueryOptions.sort:
                    queryObj[QueryOptions.sort] = value
                    break
                default:
                    break
            }
        }
        // console.log('queryObj', Object.keys(queryObj))
        return queryObj
    }
    private sortData(str: string) {
        switch(str) {
            case Sorts.priseUp:
                this.curData?.sort((a, b) => a.price - b.price)
                this.sortSelect? this.sortSelect.value = Sorts.priseUp : ''
                break
            case Sorts.priseDwn:
                this.curData?.sort((a, b) => b.price - a.price)
                this.sortSelect? this.sortSelect.value = Sorts.priseDwn : ''
                break
            case Sorts.ratingUp:
                this.curData?.sort((a, b) => a.rating - b.rating)
                this.sortSelect? this.sortSelect.value = Sorts.ratingUp : ''
                break
            case Sorts.ratingDwn:
                this.curData?.sort((a, b) => b.rating - a.rating)
                this.sortSelect? this.sortSelect.value = Sorts.ratingDwn : ''
                break
            case Sorts.discountUp:
                this.curData?.sort((a, b) => a.discountPercentage - b.discountPercentage)
                this.sortSelect? this.sortSelect.value = Sorts.discountUp : ''
                break
            case Sorts.discountDwn:
                this.curData?.sort((a, b) => b.discountPercentage - a.discountPercentage)
                this.sortSelect? this.sortSelect.value = Sorts.discountDwn : ''
                break
            default:
                break
        }
        
    }
    private updateCurData(obj: IQueryObj) { // принимает объект parse и фильтрует массив Cur
        if (!this.curData) return 
        if (Object.keys(obj).length === 0) return
        for (const option in obj) {
            switch(option) {
                case QueryOptions.brand:
                    this.curData = this.curData?.filter((el) => obj[QueryOptions.brand]?.includes(el[QueryOptions.brand].toLowerCase()))
                    break
                case QueryOptions.category:
                    this.curData = this.curData?.filter((el) => obj[QueryOptions.category]?.includes(el[QueryOptions.category]))
                    break
                // case QueryOptions.price:
                //     this.curData = this.curData?.filter((el) => obj[QueryOptions.category]?.includes(el[QueryOptions.category]))
                //     break
                // case QueryOptions.stock:
                //     this.curData = this.curData?.filter((el) => obj[QueryOptions.stock]?.includes(el[QueryOptions.stock]))
                //     break
                // case QueryOptions.search:
                //     this.curData = this.curData?.filter((el) => obj[QueryOptions.search]?.includes(el[QueryOptions.search]))
                //     break
                case QueryOptions.sort:
                    this.sortData(obj[QueryOptions.sort] ? obj[QueryOptions.sort] : '')
                    break
                default:
                    break
            }
        }
    }

    public update(data: IProduct[] | null) {
        if (data) {
            this.parentData = data
            this.curData = data.slice()
            const urlParseObj = this.urlParse()
            // const urlParseObj = метод парсинга URL
            this.updateCurData(urlParseObj)
            // метод рендера filters categories
            this.categoryFilterList ? this.categoryFilterList.innerHTML = '' : ''
            this.categoryFilterList?.append(...this.fillFilter(FiltersFields.category, urlParseObj[QueryOptions.category]))
            // метод рендера filters brands
            this.brandFilterList ? this.brandFilterList.innerHTML = '' : ''
            this.brandFilterList?.append(...this.fillFilter(FiltersFields.brand, urlParseObj[QueryOptions.brand]))
            if (urlParseObj.big) {
                this.renderCards(this.curData, urlParseObj.big === 'true')
                console.log('bool', Boolean(urlParseObj.big), urlParseObj.big)
                urlParseObj.big === 'true'
                    ? this.viewBig?.classList.add('controls__view--active')
                    : this.viewSmall?.classList.add('controls__view--active')
            } else {
                this.renderCards(this.curData, true)
                this.viewBig?.classList.add('controls__view--active')
            }
            // метод рендера sliders
            // метод рендера serach
            // this.renderCards(this.curData, urlParseObj.big ? Boolean(urlParseObj.big) : true)
        }
    }
}