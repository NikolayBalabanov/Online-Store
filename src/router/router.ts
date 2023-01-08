import { notFoundPage } from "../components/NotFoundPage/404";
import { appData, details, isModalOpen, main, modal } from "../index";

type TCallBack = (event?: Event | undefined) => void

const enum KnownRoutes {
    HomePage = '/',
    ProductDetails = '/product-details/',
    Cart = '/cart'
};

export function Router() {
    // create document click that watches the nav links only
    document.addEventListener('click', (e: MouseEvent) => {
        let target = e.target as HTMLLinkElement
        if (!target.matches('a')) {
            return;
        }
        if (target.matches('a')) {
            // check origin link, if YES we use routing, else use default
            if (!target.href.match(window.location.origin)) {
                return
            }
        }
        e.preventDefault();
        urlRoute();
    });
     
    // create a function that watches the url and calls the urlLocationHandler
    const urlRoute: TCallBack = (event) => {
        event = event || window.event; // get window.event if event argument not provided
        if (event) {
            event.preventDefault();
            const target = event.target as HTMLLinkElement
            window.history.pushState({}, '', target.href);
            urlLocationHandler();
        }
    };
    
    // create a function that handles the url location
    const urlLocationHandler = () => {
        let location = window.location.pathname; // get the url path
        // if the path length is 0, set it to primary page route
        if (location.length == 0) {
            location = '/';
        }
        // in following cases instead console.log() we can set page render function
        // query params?
        if (location === KnownRoutes.HomePage) {
            main.update(appData)
            modal.remove()
        } else if (location === KnownRoutes.Cart) {
            if (main.mainContainer) main.mainContainer.innerHTML = ''
            // тут что-то что рендерит разметку карзины
            console.log('state', isModalOpen.state)
            // modal.render()
            if (isModalOpen.state) {
                modal.render()
            }
        } else if (location.includes(KnownRoutes.ProductDetails)) {
            console.log('location /product-details', location)
            if (main.mainContainer) main.mainContainer.innerHTML = ''
            details.render(main.mainContainer)
            modal.remove()
        } else {
            console.log('location /404', location)
            notFoundPage(main.mainContainer)
            modal.remove()
        }
    };
    
    // add an event listener to the window that watches for url changes
    window.onpopstate = urlLocationHandler;
    // call the urlLocationHandler function to handle the initial url
    const route = urlRoute;
    Object.assign(window, route)
    // call the urlLocationHandler function to handle the initial url
    urlLocationHandler();
}
