import { stripTags } from '@scripts/utilities/string';
import { SEARCH_API } from '@constants/api';
import debounce from '@scripts/utilities/debounce';

class Search {
  constructor(className="m-search", id="js-m-search") {
    const search = document.getElementById(id);
    const input = document.getElementById(`${id}__input`);
    const resultItems = document.getElementsByClassName(`${className}__resultItems`)[0];
    const results = document.getElementsByClassName(`${className}__results`)[0];
    const close = document.getElementsByClassName(`${className}__close`)[0];


    this.id = id;
    this.className = className;
    this.search = search;
    this.input = input;
    this.resultItems = resultItems;
    this.results = results;
    this.close = close;
  }

  buildSuggestion(data = [], keyword) {
    // API gives results
    const emptyState = `
      <li class="m-search__resultItem">
        <p class="m-search__resultItemHeader">
          ${keyword || "Enter keyword"}
        </p>
        <p class="m-search__resultItemContent">
          No result...
        </p>
      </li>
    `;

    if (Array.isArray(data) && data.length > 0) {
      const lists = data.map(datum => {
        const title = stripTags(datum.title.rendered);
        const href = `/articles/${datum.slug}`;
        const regex = new RegExp(keyword, 'gi');
        const content = stripTags(datum.content.rendered);
        const firstOccuranceIndex = content.toLowerCase().indexOf(keyword.toLowerCase());
        const normalizedContent = content.slice(firstOccuranceIndex, firstOccuranceIndex + 200).replaceAll(regex, (matched) => `<mark>${matched}</mark>`);
       
        if (normalizedContent.length === 0) {
          return '';
        }

        return `
          <li class="m-search__resultItem">
            <a href="${href}">
              <p class="m-search__resultItemHeader">
                ${title}
              </p>
              <p class="m-search__resultItemContent">
                ${'[...] ' + normalizedContent + ' [...]'}
              </p>
            </a>
          </li>
        `;
      });

      const contentLength = lists.join('').length;
      this.resultItems.innerHTML = contentLength > 0 ? lists.join('') : emptyState;
    } else {
      this.resultItems.innerHTML = emptyState;
    }
  }

  getSearchResult(keyword = "") {
    const url = `${SEARCH_API}?keyword=${keyword}`;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.buildSuggestion(json, keyword);
      })
      .catch(() => {
        this.buildSuggestion([], keyword);
      });
  }

  init() {
    this.input.addEventListener('keyup', debounce((e) => {
      this.getSearchResult(e.target.value);
    }, 100));

    this.input.addEventListener('focus', () => {
      this.results.style = 'display: block;';
      this.close.style = 'color: #333;';
    });

    this.input.addEventListener('blur', () => {
      const self = this;
      setTimeout(() => {
        self.results.style = '';
        self.close.style = 'color: white;';
      }, 300);
    });

    this.close.addEventListener('click', () => {
      this.input.value = '';
      this.buildSuggestion([], '');
    });
  }
}

export default Search;