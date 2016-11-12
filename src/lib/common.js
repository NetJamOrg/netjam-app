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
  }
};

export default common;
