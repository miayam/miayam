import Header from '@organisms/header';
import Main from '@organisms/main';

import './_index.scss';

const header = new Header();
const main = new Main('blog');

header.init();
main.init();
