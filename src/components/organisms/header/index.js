import navigation from '@molecules/navigation';
import './_index.scss';

class Header {
    constructor(className="o-header", id="js-o-header") {
        this.id = id;
        this.className = className;
        this.header = document.getElementById(this.id);
        this.hasBeenCalled = false;
    }

    init() {
        navigation();

        const body = document.body;
        const input = document.getElementById('js-m-search__input');

        const loadSearchModule = (initiator, eventName) => () => {
            import(
                /* webpackChunkName: "search" */
                '@molecules/search'
            ).then(({ default: Search }) => {
                if (!this.hasBeenCalled) {
                    const searchObj = new Search();
                    searchObj.init();
                    this.hasBeenCalled = true;
                    initiator.removeEventListener(eventName, loadSearchModule);
                }
            });
        };

        // When users hover over body, load chunk and initiate search module.
        body.addEventListener('mouseenter', loadSearchModule(body, 'mouseenter'));
        // When users input characters on mobile, load chunk and initiate search module.
        input.addEventListener('focus', loadSearchModule(input, 'focus'));

        input.addEventListener('focus', () => {
            const close = document.getElementsByClassName('m-search__close')[0];
            close.style = 'visibility: visible;'
        });

        input.addEventListener('blur', () => {
            const close = document.getElementsByClassName('m-search__close')[0];
            close.style = 'visibility: hidden;'
        });
    }
}

export default Header;