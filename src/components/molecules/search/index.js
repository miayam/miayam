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
        <div class="m-search__resultItemHeader">
          <h2>${keyword || "Enter keyword"}</h2>
        </div>
        <p class="m-search__resultItemContent">
          No result...
        </p>
      </li>
    `;

    if (Array.isArray(data) && data.length > 0) {
      const lists = data.map(datum => {
        const title = stripTags(datum.title.rendered);
        const content = stripTags(datum.content.rendered);
        const words = content.split(' ');
        const firstAppearanceIndex = words.findIndex(word => {
          const regex = new RegExp(keyword, 'gi');
          return word.match(regex);
        });
        const normalizedContent = words
          .slice(firstAppearanceIndex, firstAppearanceIndex + 20)
          .map(word => {
            const regex = new RegExp(keyword, 'gi');
            if (word.match(regex)) {
              return `<mark>${word}</mark>`
            }

            return word;
          })
          .join(' ');
        
        if (normalizedContent.length === 0) {
          return '';
        }
        
        return `
          <li class="m-search__resultItem">
            <div class="m-search__resultItemHeader">
              <h2>${title}</h2>
            </div>
            <p class="m-search__resultItemContent">
              .${'...' + normalizedContent + '...'}
            </p>
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
      this.results.style = '';
      this.close.style = 'color: white;';
    });

    this.close.addEventListener('click', () => {
      this.input.value = '';
      this.buildSuggestion([], '');
    });
  }
}

export default Search;