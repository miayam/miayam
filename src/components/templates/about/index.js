import Header from '@organisms/header';
import Main from '@organisms/main';
import './_index.scss';

const headerObj = new Header();
const mainObj = new Main();

headerObj.init();
mainObj.init();