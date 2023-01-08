import { appData, header, IProduct } from "../../index"
import { getCartArr } from "../../utils/getCartArr"
import { ICartItem, Main } from "../Main/main"
import './cart.scss'
export class Cart {
    public cartContainer: HTMLDivElement | undefined
    public cartEmpty: HTMLDivElement | undefined

    price: HTMLSpanElement | undefined
    cartCnt: HTMLSpanElement | undefined

    // create cart page 
    constructor () {}
    
    
    public createCartContainer(newData?:IProduct) {
        const cartContainer = document.createElement('div')
        const cartWrapper = document.createElement('div')
        cartWrapper.classList.add('cart__wrapper')
        cartContainer.classList.add('cart__container')
        cartContainer.append(cartWrapper)
        cartWrapper.append(this.createProductsContainer(),
        this.createSummaryContainer())
             
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
        const appliedPromo = document.createElement('div')
        const appliedPromoTxt = document.createElement('span')
        const applyDrop = document.createElement('span')
        const promoCode = document.createElement('div')
        const promoCodeInput = document.createElement('input')
        const promoRes = document.createElement('div')
        const promoResTxt = document.createElement('span')
        const promoTestTxt = document.createElement('span')
        const buttonCartBuy = document.createElement('button')

        summaryName.classList.add('summary')
        summaryName.textContent = 'Summary'
        totalPrice.classList.add('total_price')
        totalPriceTxt.classList.add('total_price')
        totalPriceTxt.textContent = `Products:  ${7}` //--------------
        totalPriceSumm.classList.add('total_price', 'old_price')
        totalPriceSummTxt.classList.add('total_price')
        totalPriceSummTxt.textContent = `Total:  €${'13549.00'}` //--------------
        resultPriceSumm.classList.add('result_price', 'total_price')
        resulPriceSummTxt.classList.add('result_price', 'total_price')
        resulPriceSummTxt.textContent= `Total:  €${'10549.00'}` //--------------
        applyCodes.classList.add('apply_codes')
        applyCodesTxt.classList.add('apply_txt')
        applyCodesTxt.textContent = 'Applied codes'
        appliedPromo.classList.add('applied_promo')
        appliedPromoTxt.classList.add ('applied_promo')
        appliedPromoTxt.textContent = `Rolling Scopes School ${10}%` //------------
        applyDrop.classList.add ('apply_drop')
        applyDrop.textContent = 'DROP'
        promoCode.classList.add('promo_code')
        promoCodeInput.classList.add('input_promo', 'promo_valid')
        promoCodeInput.placeholder = 'Enter promo code'
        promoCodeInput.type = 'search'
        promoRes.classList.add('res_promo')
        promoResTxt.classList.add('res_promo')
        promoResTxt.textContent = `Rolling Scopes School ${10}%` //------------
        promoTestTxt.classList.add('test_promo')
        promoTestTxt.textContent = `Promo for test: 'RS'`
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
        applyCodes.append(appliedPromo)
        appliedPromo.append(appliedPromoTxt)
        appliedPromo.append(applyDrop)
        summaryContainer.append(promoCode)
        promoCode.append(promoCodeInput)
        summaryContainer.append(promoRes)
        promoRes.append(promoResTxt)
        summaryContainer.append(promoTestTxt)
        summaryContainer.append(buttonCartBuy)

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
      
        // Присвоить переменную для ввода input +
        // pageNumber - число страниц товаров

        titleName.textContent = 'Products In Cart'
        limitName.textContent = 'LIMIT: '
        limitInput.placeholder = '1'
        limitInput.min ='1'
        limitInput.type = 'number'
        pageName.textContent = ' PAGE: '
        pageButtonLeft.textContent = ' < '
        pageButtonRight.textContent = ' > '
        pageNumber.textContent = ' 1 '
      
        productControl.append(titleName, pageControl)
        pageControl.append(limitPages)
        limitPages.append(limitName, limitInput)
        pageControl.append(pageNumberContainer)
        pageNumberContainer.append(pageName, pageButtonLeft, pageNumber, pageButtonRight)

        return productControl
    }
// - - -      тут заполнить items товары - - -
    public createProductsItems () {
        let cartArr = getCartArr()
        let counterCart = cartArr.length
        const productsItems = document.createElement('div')
        productsItems.classList.add('product__items_cart')
        for (var i = 1; i <= counterCart; i++) {
             
        productsItems.append(this.createCartItem(i))

        }
        return productsItems
    }
// заполняем строку товара
    public createCartItem (idIt?:number) {
        let cartArr = getCartArr()
        let idProduct = cartArr[Number(idIt) - 1].id 
        const cartItem = document.createElement('div')
        const item_i = document.createElement('div')
        const itemNumber = document.createElement('span')

        cartItem.classList.add('cart__item')
        item_i.classList.add(`item_${idIt}`)
        itemNumber.textContent = `${idIt}` //number product in cart

        cartItem.append(item_i)
        item_i.append(itemNumber)
        console.log('idStor', idProduct )
        cartItem.append(this.createItemInfo(idProduct), this.createItemControl())
        
        return cartItem
    }

    public createItemInfo (idp?:number) {
        const itemInfo = document.createElement('div')
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
        
        console.log('iteminfo',idp)
           
       
        console.log(appData)

        itemInfo.classList.add('item_info')
        itemImage.classList.add('item_image')
        itemImage.alt = 'image'
        itemImage.src = 'https://i.dummyjson.com/data/products/1/thumbnail.jpg' // присвоить переменную
        itemsDetails.classList.add('item_details')
        itemTitle.classList.add('item_title')
        itemName.classList.add('item_name')
        itemName.textContent = 'iPhone9' // ------------
        itemDescription.classList.add('item_description')
        itemDescriptionTxt.classList.add('item_description_txt')
        itemDescriptionTxt.textContent = 'An apple mobile which is nothing like apple' // -----------
        itemOther.classList.add('item_other')
        itemRating.classList.add('item_rating')
        itemRatingTxt.textContent = 'Rating: 4.69' //------------------
        itemDiscount.classList.add('item_discount')
        itemDiscountTxt.textContent = 'Discount: 12.96%' //-------------------
   
        itemInfo.append(itemImage)
        itemInfo.append(itemsDetails)
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
    public createItemControl() {
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
        stockControlTxt.textContent = 'Stock: 94' ////-----------------
        stockButtonControl.classList.add('stock_button_control')
        stockButtonPlus.classList.add('stock_plus', 'stock_button')
        stockButtonPlus.textContent = '+'
        stockInfo.textContent = '1' //---------------------
        stockButtonMinus.classList.add('stock_minus', 'stock_button')
        stockButtonMinus.textContent = '-'
        itemAmountControl.classList.add('amount_control')
        itemAmount.textContent = '€549.00'  // -------------------

        itemControl.append(stockControl)
        stockControl.append(stockControlTxt)
        itemControl.append(stockButtonControl)
        stockButtonControl.append(stockButtonPlus)
        stockButtonControl.append(stockInfo)
        stockButtonControl.append(stockButtonMinus)
        itemControl.append(itemAmountControl)
        itemAmountControl.append(itemAmount)

        return itemControl

    }
    //-----------------------------------------------test section
    public CartLayout(container: HTMLElement | undefined, newData?: IProduct[]) {
       
            if (container) {
                container.innerHTML = ''
                container.append(this.createCartContainer())
               // productContainer.append(this.createLayout(this.urlParse()))
               // this.fetchProduct(this.urlParse())
            }
            return this.CartLayout
        }
/*
        let cartArr = getCartArr()
        let counterCart = cartArr.length
        console.log('Hi! I am Cart!')
        console.log(cartArr)
        //console.log(newData[1].description)
        //console.log('appdata', newData[1].thumbnail)
        

                
        if (cartArr.length > 0){
            console.log('cartContainer')
            Main.append(this.createCartContainer())
     

        } else {
            console.log('cartEmpty')
            document.body.append(this.createCartEmpty())  
        }
    
        return this.CartLayout
    
    }
*/
    public createCartEmpty() {
        const cartEmpty = document.createElement('div')
        const cartEmptyTxt = document.createElement('h2')
        cartEmpty.classList.add('cart__empty')
        cartEmpty.textContent = 'cart empty'

        return cartEmpty
    }

}
