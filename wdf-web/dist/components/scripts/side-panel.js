'use strict';

WUI.SidePanel = (function() {
  var create = function(options) {
    var $el = options.$el;

    $el.html(WUI.templates['side-panel']({
      menus: [{
        active: true,
        name: 'Profit'
      }, {
        name: 'Explore'
      }, {
        name: 'Profile'
      }, {
        name: 'Photos'
      }, {
        name: 'Videos'
      }, {
        name: 'Invite'
      }, {
        name: 'Music'
      }, {
        name: 'Candidates'
      }, {
        name: 'Calendar'
      }, {
        name: 'Feedback'
      }, {
        name: 'Help'
      }]
    }));

    WUI.ProfileList.create({
      $el: $el.find('.profile-list')
    });
  };

  return {
    create: create
  };
})();
