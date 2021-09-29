const BASE_URL = 'https://cms.miayam.io/wp-json/wp/v2';
const POSTS_API = `${BASE_URL}/posts?orderby=date&order=desc`;
const TAGS_API = `${BASE_URL}/tags`;
const Cache = require('@11ty/eleventy-cache-assets');
const fetch = require('node-fetch');
const chunk = require('lodash.chunk');
const highlight = require('./highlight');

const getTags = async () => {
	// Get unique list of tags
  try {
    const json = await Cache(TAGS_API,{
      duration: '30m',
      type: 'json'
    });

    const tagsFromAPI = json.map(item => ({
      id: item.id,
      name: item.slug,
      wording: item.name,
      href: `/tags/${item.slug}`
    }));

    const customTag = {
      id: 0,
      name: 'all',
      wording: 'All',
      href: '/tags/all'
    };

    // Return formatted data.
    return [
      customTag,
      ...tagsFromAPI
    ];
  }
  catch (err) {
    console.log(`WordPress API call failed: ${err}`);
    return null;
  }
}

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
    const posts = await Cache(`${POSTS_API}&page=${page}`, {
      duration: '30m',
      type: 'json'
    });

    // Return formatted data.
    return formatData(posts);
  }
  catch (err) {
    console.log(`WordPress API call failed: ${err}`);
    return null;
  }
};

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
        tagWording: tag.wording,
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
        date: p.date,
        formattedDate: (new Date(p.date)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}),
        title: p.title.rendered,
        excerpt: highlight(p.excerpt.rendered),
        content: highlight(p.content.rendered),
				tags: p.tags,
      };
    });
};

module.exports = {
	appendPrevAndNextItemByTag,
	categorizeDataByTag,
	getTotalPages,
	getPosts,
	getTags
};
