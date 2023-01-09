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
    private price: HTMLDivElement | undefined
    private priceInfo: HTMLDivElement | undefined
    private priceStart: HTMLInputElement | undefined
    private priceFinish: HTMLInputElement | undefined
    private stockInfo: HTMLDivElement | undefined
    private stockStart: HTMLInputElement | undefined
    private stockFinish: HTMLInputElement | undefined
    public mainContainer: HTMLDivElement | undefined
    private cardsContainer: HTMLDivElement | undefined
    public parentData: IProduct[] | null
    private curData: IProduct[] | null
    private categoryFilterList: HTMLUListElement | undefined
    private brandFilterList: HTMLUListElement | undefined
    private priceSliderList: HTMLDivElement | undefined
    private stockSliderList: HTMLDivElement | undefined
    private sortSelect: HTMLSelectElement | undefined
    private viewSmall: HTMLDivElement | undefined
    private viewBig: HTMLDivElement | undefined
    private notFound: HTMLDivElement | undefined
    private search: HTMLInputElement | undefined
    private found: HTMLDivElement | undefined
    private priceSliderFlag: boolean
    private stockSliderFlag: boolean
    private filtersContainer: HTMLDivElement | undefined
    private productsContainer: HTMLDivElement | undefined
    constructor() {
        this.parentData = null
        this.curData = null
        this.priceSliderFlag = false
        this.stockSliderFlag = false
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
        const wrapper = document.createElement('div')
        wrapper.classList.add('main__wrapper')

        const filters = this.createFiltersContainer()
        const products = this.createProductsContainer()
        this.filtersContainer = filters
        this.productsContainer = products
        if (this.mainContainer) {
            wrapper.append(filters, products)
            this.mainContainer.append(wrapper)
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

        const burgerWrap = document.createElement('div')
        burgerWrap.classList.add('burger__wrap')
        const filtersBurger = document.createElement('button')
        const burgerLine = document.createElement('span')
        filtersBurger.classList.add('burger')
        burgerLine.classList.add('burger__line')

        filtersBurger.append(burgerLine)
        burgerWrap.append(filtersControls, categoryFilterWrap.wrap, brandFilterWrap.wrap, priceSliderWrap, stockSliderWrap)
        filtersWrap.append(filtersBurger, burgerWrap)

        filtersBurger.addEventListener('click', () => {
            filtersBurger.classList.toggle('burger--active')
            burgerWrap.classList.toggle('burger__wrap--active')
        })
    
        window.addEventListener('click', (e) => {
        if (e.target === filtersWrap) {
            filtersBurger.classList.remove('burger--active')
            burgerWrap.classList.remove('burger__wrap--active')
        }
        })

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

        wrap.classList.add('filters__slider', 'filters-slider')
        title.classList.add('filters-slider__title')
        valueInfo.classList.add('filters-slider__info')
        sliderContainer.classList.add('filters-slider__ranges')
        startInputRange.classList.add('filters-slider__range')
        finishInputRange.classList.add('filters-slider__range')
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

        startInputRange.addEventListener('input', () => this.controlSliderFrom(startInputRange, finishInputRange, QueryOptions.price))
        finishInputRange.addEventListener('input', () => this.controlSliderTo(startInputRange, finishInputRange, QueryOptions.price))

        return wrap
    }
    private createStockSliderWrap() {
        const wrap = document.createElement('div')
        const title = document.createElement('h3')
        const valueInfo = document.createElement('div')
        const sliderContainer = document.createElement('div')
        const startInputRange = document.createElement('input')
        const finishInputRange = document.createElement('input')

        wrap.classList.add('filters__slider', 'filters-slider')
        title.classList.add('filters-slider__title')
        valueInfo.classList.add('filters-slider__info')
        sliderContainer.classList.add('filters-slider__ranges')
        startInputRange.classList.add('filters-slider__range')
        finishInputRange.classList.add('filters-slider__range')
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

        startInputRange.addEventListener('input', () => this.controlSliderFrom(startInputRange, finishInputRange, QueryOptions.stock))
        finishInputRange.addEventListener('input', () => this.controlSliderTo(startInputRange, finishInputRange, QueryOptions.stock))

        return wrap
    }
    private createProductsContainer() {
        const main = document.createElement('div')
        const mainContainer = document.createElement('div')
        const productsControls = this.createProductsControls()
        const productsCardsWrap = this.createProductsItemsWrap()
        const productsNotFound = this.createProductsNotFound()
        this.notFound = productsNotFound
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

        found.classList.add('controls__found') 
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
        this.search = searchInput
        this.found = found

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
            this.updateURL(sortSelect.value, 'sort')
        })

        searchInput.addEventListener('input', () => {
            this.updateURL(searchInput.value, 'search')
        })
        viewSmall.addEventListener('click', () => {
            viewBig.classList.remove('controls__view--active')
            viewSmall.classList.add('controls__view--active')
            this.updateURL('false', 'big')
        })
        viewBig.addEventListener('click', () => {
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
            Object.entries(selectors).forEach(([elem, elemObj]) => {
                const checkWrap = document.createElement('div')
                const checkbox = document.createElement('input')
                const label = document.createElement('label')
                const text = document.createElement('span')

                checkWrap.classList.add('checkbox-item')
                if (elemObj.available > 0 && checked.length === 0 || checked.includes(elem.toLowerCase())) checkWrap.classList.add('checkbox-item')
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
    private getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }
    private controlSliderFrom(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, name: QueryOptions) {
        let minVal = 0
        let maxVal = 0
        if (this.parentData) {
            switch(name) {
                case QueryOptions.price:
                    const [minPrice, maxPrice] = this.getSliderBorders(this.parentData, QueryOptions.price)
                    minVal = minPrice
                    maxVal = maxPrice
                    break
                case QueryOptions.stock:
                    const [minStock, maxStock] = this.getSliderBorders(this.parentData, QueryOptions.stock)
                    minVal = minStock
                    maxVal = maxStock
                    break
                default:
                    break
            }
        }
        const [from, to] = this.getParsed(fromSlider, toSlider)
        if (from > to) {
            switch(name) {
                case QueryOptions.price:
                    this.priceSliderFlag = true
                    break
                case QueryOptions.stock:
                    this.stockSliderFlag = true
                    break
                default:
                    this.priceSliderFlag = true
                    this.stockSliderFlag = true
                    break
            }
            this.updateURL(toSlider.value.toString() + '↕' + (Number(fromSlider.value) > maxVal ? maxVal : fromSlider.value).toString(), name)
        } else {
            switch(name) {
                case QueryOptions.price:
                    this.priceSliderFlag = false
                    break
                case QueryOptions.stock:
                    this.stockSliderFlag = false
                    break
                default:
                    this.priceSliderFlag = false
                    this.stockSliderFlag = false
                    break
            }
            this.updateURL((Number(fromSlider.value) < minVal ? minVal : fromSlider.value).toString() + '↕' + toSlider.value.toString(), name)
        }
    }
    private controlSliderTo(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, name: QueryOptions) {
        let minVal = 0
        let maxVal = 0
        if (this.parentData) {
            switch(name) {
                case QueryOptions.price:
                    const [minPrice, maxPrice] = this.getSliderBorders(this.parentData, QueryOptions.price)
                    minVal = minPrice
                    maxVal = maxPrice
                    break
                case QueryOptions.stock:
                    const [minStock, maxStock] = this.getSliderBorders(this.parentData, QueryOptions.stock)
                    minVal = minStock
                    maxVal = maxStock
                    break
                default:
                    break
            }
        }
        const [from, to] = this.getParsed(fromSlider, toSlider)
        if (from <= to) {
            switch(name) {
                case QueryOptions.price:
                    this.priceSliderFlag = false
                    break
                case QueryOptions.stock:
                    this.stockSliderFlag = false
                    break
                default:
                    this.priceSliderFlag = false
                    this.stockSliderFlag = false
                    break
            }
            this.updateURL(fromSlider.value.toString() + '↕' + (Number(toSlider.value) > maxVal ? maxVal : toSlider.value).toString(), name)

        } else {
            switch(name) {
                case QueryOptions.price:
                    this.priceSliderFlag = true
                    break
                case QueryOptions.stock:
                    this.stockSliderFlag = true
                    break
                default:
                    this.priceSliderFlag = true
                    this.stockSliderFlag = true
                    break
            }
            this.updateURL((Number(toSlider.value) < minVal ? minVal : toSlider.value).toString() + '↕' + fromSlider.value.toString(), name)
        }
    }
    private getSliderBorders(data: IProduct[], name: QueryOptions) {
        switch(name) {
            case QueryOptions.price:
                const parentPrice = data.map(el => el[QueryOptions.price])
                const parentPriceMin = Math.min(...parentPrice)
                const parentPriceMax = Math.max(...parentPrice)
                return [parentPriceMin, parentPriceMax]
            case QueryOptions.stock:
                const parentStock = data.map(el => el[QueryOptions.stock])
                const parentStockMin = Math.min(...parentStock)
                const parentStockMax = Math.max(...parentStock)
                return [parentStockMin, parentStockMax]
            default:
                const parentDef = data.map(el => el.price)
                const parentDefMin = Math.min(...parentDef)
                const parentDefMax = Math.max(...parentDef)
                return [parentDefMin, parentDefMax]
        }
    }
    private setPriceSlider(urlData: number[] = []) {
        if (this.parentData && this.curData) {
            const [parentPriceMin, parentPriceMax] = this.getSliderBorders(this.parentData, QueryOptions.price)
            const [curPriceMin, curPriceMax] = this.getSliderBorders(this.curData, QueryOptions.price)
            this.priceStart? this.priceStart.max = parentPriceMax.toString() : ''
            this.priceFinish? this.priceFinish.max = parentPriceMax.toString() : ''
            if (urlData.length > 0 
                && this.curData.length 
                && this.priceInfo 
                && urlData[0] !== urlData[1]) {
                if (this.priceSliderFlag) {
                    if (this.priceStart && this.priceFinish) {
                        this.priceStart.value = urlData[1] > curPriceMax ? curPriceMax.toString() : urlData[1].toString()
                        this.priceFinish.value = urlData[0] > curPriceMin ? curPriceMin.toString() : urlData[0].toString()
                    }
                } else {
                    if (this.priceStart && this.priceFinish) {
                        this.priceStart.value = urlData[0] > curPriceMin ? curPriceMin.toString() : urlData[0].toString()
                        this.priceFinish.value = urlData[1] > curPriceMax ? curPriceMax.toString() : urlData[1].toString()
                    }
                }
            }
            else if (urlData.length === 0 && this.priceInfo && this.curData.length) {
                this.priceStart? this.priceStart.value = curPriceMin.toString() : ''
                this.priceFinish? this.priceFinish.value = curPriceMax.toString() : ''
            }
            else if (urlData.length > 0 && this.curData.length && this.priceInfo && urlData[0] === urlData[1]) {
                this.priceStart? this.priceStart.value = urlData[0].toString() : ''
                this.priceFinish? this.priceFinish.value = urlData[1].toString() : ''
            }
            if (this.priceInfo && this.curData.length) {
                this.priceInfo.innerHTML = ''
                const fromText = document.createElement('span')
                const toText = document.createElement('span')
                const delimiter = document.createElement('span')
                if (this.priceSliderFlag) {
                    fromText.textContent = this.priceFinish? '€' + this.priceFinish.value : ''
                    toText.textContent = this.priceStart? '€' + this.priceStart.value : ''
                } else {
                    fromText.textContent = this.priceStart? '€' + this.priceStart.value : ''
                    toText.textContent = this.priceFinish? '€' + this.priceFinish.value : ''
                }
                delimiter.textContent = ' ⟷ '
                this.priceInfo.append(fromText, delimiter, toText)
            }
        }
    }
    private setStockSlider(urlData: number[] = []) {
        if (this.parentData && this.curData) {
            const [parentStockMin, parentStockMax] = this.getSliderBorders(this.parentData, QueryOptions.stock)
            const [curStockMin, curStockMax] = this.getSliderBorders(this.curData, QueryOptions.stock)
            this.stockStart? this.stockStart.max = parentStockMax.toString() : ''
            this.stockFinish? this.stockFinish.max = parentStockMax.toString() : ''
            if (urlData.length > 0 
                && this.curData.length 
                && this.stockInfo 
                && urlData[0] !== urlData[1]) {
                if (this.stockSliderFlag) {
                    if (this.stockStart && this.stockFinish) {
                        this.stockStart.value = urlData[1] > curStockMax ? curStockMax.toString() : urlData[1].toString()
                        this.stockFinish.value = urlData[0] > curStockMin ? curStockMin.toString() : urlData[0].toString()
                    }
                } else {
                    if (this.stockStart && this.stockFinish) {
                        this.stockStart.value = urlData[0] > curStockMin ? curStockMin.toString() : urlData[0].toString()
                        this.stockFinish.value = urlData[1] > curStockMax ? curStockMax.toString() : urlData[1].toString()
                    }
                }
            }
            else if (urlData.length === 0 && this.stockInfo && this.curData.length) {
                this.stockStart? this.stockStart.value = curStockMin.toString() : ''
                this.stockFinish? this.stockFinish.value = curStockMax.toString() : ''
            }
            else if (urlData.length > 0 && this.curData.length && this.stockInfo && urlData[0] === urlData[1]) {
                this.stockStart? this.stockStart.value = urlData[0].toString() : ''
                this.stockFinish? this.stockFinish.value = urlData[1].toString() : ''
            }
            if (this.stockInfo && this.curData.length) {
                this.stockInfo.innerHTML = ''
                const fromText = document.createElement('span')
                const toText = document.createElement('span')
                const delimiter = document.createElement('span')
                if (this.stockSliderFlag) {
                    fromText.textContent = this.stockFinish? this.stockFinish.value : ''
                    toText.textContent = this.stockStart? this.stockStart.value : ''
                } else {
                    fromText.textContent = this.stockStart? this.stockStart.value : ''
                    toText.textContent = this.stockFinish? this.stockFinish.value : ''
                }
                delimiter.textContent = ' ⟷ '
                this.stockInfo.append(fromText, delimiter, toText)
            }
        }
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
        if (isBig && this.cardsContainer) {
            this.cardsContainer.classList.add('cards--big')
        } else {
            if (this.cardsContainer)
            this.cardsContainer.classList.remove('cards--big')
        }
        newData.forEach((el: IProduct) => {
            const isExist = (element: ICartItem) => element.id === el.id
            let isInCart = cartArr.find(isExist)
            const card = document.createElement('div')
            const cardWrap = document.createElement('div')
            const cardTextContent = document.createElement('a')
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
            cardTextContent.href = `${window.location.pathname}product-details/${el.id}`
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
            cardDetails.href = `${window.location.pathname}product-details/${el.id}`
            
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
        if (this.sortSelect) {
            switch(str) {
                case Sorts.priseUp:
                    this.curData?.sort((a, b) => a.price - b.price)
                    this.sortSelect.value = Sorts.priseUp? Sorts.priseUp : ''
                    break
                case Sorts.priseDwn:
                    this.curData?.sort((a, b) => b.price - a.price)
                    this.sortSelect.value = Sorts.priseDwn? Sorts.priseDwn : ''
                    break
                case Sorts.ratingUp:
                    this.curData?.sort((a, b) => a.rating - b.rating)
                    this.sortSelect.value = Sorts.ratingUp? Sorts.ratingUp : ''
                    break
                case Sorts.ratingDwn:
                    this.curData?.sort((a, b) => b.rating - a.rating)
                    this.sortSelect.value = Sorts.ratingDwn? Sorts.ratingDwn : ''
                    break
                case Sorts.discountUp:
                    this.curData?.sort((a, b) => a.discountPercentage - b.discountPercentage)
                    this.sortSelect.value = Sorts.discountUp? Sorts.discountUp : ''
                    break
                case Sorts.discountDwn:
                    this.curData?.sort((a, b) => b.discountPercentage - a.discountPercentage)
                    this.sortSelect.value = Sorts.discountDwn? Sorts.discountDwn : ''
                    break
                default:
                    this.sortSelect.value = str
                    break
            }
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
                case QueryOptions.price:
                    this.curData = this.curData?.filter((el) => {
                        let min = obj[QueryOptions.price] 
                            ? obj[QueryOptions.price][0] 
                            : this.parentData 
                                ? Math.min(...this.parentData.map(el => el.price)) 
                                : -1
                        let max = obj[QueryOptions.price] 
                            ? obj[QueryOptions.price][1] 
                            : this.parentData 
                                ? Math.min(...this.parentData.map(el => el.price)) 
                                : -1
                        return el.price >= min && el.price <= max
                    })
                    break
                case QueryOptions.stock:
                    this.curData = this.curData?.filter((el) => {
                        let min = obj[QueryOptions.stock] 
                            ? obj[QueryOptions.stock][0] 
                            : this.parentData 
                                ? Math.min(...this.parentData.map(el => el.stock)) 
                                : -1
                        let max = obj[QueryOptions.stock] 
                            ? obj[QueryOptions.stock][1] 
                            : this.parentData 
                                ? Math.min(...this.parentData.map(el => el.stock)) 
                                : -1
                        return el.stock >= min && el.stock <= max
                    })
                    break
                case QueryOptions.search:
                    if (obj[QueryOptions.search]) {
                        const searchStr = obj[QueryOptions.search].toLowerCase()
                        this.curData = this.curData?.filter((el) => {
                            const isBrand = el.brand.toLowerCase().includes(searchStr)
                            const isTitle = el.title.toLowerCase().includes(searchStr)
                            const isDescr = el.description.toLowerCase().includes(searchStr)
                            const isPrice = (el.price).toString().includes(searchStr)
                            const isCategory = el.category.toLowerCase().includes(searchStr)
                            const isRating = (el.rating).toString().includes(searchStr)
                            const isDiscount = (el.discountPercentage).toString().includes(searchStr)
                            return isBrand || isTitle || isDescr || isPrice || isCategory || isRating || isDiscount
                        })
                    }
                    break
                case QueryOptions.sort:
                    this.sortData(obj[QueryOptions.sort] ? obj[QueryOptions.sort] : 'Sort options:')
                    break
                default:
                    break
            }
        }
    }
    public update(data: IProduct[] | null) {
        if (data && this.productsContainer && this.filtersContainer) {
            header.update()
            this.parentData = data
            this.curData = data.slice()
            const urlParseObj = this.urlParse()
            this.updateCurData(urlParseObj)
            // метод рендера filters categories
            this.categoryFilterList ? this.categoryFilterList.innerHTML = '' : ''
            this.categoryFilterList?.append(...this.fillFilter(FiltersFields.category, urlParseObj[QueryOptions.category]))
            // метод рендера filters brands
            this.brandFilterList ? this.brandFilterList.innerHTML = '' : ''
            this.brandFilterList?.append(...this.fillFilter(FiltersFields.brand, urlParseObj[QueryOptions.brand]))
            // методы рендера sliders
            this.setPriceSlider(urlParseObj.price ? urlParseObj.price : [])
            this.setStockSlider(urlParseObj.stock ? urlParseObj.stock : [])
            // метод рендера serach
            if (this.search) {
                this.search.value = urlParseObj.search ? urlParseObj.search : ''
            }
            if (this.sortSelect) {
                urlParseObj.search ? '' : this.sortData('Sort options:')
            }
            if (urlParseObj.big) {
                this.renderCards(this.curData, urlParseObj.big === 'true')
                urlParseObj.big === 'true'
                    ? this.viewBig?.classList.add('controls__view--active')
                    : this.viewSmall?.classList.add('controls__view--active')
            } else {
                this.renderCards(this.curData, true)
                this.viewBig?.classList.add('controls__view--active')
                this.viewSmall?.classList.remove('controls__view--active')
                console.log('viewBig', this.viewBig)
            }
            if (this.curData.length > 0 && this.notFound) {
                this.notFound.classList.add('is-hidden')
                this.found ? this.found.textContent = `Found: ${this.curData.length}` : ''
            } 
            if (this.curData.length === 0 && this.notFound) {
                this.notFound.classList.remove('is-hidden')
                this.found ? this.found.textContent = 'Found: 0' : ''
            }
        }
    }
}