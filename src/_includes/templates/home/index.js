import './_index.scss';
import '@styles/universe/prismjs-theme.scss';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};
