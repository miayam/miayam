import './_index.scss';

class Header {
    constructor(className="o-header", id="js-o-header") {
        this.id = id;
        this.className = className;
        this.header = document.getElementById(this.id);
    }

    activeLink() {
        const currentLocation = window.location.pathname || '/';
        const activeLink = this.header.querySelector(`[href*="${currentLocation}"]`);
        const activeStyle = 'border-bottom: 4px solid #333; font-weight: bold;';
        activeLink.style = activeStyle;
    }

    init() {
        this.activeLink();
        const links = this.header.getElementsByTagName('a');

        Array.from(links).map((link) => {
            link.addEventListener('click', () => {
                this.activeLink();
            });
        });

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