import ProjectConstants from './routes/Project/constants';

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function timeToPx(time) {
  return time / ProjectConstants.MS_PER_PIXEL;
}

export function getClipWidth(clip) {
  return timeToPx(clip.endTime - clip.startTime);
}

export function pxToTime(pixels) {
  return pixels * ProjectConstants.MS_PER_PIXEL;
}
