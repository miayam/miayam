class Search {
    constructor(className="m-search", id="js-m-search") {
        this.id = id;
        this.className = className;
    }

    init() {
        const search = document.getElementById(this.id);
        const input = document.getElementById(`${this.id}__input`)
        const close = search.getElementsByClassName(`${this.className}__close`)[0];

        input.addEventListener('focus', () => {
            close.style = 'visibility: visible;';
        });

        input.addEventListener('blur', () => {
            close.style = 'visibility: hidden;';
        });
    }
}

export default Search;