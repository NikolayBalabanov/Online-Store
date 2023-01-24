import { appData, header, IProduct, main, modal } from "../../index"
import { getCartArr } from "../../utils/getCartArr"
import { getCartPage } from "../../utils/getCartPage"
import { getPromoArr } from "../../utils/getPromoArr"
import './cart.scss'

export interface ICartPage {
    limit: number
    page: number
}
export class Cart {
    public cartContainer: HTMLDivElement | undefined
    public cartEmpty: HTMLDivElement | undefined

    price: HTMLSpanElement | undefined
    cartCnt: HTMLSpanElement | undefined

    // create cart page 
    constructor () {}
    
    
    public createCartContainer() {
        const cartContainer = document.createElement('div')
        const cartWrapper = document.createElement('div')
        cartWrapper.classList.add('cart__wrapper')
        cartContainer.classList.add('cart__container')
        // create page limit for pagination
        let cartPage = getCartPage()
        if (cartPage.length === 0) {
            cartPage.push({ limit:5, page:1})
            localStorage.setItem('page', JSON.stringify(cartPage))
        }
        cartContainer.append(cartWrapper)
        cartWrapper.append(this.createProductsContainer(),
            this.createSummaryContainer()
        )
             
        return cartContainer
    }

    public createProductsContainer() {
        const productsContainer = document.createElement('div')
        productsContainer.classList.add('productsCart__container')
        productsContainer.append(this.createProductControl(), 
        this.createProductsItems())

        return productsContainer
    }
    
    public createSummaryContainer() {
        function createPromoDropItem(str: string) {
            const appliedPromo = document.createElement('div')
            const appliedPromoTxt = document.createElement('span')
            const appliedPromoTxtBtn = document.createElement('button')
            appliedPromo.classList.add('applied_promo', `applied_${str}`)
            appliedPromoTxt.classList.add('applied_text')
            appliedPromoTxt.textContent = str === 'rs' ? 'Rolling Scopes School 10%' : 'EPAM Systems - 10%'
            appliedPromoTxtBtn.textContent = 'DROP'
            appliedPromoTxtBtn.classList.add('res_btn', 'apply_drop')
            appliedPromo.append(appliedPromoTxt, appliedPromoTxtBtn)

            appliedPromoTxtBtn.addEventListener('click', () => {
                const promoResBtn = document.querySelector(`.res_${str} .res_btn`)
                if (promoResBtn) promoResBtn.classList.remove('is-hidden')
                appliedPromo.remove()
                if (appliedPromoWrap.childNodes.length === 0) applyCodes.classList.add('is-hidden')
                if (promoState.includes(str)) {
                    promoState = promoState.filter(el => el !== str)
                }
                localStorage.setItem('promo', JSON.stringify(promoState))
                promoChange()
            })

            return appliedPromo
        }
        function createPromoAddItem(str: string) {
            const promoRes = document.createElement('div')
            const promoResTxt = document.createElement('span')
            const promoResBtn = document.createElement('button')
            promoRes.classList.add('res_promo', `res_${str}`, 'is-hidden')
            promoResTxt.classList.add('res_promo')
            promoResTxt.textContent = str === 'rs' ? 'Rolling Scopes School 10%' : 'EPAM Systems - 10%'
            promoResBtn.textContent = 'ADD'
            promoResBtn.classList.add('res_btn') // условно скрывается если есть в LS
            promoRes.append(promoResTxt, promoResBtn)
            promoResBtn.addEventListener('click', () => {
                promoResBtn.classList.add('is-hidden')
                applyCodes.classList.remove('is-hidden')
                appliedPromoWrap.append(createPromoDropItem(str))
                if (!promoState.includes(str)) {
                    promoState.push(str)
                    localStorage.setItem('promo', JSON.stringify(promoState))
                }
                promoChange()
            })

            return [promoRes, promoResBtn]
        }
        let promoState = getPromoArr()
        const summaryContainer = document.createElement('div')
        const summaryName = document.createElement('h2')
        const totalPrice = document.createElement('div')
        const totalPriceTxt = document.createElement('span')
        const totalPriceSumm = document.createElement('div')
        const totalPriceSummTxt = document.createElement('span')
        const resultPriceSumm = document.createElement('div')
        const resulPriceSummTxt = document.createElement('span')
        const applyCodes = document.createElement('div')
        const applyCodesTxt = document.createElement('h3')
        const appliedPromoWrap = document.createElement('div')
        const promoCode = document.createElement('div')
        const promoCodeInput = document.createElement('input')
        const promoTestTxt = document.createElement('span')
        const buttonCartBuy = document.createElement('button')
        const [promoRS, promoRSbtn] = createPromoAddItem('rs')
        const [promoEPM, promoEPMbtn] = createPromoAddItem('epm')

        summaryName.classList.add('summary')
        summaryName.textContent = 'Summary'
        totalPrice.classList.add('total_price')
        totalPriceTxt.classList.add('total_price')
        let cartArr = getCartArr()
        if (cartArr.length>0) {
            const cnt = cartArr.reduce((acc, cur) => acc + cur.count, 0).toString()
            totalPriceTxt.textContent = `Products:  ${cnt}` 
        } else {        
            totalPriceTxt.textContent = `Products:  ${0}`
        } 
        totalPriceSumm.classList.add('total_price')
        totalPriceSummTxt.classList.add('total_price')
        const total = cartArr.reduce((acc, cur) => acc + cur.price * cur.count, 0)
        totalPriceSummTxt.textContent = `Total:  €${total.toString()}.00` //--------------
        resultPriceSumm.classList.add('result_price', 'total_price')
        resulPriceSummTxt.classList.add('result_price', 'total_price')
        applyCodes.classList.add('apply_codes', 'is-hidden') // LS
        promoChange()
        function promoChange() {
            if (promoState.length > 0) {
                let cartPrice = total
                resultPriceSumm.classList.remove('is-hidden')
                applyCodes.classList.remove('is-hidden')
                totalPriceSumm.classList.add('old_price')
                appliedPromoWrap.innerHTML = ''
                promoState.forEach(el =>  {
                    appliedPromoWrap.append(createPromoDropItem(el))
                    cartPrice *= 0.9
                    el === 'rs' 
                        ? promoRSbtn.classList.add('is-hidden')
                        : promoEPMbtn.classList.add('is-hidden')
                })
                resulPriceSummTxt.textContent= `Total:  €${cartPrice}`
            } else {
                resultPriceSumm.classList.add('is-hidden')
                applyCodes.classList.add('is-hidden')
                totalPriceSumm.classList.remove('old_price')
            }
        }
        
        applyCodesTxt.classList.add('apply_txt')
        applyCodesTxt.textContent = 'Applied codes'
        promoCode.classList.add('promo_code')
        promoCodeInput.classList.add('input_promo', 'promo_valid')
        promoCodeInput.placeholder = 'Enter promo code'
        promoCodeInput.type = 'search'
        
        promoTestTxt.classList.add('test_promo')
        promoTestTxt.textContent = `Promo for test: 'RS', 'EPM'`
        buttonCartBuy.classList.add('button_buy')
        buttonCartBuy.textContent ='BUY NOW'
          
        summaryContainer.classList.add('summary__container')
        summaryContainer.append(summaryName)
        summaryContainer.append(totalPrice)
        totalPrice.append(totalPriceTxt)
        summaryContainer.append(totalPriceSumm)
        totalPriceSumm.append(totalPriceSummTxt)
        summaryContainer.append(resultPriceSumm)
        resultPriceSumm.append(resulPriceSummTxt)
        summaryContainer.append(applyCodes)
        applyCodes.append(applyCodesTxt)
        applyCodes.append(appliedPromoWrap)
        summaryContainer.append(promoCode)
        promoCode.append(promoCodeInput)
        summaryContainer.append(promoRS, promoEPM)
        
        summaryContainer.append(promoTestTxt)
        summaryContainer.append(buttonCartBuy)
        buttonCartBuy.addEventListener('click', () => {
            modal.render()
        })
        promoCodeInput.addEventListener('input', () => {
            switch (promoCodeInput.value.trim().toLowerCase()) {
                case 'rs':
                    promoRS.classList.remove('is-hidden')
                    break
                case 'epm':
                    promoEPM.classList.remove('is-hidden')
                    break
                default:
                    promoRS.classList.add('is-hidden')
                    promoEPM.classList.add('is-hidden')
                    break
            }
        })

        return summaryContainer
    }

    public createProductControl() {
        const productControl = document.createElement('div')
        const titleName = document.createElement('h2')
        const pageControl = document.createElement('div')
        const limitPages = document.createElement('div')
        const limitName = document.createElement('span')
        const limitInput = document.createElement('input')
        const pageNumberContainer = document.createElement('div')
        const pageName = document.createElement('span')
        const pageButtonLeft = document.createElement('button')
        const pageButtonRight = document.createElement('button')
        const pageNumber = document.createElement('span')

        productControl.classList.add('product__control')
        pageControl.classList.add('pages__control')
        limitPages.classList.add('limit__pages')
        limitInput.classList.add('limit_page_input', 'limit_input')
        pageNumberContainer.classList.add('page__number')
        pageButtonLeft.classList.add('limit_page_input', 'limit_button1')
        pageButtonRight.classList.add('limit_page_input', 'limit_button2')
        pageNumber.classList.add('page_number')
      
        let cartPage = getCartPage()
        let cartArr = getCartArr()
        let maxPage = Math.ceil(cartArr.length/cartPage[0].limit)
 

        titleName.textContent = 'Products In Cart'
        limitName.textContent = 'LIMIT: '
        limitInput.value = cartPage[0].limit.toString()
        limitInput.min ='1'
        limitInput.type = 'number'
        pageName.textContent = ' PAGE: '
        pageButtonLeft.textContent = ' < '
        pageButtonRight.textContent = ' > '
        pageNumber.textContent = cartPage[0].page.toString()
      
        productControl.append(titleName, pageControl)
        pageControl.append(limitPages)
        limitPages.append(limitName, limitInput)
        pageControl.append(pageNumberContainer)
        pageNumberContainer.append(pageName, pageButtonLeft, pageNumber, pageButtonRight)

      
        limitInput.addEventListener('input', () => { 
            let itemsOnPage = Number(limitInput.value)
            cartPage[0].limit = itemsOnPage
            cartPage[0].page = 1
            localStorage.setItem('page', JSON.stringify(cartPage))
            let countPages = Math.ceil(cartArr.length/itemsOnPage)
     
            this.CartLayout(main.mainContainer)
        })

        pageButtonLeft.addEventListener('click', () => {
         
            if (cartPage.length > 0) {     
                     
                    if (cartPage[0].page > 1) {
                        cartPage[0].page -= 1
                        localStorage.setItem('page', JSON.stringify(cartPage))
                        }

                    this.CartLayout(main.mainContainer)
                    return                      
            }
        })

        pageButtonRight.addEventListener('click', () => {
            maxPage = Math.ceil(cartArr.length/cartPage[0].limit)
        
            if (cartPage.length > 0) {
                let totalPages = cartPage[0].page 
                     
                    if (cartPage[0].page < maxPage) {
                        cartPage[0].page += 1
                        localStorage.setItem('page', JSON.stringify(cartPage))
                        }

                    this.CartLayout(main.mainContainer)
                    return
                         
            }
         })

        return productControl
    }
// - - -      create items - - -
    public createProductsItems () {
        const productsItems = document.createElement('div')
        productsItems.classList.add('product__items_cart')
        let cartArr = getCartArr()
        let cartPage = getCartPage()
        let counterItems = cartArr.length
        let limitPage = cartPage[0].limit
        let countPage = cartPage[0].page

        if (Number(limitPage*countPage) <= counterItems) {
            for (var i = 1; i <= limitPage; i++) {
                productsItems.append(this.createCartItem(Number(i + limitPage*(countPage-1))))
            }
                return productsItems
        } else if (limitPage > counterItems){
            for (var k = 1; k <= Number(counterItems); k++) {
                productsItems.append(this.createCartItem(Number(k + limitPage*(countPage-1))))
            }
                return productsItems
        } else {
            for (var k = 1; k <= (Number(counterItems-limitPage*(countPage-1))); k++) {
                productsItems.append(this.createCartItem(Number(k + limitPage*(countPage-1) )))
            }
                return productsItems
        }
        
    }
// create line product
    public createCartItem (idIt?:number) {
        let cartArr = getCartArr()
        let idProduct = cartArr[Number(idIt) - 1].id 
        let countItem = cartArr[Number(idIt) - 1].count
        const cartItem = document.createElement('div')
        const item_i = document.createElement('div')
        const itemNumber = document.createElement('span')

        cartItem.classList.add('cart__item')
        item_i.classList.add(`item_${idIt}`)
        itemNumber.textContent = `${idIt}` //number product in cart

        cartItem.append(item_i)
        item_i.append(itemNumber)
        cartItem.append(this.createItemInfo(idProduct-1), 
        this.createItemControl((idProduct-1),(Number(idIt)-1),countItem)
        )
        
        return cartItem
    }

    public createItemInfo (idp?:number) {
        const itemInfo = document.createElement('div')
        const aHref = document.createElement('a')
        const itemImage = document.createElement('img')
        const itemsDetails = document.createElement('div')
        const itemTitle = document.createElement('div')
        const itemName = document.createElement('h3')
        const itemDescription = document.createElement('div')
        const itemDescriptionTxt = document.createElement('span')
        const itemOther = document.createElement('div')
        const itemRating = document.createElement('div')
        const itemRatingTxt = document.createElement('span')
        const itemDiscount = document.createElement('div')
        const itemDiscountTxt = document.createElement('span')
        
        itemInfo.classList.add('item_info')
        aHref.classList.add('item_info_href')
        itemImage.classList.add('item_image')
        itemImage.alt = 'image'
        itemsDetails.classList.add('item_details')
        itemTitle.classList.add('item_title')
        itemName.classList.add('item_name')
        itemDescription.classList.add('item_description')
        itemDescriptionTxt.classList.add('item_description_txt')
        itemOther.classList.add('item_other')
        itemRating.classList.add('item_rating')
        itemDiscount.classList.add('item_discount')
        aHref.href= `/product-details/${Number(idp)+1}` // ! Patch for Page ProductDetail

        // Update info items from appData[Number(idp) - testing -
        if (appData) {
        itemImage.src = appData[Number(idp)].thumbnail 
        itemName.textContent = appData[Number(idp)].title
        itemDescriptionTxt.textContent = appData[Number(idp)].description 
        itemRatingTxt.textContent = `Rating: ${appData[Number(idp)].rating.toString()}` 
        itemDiscountTxt.textContent = `Discount: ${appData[Number(idp)].discountPercentage.toString()}%` 
        } else {

            itemName.textContent = 'Database is updating..' // ------------
            itemDescriptionTxt.textContent = 'Please click to homepage Online-Store' // -----------
            //TODO: update appData 
        }

        
        itemInfo.append(aHref) ///
        aHref.append(itemImage)
        aHref.append(itemsDetails) //
        itemsDetails.append(itemTitle)
        itemTitle.append(itemName)
        itemsDetails.append(itemDescription)
        itemDescription.append(itemDescriptionTxt)
        itemsDetails.append(itemOther)
        itemOther.append(itemRating)
        itemRating.append(itemRatingTxt)
        itemOther.append(itemDiscount)
        itemDiscount.append(itemDiscountTxt)

        return itemInfo
    }
    public createItemControl(idp?:number, idstorage?:number, countItem?:number) {
        const itemControl = document.createElement('div')
        const stockControl = document.createElement('div')
        const stockControlTxt = document.createElement('span')
        const stockButtonControl = document.createElement('div')
        const stockButtonPlus = document.createElement('button')
        const stockInfo = document.createElement('span')
        const stockButtonMinus = document.createElement('button')
        const itemAmountControl = document.createElement('div')
        const itemAmount = document.createElement('span')

        itemControl.classList.add('item__control')
        stockControl.classList.add('stock_control')
        stockButtonControl.classList.add('stock_button_control')
        stockButtonPlus.classList.add('stock_plus', 'stock_button')
        stockButtonPlus.textContent = '+'
        stockButtonMinus.classList.add('stock_minus', 'stock_button')
        stockButtonMinus.textContent = '-'
        itemAmountControl.classList.add('amount_control')

        // Update info items from appData[Number(idp)] - testing -
        
        if (appData&&countItem) {
            stockControlTxt.textContent = `Stock: ${appData[Number(idp)].stock-countItem}` // - отнимаем N и итого---
            stockInfo.textContent = `${countItem}` //---------------------перемен кол-во из сторадж
            itemAmount.textContent = `€${(appData[Number(idp)].price)*countItem}.00` // умножаем на N сумма-----------
            }   

        itemControl.append(stockControl)
        stockControl.append(stockControlTxt)
        itemControl.append(stockButtonControl)
        stockButtonControl.append(stockButtonPlus)
        stockButtonControl.append(stockInfo)
        stockButtonControl.append(stockButtonMinus)
        itemControl.append(itemAmountControl)
        itemAmountControl.append(itemAmount)

        // - controls
        let cartArr = getCartArr()
        stockButtonPlus.addEventListener('click', () => {
            if (cartArr.length > 0) {
                let index =Number(idstorage)
                    let elItems = cartArr[index] //
            
                    if (elItems['count']) {
                        elItems['count'] +=1
                        localStorage.setItem('cart', JSON.stringify(cartArr))
                    }
                    this.CartLayout(main.mainContainer)
                    header.update()
                    return
            }
        })
        stockButtonMinus.addEventListener('click', () => {
            if (cartArr.length > 0) {
                let index =Number(idstorage)
                    let elItem = cartArr[index]
                    if (elItem['count']) {
                        elItem['count'] -=1              
                        if (elItem['count'] === 0) {
                            cartArr.splice(index, 1)
                            
                        }
                        localStorage.setItem('cart', JSON.stringify(cartArr))
                    }
                    let cartPage = getCartPage()
                    let maxPage = Math.ceil(cartArr.length/cartPage[0].limit)
                    cartPage[0].page = maxPage > cartPage[0].page ? cartPage[0].page : maxPage
                    if (maxPage === 0) cartPage[0].page = 1
                    localStorage.setItem('page', JSON.stringify(cartPage)) 
                    // если 0 удаляем
                this.CartLayout(main.mainContainer)
                header.update()
                return
            }
            
             
        })
        return itemControl
    }
    //-----------------------------------------------section
    public CartLayout(container: HTMLElement | undefined, newData?: IProduct[]) {
       
            if (container) {
                container.innerHTML = ''
                let cartArr = getCartArr()
                if (cartArr.length > 0){
                container.append(this.createCartContainer())
                } else {
                    container.append(this.createCartEmpty()) 
                }
            }
        return this.CartLayout   
    }

    public createCartEmpty() {
        const cartEmpty = document.createElement('div')
        const cartEmptyTxt = document.createElement('h2')
        cartEmpty.classList.add('cart__empty')
        cartEmpty.textContent = 'Cart is empty'

        return cartEmpty
    }
    
}
