import Main from '@organisms/main';
import './_index.scss';

const mainObj = new Main();
mainObj.init();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
};
