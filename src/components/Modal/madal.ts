import { appData, header, isModalOpen, main } from "../../index"
import './modal.scss'

enum errorMsgs {
    name = 'must contain less than two words, each at least 3 characters long',
    phone = 'must start with "+", contain only digits and be no shorter than 9 digits',
    address = 'must contain less than three words, each at least 5 characters long',
    email = 'not a valid Email',
    cvv = 'CVV must have a length of 3',
    valid = 'VALID format is MM:YY',
    number = 'Card number must have a length of 16'
}

enum errorTag {
    person = 'person__error',
    card = 'credit-card__error'
}

enum fieldsNames {
    name = 'name',
    phone = 'phone',
    address = 'address',
    email = 'email',
    cvv = 'cardCVV',
    valid = 'cardDate',
    number = 'cardNumber'
}

export class Modal {
    private modal: HTMLDivElement | undefined
    private personName!: HTMLInputElement
    private personNameWrap!: HTMLDivElement
    private personPhone!: HTMLInputElement
    private personPhoneWrap!: HTMLDivElement
    private personAddress!: HTMLInputElement
    private personAddressWrap!: HTMLDivElement
    private personEmail!: HTMLInputElement
    private personEmailWrap!: HTMLDivElement
    private cardWrap!: HTMLDivElement
    private cardInfo!: HTMLDivElement
    private cardCVV!: HTMLInputElement
    private cardValid!: HTMLInputElement
    private cardNumber!: HTMLInputElement
    constructor() {}

    public render() {
        this.modal = this.createModal()
        document.body.append(this.modal)
    }
    public remove() {
        this.modal?.remove()
    }
    private createModal() {
        const modal = document.createElement('div')
        const modalContent = document.createElement('div')
        const form = document.createElement('form')
        const personDetails = document.createElement('div')
        const presonTitle = document.createElement('h3')
        const personNameWrap = document.createElement('div')
        const personName = document.createElement('input')
        const personPhoneWrap = document.createElement('div')
        const personPhone = document.createElement('input')
        const personAddressWrap = document.createElement('div')
        const personAddress = document.createElement('input')
        const personEmailWrap = document.createElement('div')
        const personEmail = document.createElement('input')

        const cardWrap = document.createElement('div')
        const cardTitle = document.createElement('h3')
        const cardInfo = document.createElement('div')
        const cardNumberWrap = document.createElement('div')
        const cardLogo = document.createElement('img')
        const cardNumber = document.createElement('input')
        const cardBottom = document.createElement('div')
        const cardValidWrap = document.createElement('div')
        const cardValidText = document.createElement('span')
        const cardValid = document.createElement('input')
        const cardCVVWrap = document.createElement('div')
        const cardCVVText = document.createElement('span')
        const cardCVV = document.createElement('input')

        const confirmBtn = document.createElement('button')

        modal.classList.add('modal')
        modalContent.classList.add('modal__content')
        form.classList.add('modal__form')
        personDetails.classList.add('modal__person', 'person')
        presonTitle.classList.add('modal__title')
        personNameWrap.classList.add('person__input-wrap')
        personName.classList.add('person__input')
        personPhoneWrap.classList.add('person__input-wrap')
        personPhone.classList.add('person__input')
        personAddressWrap.classList.add('person__input-wrap')
        personAddress.classList.add('person__input')
        personEmailWrap.classList.add('person__input-wrap')
        personEmail.classList.add('person__input')

        cardWrap.classList.add('modal__credit-card', 'credit-card')
        cardTitle.classList.add('modal__title')
        cardInfo.classList.add('credit-card__info')
        cardNumberWrap.classList.add('credit-card__input-wrap', 'credit-card__top')
        cardLogo.classList.add('credit-card__logo')
        cardNumber.classList.add('credit-card__input')
        cardBottom.classList.add('credit-card__bottom')
        cardValidWrap.classList.add('credit-card__input-wrap')
        cardValidText.classList.add('credit-card__text')
        cardValid.classList.add('credit-card__input', 'credit-card__input-small')
        cardCVVWrap.classList.add('credit-card__input-wrap')
        cardCVVText.classList.add('credit-card__text')
        cardCVV.classList.add('credit-card__input', 'credit-card__input-small')

        confirmBtn.classList.add('modal__confirm')

        modal.append(modalContent)
        modalContent.append(form)
        form.append(personDetails, cardWrap, confirmBtn)
        personDetails.append(presonTitle, personNameWrap, personPhoneWrap, personAddressWrap, personEmailWrap)
        presonTitle.textContent = 'Personal details '
        personNameWrap.append(personName)
        personName.type = 'text'
        personName.placeholder = 'Name'
        personName.name = 'name'
        personPhoneWrap.append(personPhone)
        personPhone.type = 'text'
        personPhone.placeholder = 'Phone number'
        personPhone.name = 'phone'
        personAddressWrap.append(personAddress)
        personAddress.type = 'text'
        personAddress.placeholder = 'Delivery address'
        personAddress.name = 'address'
        personEmailWrap.append(personEmail)
        personEmail.type = 'text'
        personEmail.placeholder = 'E-mail'
        personEmail.name = 'email'

        this.personName = personName
        this.personNameWrap = personNameWrap
        this.personPhone = personPhone
        this.personPhoneWrap = personPhoneWrap
        this.personAddress = personAddress
        this.personAddressWrap = personAddressWrap
        this.personEmail = personEmail
        this.personEmailWrap = personEmailWrap

        cardWrap.append(cardTitle, cardInfo)
        cardTitle.textContent = 'Credit card details'
        cardInfo.append(cardNumberWrap, cardBottom)
        cardNumberWrap.append(cardLogo, cardNumber)
        cardLogo.alt = 'default-logo'
        cardLogo.src = 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71'
        cardNumber.type = 'text'
        cardNumber.placeholder = 'Card number'
        cardNumber.name = 'cardNumber'
        cardBottom.append(cardValidWrap, cardCVVWrap)
        cardValidWrap.append(cardValidText, cardValid)
        cardValidText.textContent = ' VALID: '
        cardValid.type = 'text'
        cardValid.placeholder = 'Valid Thru'
        cardValid.name = 'cardDate'
        cardCVVWrap.append(cardCVVText, cardCVV)
        cardCVVText.textContent = ' CVV: '
        cardCVV.type = 'text'
        cardCVV.placeholder = 'Code'
        cardCVV.name = 'cardCVV'

        this.cardWrap = cardWrap
        this.cardInfo = cardInfo
        this.cardCVV = cardCVV
        this.cardValid = cardValid
        this.cardNumber = cardNumber

        confirmBtn.textContent = 'CONFIRM'
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if (this.valideteFields()) {
                const successModal = this.createSuccessModal()
                document.body.append(successModal)
                localStorage.setItem('cart', JSON.stringify([]))
                header.update()
                setTimeout(() => {
                    successModal.remove()
                    this.remove()
                    isModalOpen.state = false
                    window.history.pushState({}, '', '/');
                    main.update(appData)
                }, 3000);
            }
        })
        modal.addEventListener('click', (e) =>{
            if (e.target === modal) {
                isModalOpen.state = false
                this.remove()
            }
        })
        cardNumber.addEventListener('input', () => {
            switch(cardNumber.value[0]) {
                case '1':
                    cardLogo.alt = 'JCB'
                    cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/200px-JCB_logo.svg.png'
                    break
                case '2':
                    cardLogo.alt = 'Mastercard'
                    cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/772px-Mastercard-logo.svg.png'
                    break
                case '6':
                    cardLogo.alt = 'Discovery'
                    cardLogo.src = 'https://www.discover.com/content/dam/dfs/credit-cards/global/images/discover-logo.png'
                    break
                case '4':
                    cardLogo.alt = 'visa'
                    cardLogo.src = 'https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg'
                    break
                case '5':
                    cardLogo.alt = 'Mastercard'
                    cardLogo.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/772px-Mastercard-logo.svg.png'
                    break
                default:
                    cardLogo.alt = 'default-logo'
                    cardLogo.src = 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71'
                    break
            }
            if (this.isValidVal(cardNumber.value, fieldsNames.number)) {
                const errs = cardWrap.querySelectorAll('.credit-card__error')
                errs.forEach(el => {
                    if (el.textContent === errorMsgs.number) {
                        el.remove()
                    }
                })
            }
        })
        cardNumber.addEventListener('keypress', (e) => {
            if (cardNumber.value.length === 16) e.preventDefault()
            if(!/\d/.test(e.key)) e.preventDefault();
        })
        cardNumber.addEventListener('blur', () => {
            this.cardNumberChecker(cardNumber, cardWrap, cardInfo)
        })
        cardValid.addEventListener('input', () => {
            if (this.isValidVal(cardValid.value, fieldsNames.valid)) {
                const errs = cardWrap.querySelectorAll('.credit-card__error')
                errs.forEach(el => {
                    if (el.textContent === errorMsgs.valid) {
                        el.remove()
                    }
                })
            }
        })
        cardValid.addEventListener('keypress', (e) => {
            if(!/\d/.test(e.key)) e.preventDefault();
        })
        cardValid.addEventListener('keydown', (e) => {
            if (!(e.key === 'Backspace') && cardValid.value.length == 5) e.preventDefault()
            if (!(e.key === 'Backspace') && cardValid.value.length == 2) {
                cardValid.value += '/'
            }
        })
        cardValid.addEventListener('blur', () => {
            if (this.isValidVal(cardValid.value, fieldsNames.valid)) {
                const errs = cardWrap.querySelectorAll('.credit-card__error')
                errs.forEach(el => {
                    if (el.textContent === errorMsgs.valid) {
                        el.remove()
                    }
                })
            } else {
                const errs = cardWrap.querySelectorAll('.credit-card__error')
                errs.forEach(el => {
                    if (el.textContent === errorMsgs.valid) {
                        el.remove()
                    }
                })
                const len = cardWrap.children.length
                switch(len) {
                    case 2:
                        cardWrap.append(this.createErrorNotice(
                            errorMsgs.valid,
                            'credit-card__error'
                        ))
                        break
                    case 3:
                        const last = cardWrap.childNodes[len - 1]
                        switch(last.textContent) {
                            case 'Card number must have a length of 16':
                                cardWrap.append(this.createErrorNotice(
                                    errorMsgs.valid,
                                    'credit-card__error'
                                ))
                                break 
                            case 'CVV must have a length of 3':
                                cardWrap.insertBefore(this.createErrorNotice(
                                    errorMsgs.valid,
                                    'credit-card__error'
                                ), cardWrap.childNodes[len - 1])
                                break 
                        }
                        break
                    case 4:
                        cardWrap.insertBefore(this.createErrorNotice(
                            errorMsgs.valid,
                            'credit-card__error'
                        ), cardWrap.childNodes[len - 1])
                        break
                    default:
                        break
                }
            }
        })
        cardCVV.addEventListener('input', () => {
            if (this.isValidVal(cardCVV.value, fieldsNames.cvv)) {
                const errs = cardWrap.querySelectorAll('.credit-card__error')
                errs.forEach(el => {
                    if (el.textContent === errorMsgs.cvv) {
                        el.remove()
                    }
                })
            }
        })
        cardCVV.addEventListener('blur', () => {
            this.cardValidCVVChecker(cardCVV, cardWrap)
        })
        cardCVV.addEventListener('keypress', (e) => {
            if (cardCVV.value.length === 3) e.preventDefault()
            if(!/\d/.test(e.key)) e.preventDefault();
        })
        personEmail.addEventListener('input', () => {
            if (this.isValidVal(personEmail.value, fieldsNames.email)) {
                const err = personEmailWrap.querySelector('.person__error')
                err?.remove()
            }
        })
        personEmail.addEventListener('blur', () => {
            const tag = 'person__error'
            this.personInputChecker(personEmail, personEmailWrap, fieldsNames.email, tag, errorMsgs.email)
        })
        personAddress.addEventListener('input', () => {
            if (this.isValidVal(personAddress.value, fieldsNames.address)) {
                const err = personAddressWrap.querySelector('.person__error')
                err?.remove()
            }
        })
        personAddress.addEventListener('blur', () => {
            const tag = 'person__error'
            this.personInputChecker(personAddress, personAddressWrap, fieldsNames.address, tag, errorMsgs.address)
        })
        personPhone.addEventListener('input', () => {
            if (this.isValidVal(personPhone.value, fieldsNames.phone)) {
                const err = personPhoneWrap.querySelector('.person__error')
                err?.remove() 
            }
        })
        personPhone.addEventListener('blur', () => {
            const tag = 'person__error'
            this.personInputChecker(personPhone, personPhoneWrap, fieldsNames.phone, tag, errorMsgs.phone)
        })
        personPhone.addEventListener('keypress', (e) => {
            if(!/\d/.test(e.key)) e.preventDefault()
        })
        personPhone.addEventListener('focus', () => {
            if(!/^\+\d*$/.test(personPhone.value)) personPhone.value = '+'
        })
        personName.addEventListener('input', () => {
            if (this.isValidVal(personName.value, fieldsNames.name)) {
                const err = personNameWrap.querySelector('.person__error')
                err?.remove() 
            }
        })
        personName.addEventListener('blur', () => {
            const tag = 'person__error'
            this.personInputChecker(personName, personNameWrap, fieldsNames.name, tag, errorMsgs.name)
        })
        return modal
    }
    private personInputChecker(item: HTMLInputElement, container: HTMLDivElement, fildName: string, tag: string, error: string) {
        if (this.isValidVal(item.value, fildName)) {
            const err = container.querySelector(`.${tag}`)
            err?.remove()
        } else {
            const err = container.querySelector(`.${tag}`)
            if (!err) {
                container.append(this.createErrorNotice(
                    `${error}`,
                    `${tag}`
                ))
            }
        }
    }
    private cardNumberChecker(item: HTMLInputElement, container: HTMLDivElement, target: HTMLDivElement) {
        if (this.isValidVal(item.value, fieldsNames.number)) {
            const errs = container.querySelectorAll('.credit-card__error')
            errs.forEach(el => {
                if (el.textContent === errorMsgs.number) {
                    el.remove()
                }
            })
        } else {
            const errs = container.querySelectorAll('.credit-card__error')
            errs.forEach(el => {
                if (el.textContent === errorMsgs.number) {
                    el.remove()
                }
            })
            container.insertBefore(this.createErrorNotice(
                errorMsgs.number,
                'credit-card__error'
            ), target.nextSibling) //cardInfo
        }
    }
    private cardValidChecker(item: HTMLInputElement, container: HTMLDivElement) {
        if (this.isValidVal(item.value, fieldsNames.valid)) {
            const errs = container.querySelectorAll('.credit-card__error')
            errs.forEach(el => {
                if (el.textContent === errorMsgs.valid) {
                    el.remove()
                }
            })
        } else {
            const errs = container.querySelectorAll('.credit-card__error')
            errs.forEach(el => {
                if (el.textContent === errorMsgs.valid) {
                    el.remove()
                }
            })
            const len = container.children.length
            switch(len) {
                case 2:
                    container.append(this.createErrorNotice(
                        errorMsgs.valid,
                        'credit-card__error'
                    ))
                    break
                case 3:
                    const last = container.childNodes[len - 1]
                    switch(last.textContent) {
                        case errorMsgs.number:
                            container.append(this.createErrorNotice(
                                errorMsgs.valid,
                                'credit-card__error'
                            ))
                            break 
                        case errorMsgs.cvv:
                            container.insertBefore(this.createErrorNotice(
                                errorMsgs.valid,
                                'credit-card__error'
                            ), container.childNodes[len - 1])
                            break 
                    }
                    break
                case 4:
                    container.insertBefore(this.createErrorNotice(
                        errorMsgs.valid,
                        'credit-card__error'
                    ), container.childNodes[len - 1])
                    break
                default:
                    break
            }
        }
    }
    private cardValidCVVChecker(item: HTMLInputElement, container: HTMLDivElement) {
        if (this.isValidVal(item.value, fieldsNames.cvv)) {
            const errs = container.querySelectorAll('.credit-card__error')
            errs.forEach(el => {
                if (el.textContent === errorMsgs.cvv) {
                    el.remove()
                }
            })
        } else {
            const errs = container.querySelectorAll('.credit-card__error')
            errs.forEach(el => {
                if (el.textContent === errorMsgs.cvv) {
                    el.remove()
                }
            })
            container.append(this.createErrorNotice(
                errorMsgs.cvv,
                'credit-card__error'
            ))
        }
    }
    private isValidVal(str: string, field: string): boolean {
        switch(field) {
            case fieldsNames.name:
                return (str.split(' ').length >= 2) && str.split(' ').every(el => el.length > 2)
            case fieldsNames.phone:
                return str[0] === '+' && str.length > 9
            case fieldsNames.address:
                return (str.split(' ').length >= 3) && str.split(' ').every(el => el.length > 4)
            case fieldsNames.email:
                return !!str && /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i.test(str)
            case fieldsNames.number:
                return str.length === 16
            case fieldsNames.valid:
                if (str.length === 5) {
                    const [month, year] = str.split('/')
                    if (+month > 12) return false
                    const curYear = (new Date()).getFullYear() - 2000
                    if (+year >= curYear) return true
                }
                return false
            case fieldsNames.cvv:
                return str.length === 3
            default:
                return false
        }
    }
    private createErrorNotice(notice: string, className: string) {
        const error = document.createElement('div')
        error.classList.add(`${className}`)
        error.textContent = notice
        return error
    }
    private valideteFields() {
        // валидируем персон
        //name
        this.personInputChecker(this.personName, this.personNameWrap, fieldsNames.name, errorTag.person, errorMsgs.name)
        //phone
        this.personInputChecker(this.personPhone, this.personPhoneWrap, fieldsNames.phone, errorTag.person, errorMsgs.phone)
        //address
        this.personInputChecker(this.personAddress, this.personAddressWrap, fieldsNames.address, errorTag.person, errorMsgs.address)
        //email
        this.personInputChecker(this.personEmail, this.personEmailWrap, fieldsNames.email, errorTag.person, errorMsgs.email)
        // валидируем кард
        this.cardNumberChecker(this.cardNumber, this.cardWrap, this.cardInfo)
        this.cardValidChecker(this.cardValid, this.cardWrap)
        this.cardValidCVVChecker(this.cardCVV, this.cardWrap)
        // возвращаем
        const personErrors = document.querySelectorAll(`.${errorTag.person}`)
        const cardErrors = document.querySelectorAll(`.${errorTag.card}`)
        return personErrors.length === 0 && cardErrors.length === 0
    }
    private createSuccessModal() {
        const success = document.createElement('div')
        const content = document.createElement('div')
        const text = document.createElement('h3')
        
        success.classList.add('success')
        content.classList.add('success__content')
        text.classList.add('success__text')
        success.append(content)
        content.append(text)
        text.textContent = 'Your order was successfull!!!'
        return success
    }
}