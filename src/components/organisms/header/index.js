import Navigation from '@molecules/navigation';

class Header {
    constructor(className="o-header") {
        this.className = className;
        this.header = document.getElementById(this.id);
    }

    init() {
        const navigation = new Navigation();

        navigation.init();
    }
}

export default Header;