import ProjectConstants from '../routes/Project/constants';

const common = {
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  timeToPx(time) {
    return time / ProjectConstants.MS_PER_PIXEL;
  },

  getClipWidth(clip) {
    return this.timeToPx(clip.endTime - clip.startTime);
  },

  getClipLength(clip) {
    return clip.endTime - clip.startTime;
  },

  pxToTime(pixels) {
    return pixels * ProjectConstants.MS_PER_PIXEL;
  },

  numToPx(num) {
    return `${num}px`;
  },

  pxToNum(pixels) {
    return Number(pixels.split('px')[0]);
  },

  iterObj: function* (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        yield obj[key];
      }
    }
  },

  isWindow(obj) {
    return obj != null && obj === obj.window;
  },

  getWindow(elem) {
    return this.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  },

  offset(elem) {
    let docElem;
    let win;
    let box = { top: 0, left: 0 };
    let doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }

    win = this.getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  },

  getBounds(elem) {
    const offset = this.offset(elem);

    return {
      tl: {
        x: offset.left,
        y: offset.top
      },
      br: {
        x: offset.left + elem.clientWidth,
        y: offset.top + elem.clientHeight
      }
    };
  },

  isInBounds(bounds, x, y) {
    return x >= bounds.tl.x && x <= bounds.br.x && y >= bounds.tl.y && y <= bounds.br.y;
  },

  getClipId(elem) {
    if (!elem) return null;
    return elem.id.split('clip-component-')[1];
  },

  getClipElemFromId(id) {
    return document.getElementById(`clip-component-${id}`);
  },

  isContextMenuOpen() {
    const contextMenus = document.getElementsByClassName('contextmenu');
    for (let i = 0; i < contextMenus.length; i++) {
      let contextMenu = contextMenus[i];
      if (contextMenu.style.display !== 'none') return true;
    }

    return false;
  },

  hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  },

  noop() {
    return () => {};
  },

  bindWithoutThis(cb) {
    const bindArgs = Array.prototype.slice.call(arguments, 1);

    return function () {
      const internalArgs = Array.prototype.slice.call(arguments, 0);
      const args = Array.prototype.concat(bindArgs, internalArgs);
      return cb.apply(this, args);
    };
  }
};

export default common;
