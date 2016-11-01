/**
 * Created by yako on 10/31/16.
 */
const $log = {
  d: function (_class, _method, msg) {
    if (document.location.href.indexOf('localhost') < 0) return;
    _method = _method ? `.${_method}` : '';

    if (!msg) msg = '';
    let log = `${_class + _method}: ${msg}`;

    console.log(log);
    let objs = Array.prototype.slice.call(arguments, 3);
    if (objs.length) console.log('Included Objects:', objs);
  },

  e: function (location, err, msg) {

  }
};

export default $log;
