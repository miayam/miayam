import { stripTags } from '@scripts/utilities/string';

class Search {
    constructor(className="m-search", id="js-m-search") {
        this.id = id;
        this.className = className;
    }

    init() {
        const search = document.getElementById(this.id);
        const input = document.getElementById(`${this.id}__input`)
        const close = search.getElementsByClassName(`${this.className}__close`)[0];
        const BASE_URL = 'https://cms.miayam.io/wp-json';
        const SEARCH_API = `${BASE_URL}/relevanssi/v1/search?keyword=thomas`;

        fetch(SEARCH_API).then(
            response => response.json()
        ).then(data => {
            console.log(data) // Prints result from `response.json()` in getRequest
            const normalizedData = data.map(datum => {
                return {
                    id: datum.id,
                    content: stripTags(datum.content.rendered),
                    excerpt: stripTags(datum.excerpt.rendered)
                };
            });
            console.log(normalizedData);
        });

        input.addEventListener('focus', () => {
            close.style = 'visibility: visible;';
        });

        input.addEventListener('blur', () => {
            close.style = 'visibility: hidden;';
        });
    }
}

export default Search;