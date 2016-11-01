/**
 * Created by yako on 10/31/16.
 */
const $log = {
  d: function (location, msg) {
    if (!msg) msg = '';
    let log = `${location}: ${msg} 
     ${Array.prototype.slice.call(arguments, 2)}`;

    console.log(log);
  },

  e: function (location, err, msg) {

  }
};

export default $log;
