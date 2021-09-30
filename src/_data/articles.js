const {
  getTags,
  getPosts,
  getTotalPages,
  categorizeDataByTag,
  appendPrevAndNextItemByTag,
} = require('../scripts/utilities/headless');

const main = async () => {
  const posts = [];

  // Get number of pages.
  const wpPages = await getTotalPages();
  // Get tags
  const tags = await getTags();
  if (!wpPages) return posts;

  // Fetch all pages of posts.
  const wpList = [];
  for (let page = 1; page <= wpPages; page++) {
    wpList.push(getPosts(page));
  }

  const list = (await Promise.all(wpList)).flat();
  const normalizedList = appendPrevAndNextItemByTag({ data: list, tags });
  const tagMap = categorizeDataByTag({ data: normalizedList, paginationSize: 9, tags });

  console.log(tagMap);

  const data = {
    list: normalizedList,
    tags: tagMap,
    labels: tags.sort((a, b) => a.id - b.id),
  };

  return data;
};

// Process WordPress posts.
module.exports = main;
