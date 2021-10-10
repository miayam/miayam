import Header from '@organisms/header';
import Main from '@organisms/main';
import Article from '@molecules/article';
import './_index.scss';

const header = new Header();
const main = new Main();
const article = new Article();

header.init();
main.init();
article.init();
