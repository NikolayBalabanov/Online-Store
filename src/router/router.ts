import { notFoundPage } from "../components/NotFoundPage/404";
import { details, main } from "../index";

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
        console.log('тут')
    });
     
    // create a function that watches the url and calls the urlLocationHandler
    const urlRoute: TCallBack = (event) => {
        console.log('тут1')
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
        console.log('тут2')
        if (location === KnownRoutes.HomePage) {
            console.log('location /', location)
            console.log('location is', window.location)
            main.update(main.parentData)
        } else if (location === KnownRoutes.Cart) {
            console.log('location /cart', location)
            details.render(main.mainContainer)

        } else if (location.includes(KnownRoutes.ProductDetails)) {
            console.log('location /product-details', location)
            details.render(main.mainContainer)
            // main.update(main.parentData)

        } else {
            console.log('location /404', location)
            notFoundPage(main.mainContainer)
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
