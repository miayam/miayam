import Header from '@organisms/header';
import Leaflet from '@organisms/leaflet';

import './_index.scss';

const header = new Header();
const leaflet = new Leaflet('blog');

header.init();
leaflet.init();
