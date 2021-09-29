import Header from '@organisms/header';
import Posts from '@organisms/posts';

import './_index.scss';

const headerObj = new Header();
const postsObj = new Posts();

headerObj.init();
postsObj.init();
