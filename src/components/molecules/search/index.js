// import { stripTags } from '@scripts/utilities/string';
import { SEARCH_API } from '@constants/api';
import debounce from '@scripts/utilities/debounce';

class Search {
    constructor(className="m-search", id="js-m-search") {
        const search = document.getElementById(id);
        const input = document.getElementById(`${id}__input`);

        this.id = id;
        this.className = className;
        this.search = search;
        this.input = input;
    }

    buildSuggestion(data = []) {
        // API gives results
        if (Array.isArray(data) && data.length > 0) {
            console.log(data, 'berhasil')
        } else {
            console.log('babu');
        }
    }

    getSearchResult(keyword = "") {
        console.log(keyword);
        const url = `${SEARCH_API}?keyword=${keyword}&type=post`;
        fetch(url)
            .then(response => response.json())
            .then(this.buildSuggestion)
            .catch(err => {
                console.log(err);
                this.buildSuggestion([]);
            });
    }

    init() {
        const close = this.search.getElementsByClassName(`${this.className}__close`)[0];

        this.input.addEventListener('focus', () => {
            close.style = 'visibility: visible;';
        });

        this.input.addEventListener('blur', () => {
            close.style = 'visibility: hidden;';
        });

        this.input.addEventListener('keyup', debounce((e) => {
            this.getSearchResult(e.target.value);
        }, 100));
    }
}

export default Search;