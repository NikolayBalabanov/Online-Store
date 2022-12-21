type TCallBack = (event?: Event | undefined) => void

const enum KnownRoutes {
    HomePage = '/',
    ProductDetails = '/product-details',
    Cart = '/cart'
};

export function Router() {
    // create document click that watches the nav links only
    document.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as Element
        if (!target.matches('a')) {
            return;
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
            console.log('location /', location)
        } else if (location === KnownRoutes.Cart) {
            console.log('location /cart', location)
        } else if (location.match(KnownRoutes.ProductDetails)) {
            console.log('location /product-details', location)
        } else {
            console.log('location /404', location)
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
