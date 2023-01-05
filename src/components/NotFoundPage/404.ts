import './404.scss'

export function notFoundPage(container: HTMLElement | undefined) {
    const wrap = document.createElement('div')
    const text = document.createElement('h1')
    wrap.classList.add('never-page')
    text.classList.add('never-page__text')
    wrap.append(text)
    text.textContent = 'PAGE NOT FOUND (404)'
    if (container) {
        container.innerHTML = ''
        container.append(wrap)
    }
}