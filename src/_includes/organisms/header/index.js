import './_index.scss';

class Header {
    constructor(className="o-header") {
        this.className = `.${className}`;
    }

    init() {
        const header = document.querySelector(this.className);
        const currentLocation = window.location.pathname || '/';
        const link = header.querySelector(`[href*="${currentLocation}"]`);
        link.style = 'border-bottom: 3px solid #333;';
    }
}

export default Header;