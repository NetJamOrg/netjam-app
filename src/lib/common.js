import ProjectConstants from '../routes/Project/constants';

const common = {
  getRandomIntInclusive: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  uuid: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },

  timeToPx: function (time) {
    return time / ProjectConstants.MS_PER_PIXEL;
  },

  getClipWidth: function (clip) {
    return this.timeToPx(clip.endTime - clip.startTime);
  },

  getClipLength: function (clip) {
    return clip.endTime - clip.startTime;
  },

  pxToTime: function (pixels) {
    return pixels * ProjectConstants.MS_PER_PIXEL;
  }
};

export default common;
