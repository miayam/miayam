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

        if (activeLink) activeLink.style = activeStyle;
    }

    init() {
        this.activeLink();
        const links = this.header.getElementsByTagName('a');

        Array.from(links).map((link) => {
            link.addEventListener('click', () => {
                this.activeLink();
            });
        });

        const body = document.body;
        const loadSearchModule = () => {
            import(
                /* webpackChunkName: "search" */
                '@molecules/search'
            ).then(({ default: Search }) => {
                const searchObj = new Search();
                searchObj.init();

                body.removeEventListener('mouseenter', loadSearchModule);
            });
        };

        // When users hover over body, load chunk and initiate search module.
        body.addEventListener('mouseenter', loadSearchModule);
    }
}

export default Header;