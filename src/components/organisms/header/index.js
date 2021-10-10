import Navigation from '@molecules/navigation';
import Search from '@molecules/search';

class Header {
    constructor(className="o-header") {
        this.className = className;
        this.header = document.getElementById(this.id);
        this.hasBeenCalled = false;
    }

    init() {
        const navigation = new Navigation();
        const search = new Search();

        navigation.init();
        search.init();
    }
}

export default Header;