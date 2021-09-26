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
    }

    init() {
        this.input.addEventListener('keyup', debounce((e) => {
            this.getSearchResult(e.target.value);
        }, 100));

        window.addEventListener('fetch-progress', (data) => {
            console.log(data.detail);
        });

        window.addEventListener('fetch-finished', (data) => {
            console.log('selesai', data.detail);
        })
    }
}

export default Search;