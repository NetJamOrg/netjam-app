/**
 * Created by yako on 10/31/16.
 */
const $log = {
  d: function (_class, _method, msg) {
    if (document.location.href.indexOf('localhost') < 0) return;
    let objs = [];
    _method = _method ? `.${_method}` : '';

    if (msg && typeof msg !== 'string') {
      objs.push(msg);
      msg = '';
    }

    if (!msg) msg = '';

    let log = `${_class + _method}: ${msg}`;

    console.log(log);
    objs = objs.concat(Array.prototype.slice.call(arguments, 3));
    if (objs.length) console.log('Included Objects:', objs);
  },

  d: function (_class, _method, msg) {
    let objs = [];
    _method = _method ? `.${_method}` : '';

    if (msg && typeof msg !== 'string') {
      objs.push(msg);
      msg = '';
    }

    if (!msg) msg = '';

    let log = `${_class + _method}: ${msg}`;

    console.log(log);
    objs = objs.concat(Array.prototype.slice.call(arguments, 3));
    if (objs.length) console.log('Included Objects:', objs);
  },

  e: function (location, err, msg) {

  }
};

export default $log;
