import './_index.scss';

class Header {
    constructor(className="o-header", id="js-o-header") {
        this.id = id;
        this.className = className;
        this.header = document.getElementById(this.id);
        this.hasBeenCalled = false;
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
        const input = document.getElementById('js-m-search__input');

        const loadSearchModule = (initiator) => () => {
            import(
                /* webpackChunkName: "search" */
                '@molecules/search'
            ).then(({ default: Search }) => {
                if (!this.hasBeenCalled) {
                    const searchObj = new Search();
                    searchObj.init();
                    this.hasBeenCalled = true;
                    initiator.removeEventListener('mouseenter', loadSearchModule);
                }
            });
        };

        // When users hover over body, load chunk and initiate search module.
        body.addEventListener('mouseenter', loadSearchModule(body));
        // When users input characters on mobile, load chunk and initiate search module.
        input.addEventListener('focus', loadSearchModule(input));
    }
}

export default Header;