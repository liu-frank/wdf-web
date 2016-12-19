/**
 * Created by liukai on 16/9/19.
 */
'use strict';

var create = function(options) {

  // Instance the tour
  var tour = new Tour({
    steps: options.meta
  });

  // Initialize the tour
  tour.init();

  // Start the tour
  tour.start(true);

};

module.exports = {
  create: create
};
