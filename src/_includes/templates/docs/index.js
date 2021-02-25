import './_index.scss';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
};
