import Search from '@molecules/search';
import './_index.scss';

class Header {
    constructor(className="o-header") {
        this.classSelector = `.${className}`;
    }

    init() {
        const search = new Search();
        const header = document.querySelector(this.classSelector);
        const currentLocation = window.location.pathname || '/';
        const link = header.querySelector(`[href*="${currentLocation}"]`);
        link.style = 'border-bottom: 3px solid #333; font-weight: bold;';

        search.init();
    }
}

export default Header;