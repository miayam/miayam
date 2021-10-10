import Header from '@organisms/header';
import Main from '@organisms/main';
import Iterator from '@molecules/iterator';

import './_index.scss';

const header = new Header();
const main = new Main();
const iterator = new Iterator();

header.init();
main.init();
iterator.init();
