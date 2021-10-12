import { REMARKBOX_KEY } from '@constants/comment';

class Comment {
  constructor(ownerKey = REMARKBOX_KEY) {
    this.ownerKey = ownerKey;
    this.threadUri = window.location.href;
    this.threadTitle = window.document.title;
    this.threadFragment = window.location.hash;
  }

  createIframe() {
    const src = `https://my.remarkbox.com/embed?rb_owner_key=${this.ownerKey}&thread_title=${encodeURI(this.threadTitle)}&thread_uri=${encodeURIComponent(this.threadUri) + this.threadFragment}`;
    const ifrm = document.createElement("iframe");
    ifrm.setAttribute("id", "remarkbox-iframe");
    ifrm.setAttribute("title", "Comment");
    ifrm.setAttribute("scrolling", "no");
    ifrm.setAttribute("data-src", src);
    ifrm.setAttribute("frameborder", "0");
    ifrm.setAttribute("tabindex", "0");
    ifrm.setAttribute("title", "Remarkbox");
    ifrm.style.width = "100%";
    document.getElementById("remarkbox-div").appendChild(ifrm);
  }

  init() {
    this.createIframe();
  }
}

export default Comment;