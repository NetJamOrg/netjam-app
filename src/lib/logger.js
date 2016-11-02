/**
 * Created by yako on 10/31/16.
 */
let logger = (filename) => {
  if (!filename) filename = '';
  else filename += ' @ ';
  const _logger = {
    d: function (_class, _function, msg) {
      if (document.location.href.indexOf('localhost') < 0) return;
      let objs = [];
      if (!_class) _class = '';
      if (_function) {
        _function = _class ? `.${_function}` : _function;
      } else {
        _function = '';
      }

      if (msg && typeof msg !== 'string') {
        objs.push(msg);
        msg = '';
      }

      if (!msg) msg = '';

      let log = `${filename + _class + _function}: ${msg}`;

      console.log(log);
      objs = objs.concat(Array.prototype.slice.call(arguments, 3));
      if (objs.length) console.log('Included Objects:', objs);
    },

    i: function (_class, _function, msg) {
      let objs = [];
      if (!_class) _class = '';
      if (_function) {
        _function = _class ? `.${_function}` : _function;
      } else {
        _function = '';
      }

      if (msg && typeof msg !== 'string') {
        objs.push(msg);
        msg = '';
      }

      if (!msg) msg = '';

      let log = `${filename + _class + _function}: ${msg}`;

      console.log(log);
      objs = objs.concat(Array.prototype.slice.call(arguments, 3));
      if (objs.length) console.log('Included Objects:', objs);
    },

    e: function (location, err, msg) {

    }
  };

  return _logger;
};

export default logger;
