import './_index.scss';
import image from '@atoms/image';
import { searchForm } from '@molecules';

image();
searchForm();

import(
    /* webpackChunkName: "analytics" */
    '@scripts/utilities/analytics'
).then(({ default: module }) => {
    module();
});
