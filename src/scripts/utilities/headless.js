const BASE_URL = 'https://cms.miayam.io/wp-json/wp/v2';
const POSTS_API = `${BASE_URL}/posts?orderby=date&order=desc`;
const SEARCH_API = `${BASE_URL}/search`;
const TAGS_API = `${BASE_URL}/tags`;
const fetch = require('node-fetch');
const chunk = require('lodash.chunk');
const highlight = require('./highlight');

const getTags = async () => {
	// Get unique list of tags
  try {
    const
      res = await fetch(TAGS_API),
      json = await res.json();

    // Return formatted data.
    return json.map(item => ({ id: item.id, name: item.name }));
  }
  catch (err) {
    console.log(`WordPress API call failed: ${err}`);
    return null;
  }
}

const getSearch = async () => {
  try {
    const
      res = await fetch(SEARCH_API),
      json = await res.json();
    
    return json;
  }
  catch (err) {
    console.log(`WordPress API call failed: ${err}`);
    return null;
  }
}

const appendPrevAndNextItemByTag = ({ data, tags }) => {
	const normalizedData = [...data];

  tags.forEach((tag) => {
    const taggedItems = data.filter(item => item.tags.includes(tag.id));
    taggedItems.forEach((taggedItem, index, thisArray) => {
      const prev = thisArray[index - 1];
      const next = thisArray[index + 1];
      taggedItem["prev"] = {...taggedItem["prev"], [tag.name]: prev};
      taggedItem["next"] = {...taggedItem["next"], [tag.name]: next};

			const position = normalizedData.findIndex((item) => item.id === taggedItem.id);
			normalizedData[position] = taggedItem;
    });
	});

	return normalizedData;
};

const categorizeDataByTag = ({ data, tags, paginationSize })  => {
  const tagMap = [];

  tags.forEach(tag => {
    const taggedItems = data.slice().filter(item => item.tags.includes(tag.id));
    const pagedItems = chunk(taggedItems, paginationSize);
    pagedItems.forEach((pagedItem, index) => {
      tagMap.push({
        tagName: tag.name,
        pageNumber: index,
        pageData: pagedItem
      });
    });
  });

  const allItems = chunk(data, paginationSize);
  allItems.forEach((item, index) => {
    tagMap.push({
      tagName: 'all',
      pageNumber: index,
      pageData: item
    });
  });

  return tagMap;
};

// Format data
const formatData = (data) => {
  return data
    .filter(p => p.content.rendered && !p.content.protected)
    .map(p => {
      return {
				id: p.id,
				url: `/articles/${p.slug}`,
        slug: p.slug,
        date: new Date(p.date),
        title: p.title.rendered,
        excerpt: highlight(p.excerpt.rendered),
        content: highlight(p.content.rendered),
				tags: p.tags,
      };
    });
};

// Fetch number of WordPress post pages.
const getTotalPages = async () => {
  try {
    const res = await fetch(`${POSTS_API}&_fields=id&page=1`);
    return res.headers.get('x-wp-totalpages') || 0;
  }
  catch(err) {
    console.log(`WordPress API call failed: ${err}`);
    return 0;
  }
};

// Fetch list of WordPress posts.
const getPosts = async (page = 1) => {
  try {
    const
      postsData = await fetch(`${POSTS_API}&page=${page}`),
      posts = await postsData.json();

    // Return formatted data.
    return formatData(posts);
  }
  catch (err) {
    console.log(`WordPress API call failed: ${err}`);
    return null;
  }
};

module.exports = {
	appendPrevAndNextItemByTag,
	categorizeDataByTag,
	getTotalPages,
  getSearch,
	getPosts,
	getTags
};
