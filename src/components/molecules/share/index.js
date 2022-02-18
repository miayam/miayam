import {
  telegram,
  tumblr,
  tw,
  reddit,
  whatsapp,
  email,
  pinterest
} from 'vanilla-sharing';

import { PLATFORMS } from '@constants/share';

class Share {
  constructor(className="m-share") {
    this.className = className;
    this.container = document.getElementsByClassName(this.className)[0];
    this.meta = {
      url: window.location.origin + this.container.getAttribute('data-url'),
      title: this.container.getAttribute('data-title'),
      description: this.container.getAttribute('data-description'),
      image: this.container.getAttribute('data-image'),
      fbAppId: this.container.getAttribute('data-fbAppId')
    };
  }
  init() {
    const platformsMapper = {
      'telegram': telegram,
      'tumblr': tumblr,
      'twitter': tw,
      'reddit': reddit,
      'whatsapp': whatsapp,
      'linkedin': () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${this.meta.url}`, '_blank');
      },
      'gmail': email,
      'pinterest': pinterest,
    };

    const optionsMapper = {
      'telegram': {
        url: this.meta.url,
        title: this.meta.title,
      },
      'tumblr': {
        url: this.meta.url,
        title: this.meta.title,
        caption: this.meta.description,
        tags: ['miayam', 'article', this.meta.title.split(' ').join('')]
      },
      'twitter': {
        url: this.meta.url,
        title: this.meta.title,
        hashtags: ['miayam', 'article', this.meta.title.split(' ').join('')]
      },
      'reddit': {
        url: this.meta.url,
        title: this.meta.title
      },
      'whatsapp': {
        url: this.meta.url,
        title: this.meta.title
      },
      'linkedin': {
        url: this.meta.url,
        title: this.meta.title,
        description: this.meta.description
      },
      'gmail': {
        url: this.meta.url,
        title: this.meta.title,
        description: this.meta.description,
        subject: this.meta.title
      },
      'pinterest': {
        url: this.meta.url,
        description: this.meta.description,
        media: this.meta.image,
      }
    };

    PLATFORMS.forEach(platform => {
      const shareButton = document.getElementById(`js-${platform}`);
      shareButton.addEventListener('click', () => {
        platformsMapper[platform](optionsMapper[platform]);
      });
    });
  }
}

export default Share;