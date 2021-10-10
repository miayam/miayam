import Header from '@organisms/header';
import Posts from '@organisms/posts';

import './_index.scss';

const header = new Header();
const posts = new Posts();

header.init();
posts.init();
