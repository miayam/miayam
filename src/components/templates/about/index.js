import Header from '@organisms/header';
import Leaflet from '@organisms/leaflet';
import './_index.scss';

const header = new Header();
const leaflet = new Leaflet('about');

header.init();
leaflet.init();
