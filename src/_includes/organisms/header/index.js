import './_index.scss';

class Header {
    constructor(id="js-o-header") {
        this.id = id;
    }

    init() {
        const header = document.getElementById(this.id);
        const currentLocation = window.location.pathname || '/';
        const link = header.querySelector(`[href*="${currentLocation}"]`);
        link.style = 'border-bottom: 4px solid #333; font-weight: bold;';

        const search = document.querySelector('.m-search');
        const loadSearchModule = () => {
            import(
                /* webpackChunkName: "search" */
                '@molecules/search'
            ).then(({ default: Search }) => {
                const searchObj = new Search();
                searchObj.init();

                search.removeEventListener('mouseenter', loadSearchModule);
            });
        };

        search.addEventListener('mouseenter', loadSearchModule);
    }
}

export default Header;